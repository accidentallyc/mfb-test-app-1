import React, {ChangeEvent, MouseEvent} from "react";
import "./DropdownSearch.css";
import Async from "react-async";
import {IngredientService} from "../../service/IngredientService";
import {IIngredient} from "../../interface/IIngredient";
import {UPDATE_BAG_ADDINGREDIENT, UPDATE_BAG_NAME} from "../../service/Actions";
import {connect} from "react-redux";

class DropdownSearch extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            searchTerm:"",
            shouldShow: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
    }

    async fetchAllItemsBySearchTerm(searchTerm:string) {
        return Promise.all([
            IngredientService.getIngredientsByName(searchTerm)
        ])
            .then(([ingredients]) => {
                return {
                    ingredients
                }
            });
    }

    onChange(event:ChangeEvent<HTMLInputElement>) {
        const searchTerm = event.currentTarget.value;
        this.setState({
            shouldShow: true,
            searchTerm,
            searchOp : () => this.fetchAllItemsBySearchTerm(searchTerm)
        });
    }

    onBlur(){
        setTimeout(() => {
            this.setState({
                shouldShow: false,
                searchTerm:''
            });
        },100)

    }

    onClickItem(ingredient:any) {
        this.props.dispatch(UPDATE_BAG_ADDINGREDIENT(this.props.bag.id, ingredient));
    }

    renderItems() {
        if(!this.state.shouldShow) {
            return <></>;
        } else {
            return <>
                <Async promiseFn={this.state.searchOp}>
                    {({ data, error, isLoading }) => {
                        if (isLoading) return "Loading...";
                        if (error) return `Something went wrong: ${error.message}`;

                        if(data) {
                            return (
                                <ul className={"DropdownSearch-results"}>
                                    {
                                        (data as any).ingredients.map((ingredient:IIngredient) => {
                                            return <li key={ingredient.id} className={"pure-g"} onClick={() => this.onClickItem(ingredient)}>

                                                <div className={"pure-u-4-5"}>
                                                    <img src={ingredient.photoUrl.toString()} className={"DropdownSearch-icon"}/>
                                                    <span className={"DropdownSearch-label"}>{ingredient.name}</span>
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
        const dropdownClasses = ["DropdownSearch-results"];

        return (
            <div className="DropdownSearch" >
                <input type="text" value={this.state.searchTerm} onChange={this.onChange} onBlur={this.onBlur}/>
                { this.renderItems()}
            </div>
        );
    }
}

export default connect((state:any)=>{
    return {
        bag: state.pageState.bag
    };;
})(DropdownSearch);