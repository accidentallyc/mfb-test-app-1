import React, {ChangeEvent, SyntheticEvent} from "react";
import {IngredientService} from "../service/IngredientService";
import RecipeService from "../service/RecipeService";
import {IIngredient} from "../interface/IIngredient";
import {IRecipe} from "../interface/IRecipe";
import Async from "react-async";
import Skeleton from "react-loading-skeleton/lib";
import {connect} from "react-redux";
import "./DropdownSearch.scss";
import AppState from "../interface/states/AppState";

interface DropdownSearchProps {
    onSelectIngredient: (ingredient:IIngredient) => any;
    onSelectRecipe: (recipe:IRecipe) => any;
}
export class DropdownSearch extends React.Component<DropdownSearchProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchTerm: "",
            shouldShow: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onAddIngredient = this.onAddIngredient.bind(this);
        this.onAddRecipe = this.onAddRecipe.bind(this);
    }

    async fetchAllItemsBySearchTerm(searchTerm: string) {
        return Promise.all([
            IngredientService.getIngredientsByName(searchTerm),
            RecipeService.getRecipesByName(searchTerm),
        ])
            .then(([ingredients, recipes]) => {
                return {
                    ingredients,
                    recipes,
                }
            });
    }

    onChange(event: ChangeEvent<HTMLInputElement>) {
        const searchTerm = event.currentTarget.value;
        this.setState({
            shouldShow: true,
            searchTerm,
            searchOp: () => this.fetchAllItemsBySearchTerm(searchTerm)
        });
    }

    onBlur() {
        if (this.state.searchTerm !== '' || this.state.shouldShow) {
            this.setState(() => {
                return {
                    shouldShow: false,
                    searchTerm: ''
                }
            });
        }
    }

    onAddIngredient(event: SyntheticEvent<HTMLElement>) {
        const ingredientsJSON = event.currentTarget.dataset.ingredient as string;
        const ingredient: IIngredient = JSON.parse(ingredientsJSON);
        this.props.onSelectIngredient(ingredient);
        this.onBlur();
    }

    onAddRecipe(event: SyntheticEvent<HTMLElement>) {
        const recipeJSON = event.currentTarget.dataset.recipe as string;
        const recipe: IRecipe = JSON.parse(recipeJSON);
        this.props.onSelectRecipe(recipe);
        this.onBlur();
    }


    renderItems() {
        if (!this.state.shouldShow) {
            return <></>;
        } else {
            return <>
                <Async promiseFn={this.state.searchOp}>
                    {({data, error, isLoading}) => {
                        if (isLoading) return <ul className={"DropdownSearch-results"}>
                            <li>
                                <div className={"pure-u-4-5"}>
                                    <Skeleton width={75} height={75}/>
                                    <span className={"DropdownSearch-label"}>
                                        <Skeleton/>
                                    </span>
                                </div>
                                <div className={"pure-u-1-5"} />
                            </li>
                        </ul>;
                        if (error) return `Something went wrong: ${error.message}`;

                        if (data) {
                            return (
                                <ul className={"DropdownSearch-results"}>
                                    {
                                        (data as any).ingredients.map((ingredient: IIngredient) => {
                                            const ingredientJSON = JSON.stringify(ingredient);
                                            const backgroundImage = `url(${ingredient.photoUrl})`;
                                            return <li key={ingredient.id} className={"pure-g"}
                                                       onClick={this.onAddIngredient} data-ingredient={ingredientJSON}>

                                                <div className={"pure-u-4-5"}>
                                                    <div style={{backgroundImage}} className={"DropdownSearch-icon"}/>
                                                    <span className={"DropdownSearch-label"}>{ingredient.name}</span>
                                                </div>
                                                <div className={"pure-u-1-5"}>

                                                </div>
                                            </li>;
                                        }, this)
                                    }

                                    {
                                        (data as any).recipes.map((recipe: IRecipe) => {
                                            const recipeJSON = JSON.stringify(recipe);
                                            const backgroundImage = `url(${recipe.photoUrl})`;
                                            return <li key={recipe.id}
                                                       className={"pure-g"}
                                                       onClick={this.onAddRecipe}
                                                       data-recipe={recipeJSON}
                                            >

                                                <div className={"pure-u-4-5"}>
                                                    <div style={{backgroundImage}}
                                                         className={"DropdownSearch-icon"} />
                                                    <span className={"DropdownSearch-label"}>{recipe.name}</span>
                                                </div>
                                                <div className={"pure-u-1-5"}>

                                                </div>
                                            </li>;
                                        }, this)
                                    }

                                </ul>
                            );
                        }

                    }}
                </Async>
            </>
        }
    }

    render() {
        const cover = this.state.shouldShow ?
            <div className={"DropdownSearch-Cover"} onClick={this.onBlur} /> : <></>;
        return (
            <div className="DropdownSearch pure-form">
                <input type="text" value={this.state.searchTerm} onChange={this.onChange} placeholder={"Search for an ingredient or recipe"}/>
                {this.renderItems()}
                {cover}
            </div>
        );
    }
}

export default connect((state:AppState, props)=>{
    return {
        bag: state.pageState.bag
    };
})(DropdownSearch);