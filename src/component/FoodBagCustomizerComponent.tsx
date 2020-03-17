import React, {ChangeEvent, Component, ReactElement} from "react";
import "./FoodBagCustomizerComponent.css";
import {connect} from 'react-redux';
import AppState from "../interface/states/AppState";
import FoodBagCustomizerState from "../interface/states/FoodBagCustomizerState";
import {ACTIONS, UPDATE_BAG_INGREDIENT_MODIFYCOUNT, UPDATE_BAG_NAME, UPDATE_BAG_RMINGREDIENT} from "../service/Actions";

import DropdownSearch from "./input/DropdownSearch";
import {IIngredient, IIngredientStack} from "../interface/IIngredient";
import RecipeTable from "./input/RecipeTable";

enum ViewType {
    ingredients,
    recipes
}

class FoodBagCustomizerComponent extends Component<any, any>{
    public static MapStoreToProp(state:AppState){
        return {
            bag: state.pageState.bag
        };
    }

    constructor(props:any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onTdTrashIconClick = this.onTdTrashIconClick.bind(this);
        this.onTdChangeAmount = this.onTdChangeAmount.bind(this);
        this.onChangeViewType = this.onChangeViewType.bind(this);
        this.state = {
            viewType: ViewType.ingredients
        }
    }

    onChange(event:ChangeEvent<HTMLInputElement>)  {
        this.props.dispatch(UPDATE_BAG_NAME(this.props.bag.id, event.target.value));
    }

    onTdTrashIconClick(event:React.MouseEvent<HTMLElement>) {
        const ingredientId = event.currentTarget.dataset.ingredientId as string;
        this.props.dispatch(UPDATE_BAG_RMINGREDIENT(this.props.bag.id, ingredientId))
        event.preventDefault();
        event.stopPropagation();
    }

    onTdChangeAmount(event: React.ChangeEvent<HTMLInputElement>){
        const ingredientId = event.currentTarget.dataset.ingredientId as string;
        const value = +event.currentTarget.value;
        this.props.dispatch(UPDATE_BAG_INGREDIENT_MODIFYCOUNT(this.props.bag.id, ingredientId, value));
    }

    onChangeViewType(event: React.MouseEvent<HTMLElement>) {
        this.setState({
            viewType: +(event.currentTarget.dataset.viewType || 0)
        });
        event.preventDefault();
        event.stopPropagation();
    }

    renderIngredientTable(): React.ReactElement {
        let totalPrice = 0;
        let totalCals = 0;
        const trs = this.props.bag.ingredientStacks.map((stack:IIngredientStack) => {
            const ingredient:IIngredient = stack.ingredient;
            totalPrice += stack.totalPrice;
            totalCals += stack.totalCalories || 0;
            return <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>
                    <input className={"clean-input"}
                           type={'number'}
                           value={stack.totalAmount} step={1} min={1} max={30}
                           onChange={this.onTdChangeAmount}
                           data-ingredient-id={ingredient.id}/>
                </td>
                <td><small>${ingredient.pricePerUnit} /{ingredient.unit}</small></td>
                <td>${stack.totalPrice.toFixed(2)}</td>
                <td>{stack.totalCalories.toFixed(2)}</td>
                <td className={"controls"}>
                    <button className="fas fa-trash pure-button" onClick={ this.onTdTrashIconClick } data-ingredient-id={ingredient.id}></button>
                </td>
            </tr>
        });

        return <table className="pure-table">
            <thead>
            <tr>
                <th>Ingredient</th>
                <th>Amount</th>
                <th>Unit Price</th>
                <th>Price</th>
                <th>Calories</th>
                <th></th>
            </tr>
            </thead>
            <tbody>{trs}</tbody>
            <tfoot>
            <tr>
                <td>Totals</td>
                <td></td>
                <td></td>
                <td>${totalPrice.toFixed(2)}</td>
                <td>{totalCals}</td>
                <td></td>
            </tr>
            </tfoot>
        </table>
    }

    renderViewTypeGroup() {
        const views = [
            "pure-button fas fa-shopping-bag",
            "pure-button fas fa-utensils"
        ];
        views[ this.state.viewType ] += " pure-button-primary pure-button-active"

        return <div className={"pure-button-group"} role={"group"}>
            {
                views.map((className, i) =>
                    <button key={i} className={className} data-view-type={i} onClick={this.onChangeViewType}></button>)
            }
        </div>
    }

    renderBody() {
        switch (this.state.viewType as ViewType) {
            case ViewType.ingredients:
                return this.renderIngredientTable();
            case ViewType.recipes:
                return <RecipeTable></RecipeTable>
        }

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const state = this.state as FoodBagCustomizerState;
        const selectedButtonClass = "pure-button-active pure-button-primary";

        return <div className="foodbag-customizer">
            <br/>
            <div className="pure-g">
                <div className="pure-u-1-5"></div>
                <div className="pure-u-3-5">


                    <form className="pure-form pure-form-aligned">

                        <div className="pure-control-group foodbag-header-input">
                            <img src="/logo192.png" className="foodbag-img"/>
                            <input
                                type="text"
                                placeholder="Type your food bag here"
                                className="title-input"
                                value={this.props.bag.name }
                                onChange={ this.onChange }
                            />
                        </div>

                        <div className="pure-control-group foodbag-search-input">
                            <DropdownSearch type="text"/>
                        </div>

                        <div className={"pure-control-group"}>
                            {this.renderViewTypeGroup()}
                        </div>

                        { this.renderBody() }

                    </form>
                </div>
                <div className="pure-u-1-5"></div>
            </div>
        </div>
    }
}

export default connect(FoodBagCustomizerComponent.MapStoreToProp)(FoodBagCustomizerComponent);