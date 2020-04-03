import React, {SyntheticEvent} from "react";
import AppState, {IFoodBagStateMap} from "../../../interface/states/AppState";
import {connect} from "react-redux";
import "./BagView.scss";
import ImageContainer from "../../ImageContainer";
import Skeleton from "react-loading-skeleton/lib";
import IFoodBag from "../../../interface/IFoodBag";
import {AnyAction} from "redux";
import {
    FOODBAG_COMMIT,
    FOODBAG_INGREDIENTSTACK_MODIFY,
    FOODBAG_INGREDIENTSTACK_NEW,
    FOODBAG_INGREDIENTSTACK_RM,
    FOODBAG_RECIPESTACK_NEW,
    FOODBAG_UPDATE_PROPERTY
} from "../../../service/action/FoodbagActions";
import IngredientTable from "../../IngredientTable";
import {DropdownSearch} from "../../DropdownSearch";
import {IIngredient} from "../../../interface/IIngredient";
import {IRecipe} from "../../../interface/IRecipe";
import {ViewType, ViewTypeSwitch} from "../../ViewTypeSwitch";
import RecipeTable from "../../RecipeTable";

interface BagViewProps {
    foodBagId: string,
    foodBagMap: IFoodBagStateMap,
    mode: 'readonly' | 'edit',
    dispatch: (action: AnyAction) => void;
    isNew:boolean;
};

interface BagViewState {
    viewType: ViewType;
    forceEditMode: boolean;
}


class BagView extends React.Component<BagViewProps, BagViewState> {
    public static MapStoreToProp(state: AppState) {
        return {
            foodBagMap: state.foodBagMap
        };
    }

    constructor(props: BagViewProps) {
        super(props);
        this.state = {
            viewType: ViewType.ingredients,
            forceEditMode: false,
        };
    }

    get isLoading(): boolean {
        return this.props.foodBagMap[this.props.foodBagId].isLoading;
    }

    get foodBag(): IFoodBag {
        return this.props.foodBagMap[this.props.foodBagId].value || {};
    }

    get isEditMode(): boolean {
        return this.props.mode === 'edit' || this.state.forceEditMode;
    }

    get isNew():boolean{
        return this.foodBag.isPersisted == 0 && this.props.isNew;
    }

    onTitleChange = (event: SyntheticEvent) => {
        const value = event.currentTarget.innerHTML;
        this.props.dispatch(FOODBAG_UPDATE_PROPERTY(this.props.foodBagId, 'name', value));
    }

    onSaveChanges = (event: SyntheticEvent) => {
        this.props.dispatch(FOODBAG_COMMIT(this.props.foodBagId, this.isNew));
    };

    onRemoveIngredient = (stackId: string) => {
        this.props.dispatch(FOODBAG_INGREDIENTSTACK_RM(this.foodBag.id, stackId));
    }

    onUpdateIngredient = (stackId: string, value: number) => {
        this.props.dispatch(FOODBAG_INGREDIENTSTACK_MODIFY(this.foodBag.id, stackId, value));
    }

    onSelectIngredient = (ingredient: IIngredient) => {
        this.props.dispatch(FOODBAG_INGREDIENTSTACK_NEW(this.foodBag.id, ingredient, 1));
    }

    onSelectRecipe = (recipe: IRecipe) => {
        this.props.dispatch(FOODBAG_RECIPESTACK_NEW(this.foodBag.id, recipe, 1));
    }

    onChangeViewType = (viewType: ViewType) => {
        this.setState({
            viewType
        })
    }

    onDescriptionChange = (event:SyntheticEvent<HTMLTextAreaElement>) => {
        let description = event.currentTarget.value;
        this.props.dispatch(FOODBAG_UPDATE_PROPERTY(this.foodBag.id, "description",description));
    }

    onUpdateImg = (event:SyntheticEvent) => {
        if(!this.isEditMode) {
            return;
        }
        let newImgUrl = prompt("New Image Url (sorry was too lazy to make a proper module)");
        if(newImgUrl) {
            this.props.dispatch(FOODBAG_UPDATE_PROPERTY(this.foodBag.id, "photoUrl",newImgUrl));
        }
    }

    render() {
        const temp = this.props.foodBagMap[this.props.foodBagId];
        const isLoading = temp.isLoading;
        const foodbag = temp.value;
        return <section id={"bag-view"}>

            <div className={"pure-g"}>
                <div className={"pure-u-1-5"}/>
                <div className={"pure-u-3-5"}>

                    <this.renderTopBarSection/>
                    <this.renderDescriptionSection/>
                    <this.renderIngredientRecipeTableSection/>
                    <this.renderMainActionDiv/>

                </div>
                <div className={"pure-u-1-5"}/>
            </div>

        </section>
    }

