import React, {ChangeEvent, Component} from "react";
import "./BagEditor.css";
import {connect} from 'react-redux';
import AppState from "../../../interface/states/AppState";
import {ViewType} from "../../../interface/states/FoodBagCustomizerState";
import {
    UPDATE_BAG_INGREDIENT_MODIFYCOUNT,
    UPDATE_BAG_NAME,
    UPDATE_BAG_RMINGREDIENT
} from "../../../service/Actions";

import {IIngredient, IIngredientStack} from "../../../interface/IIngredient";
import DropdownSearch from "./input/DropdownSearch";
import RecipeTable from "./input/RecipeTable";
import ViewTypeSwitch from "./input/ViewTypeSwitch";

class BagEditor extends Component<any, any> {
    public static MapStoreToProp(state: AppState) {
        return {
            bag: state.pageState.bag,
            viewType: state.pageState.viewType,
        };
    }

    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onTdTrashIconClick = this.onTdTrashIconClick.bind(this);
        this.onTdChangeAmount = this.onTdChangeAmount.bind(this);
    }

    onChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.dispatch(UPDATE_BAG_NAME(this.props.bag.id, event.target.value));
    }

    onTdTrashIconClick(event: React.MouseEvent<HTMLElement>) {
        const ingredientId = event.currentTarget.dataset.ingredientId as string;
        this.props.dispatch(UPDATE_BAG_RMINGREDIENT(this.props.bag.id, ingredientId));
        event.preventDefault();
        event.stopPropagation();
    }

    onTdChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
        const ingredientId = event.currentTarget.dataset.ingredientId as string;
        const value = +event.currentTarget.value;
        this.props.dispatch(UPDATE_BAG_INGREDIENT_MODIFYCOUNT(this.props.bag.id, ingredientId, value));
    }

    renderIngredientTable(): React.ReactElement {
        let totalPrice = 0;
        let totalCals = 0;
        const trs = this.props.bag.ingredientStacks.map((stack: IIngredientStack) => {
            const ingredient: IIngredient = stack.ingredient;
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
                    <button
                        className="pure-button fas fa-trash" onClick={this.onTdTrashIconClick} data-ingredient-id={ingredient.id}/>
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
                <th/>
            </tr>
            </thead>
            <tbody>{trs}</tbody>
            <tfoot>
            <tr>
                <td>Totals</td>
                <td/>
                <td/>
                <td>${totalPrice.toFixed(2)}</td>
                <td>{totalCals}</td>
                <td/>
            </tr>
            </tfoot>
        </table>
    }


    renderBody() {
        switch (this.props.viewType as ViewType) {
            case ViewType.ingredients:
                return this.renderIngredientTable();
            case ViewType.recipes:
                return <RecipeTable/>
        }
    }

    render() {
        return <div className="foodbag-customizer">
            <br/>
            <div className="pure-g">
                <div className="pure-u-1-5"/>
                <div className="pure-u-3-5">


                    <form className="pure-form pure-form-aligned">

                        <div className="pure-control-group foodbag-header-input">
                            <img src={"/logo192.png"} className={"foodbag-img"} alt={""}/>
                            <input
                                type="text"
                                placeholder="Type your food bag here"
                                className="title-input"
                                value={this.props.bag.name}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="pure-control-group foodbag-search-input">
                            <DropdownSearch type="text"/>
                        </div>

                        <ViewTypeSwitch/>
                        {this.renderBody()}

                        <div style={{marginTop: "1em", textAlign: "right"}}>
                            <button className={"pure-button"} style={{marginRight: "0.5em"}}>
                                <label>Cancel</label>
                            </button>
                            <button className={"pure-button button-success"}>
                                <i className="fas fa-save"/>
                                <label>Save</label>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="pure-u-1-5"/>

            </div>
        </div>
    }
}

export default connect(BagEditor.MapStoreToProp)(BagEditor);