    renderIngredientRecipeTableSection = () => {
        const {isLoading} = this;
        if (isLoading) {
            return <>
                <div className={"pure-u-4-24"}/>
                <div className={"pure-u-18-24"}>
                    <Skeleton height={"12rem"} width={"100%"}/>
                </div>
                <div className={"pure-u-4-24"}/>
            </>;
        } else {
            return <section id={"ingredient-recipe-section"}>
                <div className={"pure-u-3-24"}/>
                <div className={"pure-u-18-24"}>
                    {
                        this.isEditMode ?
                            <DropdownSearch onSelectIngredient={this.onSelectIngredient} onSelectRecipe={this.onSelectRecipe}/>
                            : <></>
                    }
                    <ViewTypeSwitch onChangeViewType={this.onChangeViewType} foodBag={this.foodBag}/>
                    <div style={{textAlign: "center"}}>
                        {
                            (() => {
                                switch (this.state.viewType) {
                                    case ViewType.ingredients:
                                        return <IngredientTable ingredientStacks={this.foodBag.ingredientStacks}
                                                                onRemoveIngredient={this.onRemoveIngredient}
                                                                onUpdateIngredient={this.onUpdateIngredient}
                                                                isReadonly={!this.isEditMode}
                                        />;
                                    case ViewType.recipes:
                                        return <RecipeTable recipeStacks={this.foodBag.recipeStacks}
                                                            isReadonly={!this.isEditMode}
                                        />;
                                    default:
                                        return <></>;
                                }
                            })()
                        }
                    </div>
                </div>
                <div className={"pure-u-3-24"}/>
            </section>;
        }
    }

    renderDescriptionSection = () => {
        const {isLoading, foodBag} = this;
        let body;
        if( isLoading ) {
            body = <Skeleton height={"1em"} count={6}/>;
        }
        else if (this.isEditMode) {
            body = <textarea
                placeholder={'Describe your new foodbox'}
                value={this.foodBag.description}
                onChange={this.onDescriptionChange}></textarea>;
        } else {
            body = <span>{this.foodBag.description}</span>;
        }

        return <section className={"pure-g"} id={"description-section"}>
            <div className={"pure-u-1"}>
                <div id={"bag-view-description"}>
                    {body}
                </div>
            </div>
        </section>
    }

    onEditBtn = () => {
        this.setState({
            forceEditMode: true
        })
    }

    renderTopBarSection = () => {
        const {isLoading, foodBag} = this;
        return <section className={"pure-g"} id={"top-bar-section"}>
            <div className={"pure-u-2-24"}>
                {
                    isLoading ?
                        <Skeleton width={"6em"} height={"6em"}/> :
                        <ImageContainer src={foodBag.photoUrl} height={"6em"} width={"6em"} onClick={this.onUpdateImg}/>
                }
            </div>
            <div className={"pure-u-15-24"}>
                {
                    isLoading ?
                        <>
                            <h2><Skeleton width={"18rem"}/></h2>
                            <h3><Skeleton width={"12rem"}/></h3>
                            <h4>{<Skeleton width={"8rem"}/>}</h4>
                        </>
                        :
                        <>
                            <h2 contentEditable={this.isEditMode}
                                suppressContentEditableWarning={true}
                                onBlur={this.onTitleChange}
                            >
                                {foodBag.name}
                            </h2>
                            <h3>by {foodBag.creator.fullName}</h3>
                            <h4>{<Skeleton width={"8rem"}/>}</h4>
                        </>
                }
            </div>
            <div className={"pure-u-7-24"}>
                {
                    (() => {
                        if( isLoading ) {
                            return <Skeleton width={"11.5rem"} height={"2rem"}/>;
                        } else if (!this.isEditMode) {
                            return <div className="pure-button-group" role="group">
                                <button className={"button-large pure-button"} onClick={this.onEditBtn}>Edit</button>
                                <button className={"button-large pure-button"} onClick={()=>alert('Not Implemented')}><i className="far fa-copy"/> Copy</button>
                                <button className={"button-large pure-button"} onClick={()=>alert('Not Implemented')}><i className="fas fa-shopping-cart"/> Order
                                </button>
                            </div>;
                        } else {
                            return <></>;
                        }
                    })()
                }
            </div>
        </section>;
    }

    renderMainActionDiv = () => {
        const {isLoading, foodBag} = this;
        if (!this.isEditMode) {
            return <></>
        } else {
            return <div style={{margin: "1em 0", textAlign: "right"}}>
                <a className={"pure-button"} style={{marginRight: "0.5em"}} href={'/foodbag'}>
                    <label>Cancel</label>
                </a>
                <button className={"pure-button button-success"} onClick={this.onSaveChanges}>
                    <i className="fas fa-save"/>
                    <label> Save</label>
                </button>
            </div>
        }
    }
}

export default connect(BagView.MapStoreToProp)(BagView);