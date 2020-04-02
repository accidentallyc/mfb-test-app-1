import React from "react";
import "./IngredientTable.scss";
import {IIngredient} from "../interface/IIngredient";
import {IIngredientStack} from "../interface/IIngredientStack";

interface RecipeTableProps {
    ingredientStacks: IIngredientStack[];
    onUpdateIngredient: (ingredientId: string, newAmt: number, prevAmt: number) => any;
    onRemoveIngredient: (ingredientId: string) => any;
}

export default class IngredientTable extends React.Component<RecipeTableProps, any> {
    constructor(props: any) {
        super(props);
    }

    onTdTrashIconClick = (event: React.MouseEvent<HTMLElement>) => {
        const stackId = event.currentTarget.dataset.stackId as string;
        this.props.onRemoveIngredient(stackId);
        event.preventDefault();
        event.stopPropagation();
    }

    onTdChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const stackId = event.currentTarget.dataset.stackId as string;
        const value = +event.currentTarget.value;
        this.props.onUpdateIngredient(stackId, value, NaN);
    }

    render() {
        let totalPrice = 0;
        let totalCals = 0;
        const trs = this.props.ingredientStacks
            .filter(s => !s.isDeleted)
            .map((stack: IIngredientStack) => {
                const ingredient: IIngredient = stack.item;
                totalPrice += stack.totalPrice;
                totalCals += stack.totalCalories || 0;
                return <tr key={ingredient.id} data-ingredient-id={ingredient.id}>
                    <td>{ingredient.name}</td>
                    <td>
                        <input className={"clean-input"}
                               type={'number'}
                               value={stack.totalAmount} step={1} min={1} max={30}
                               onChange={this.onTdChangeAmount}
                               data-stack-id={stack.id}/>
                    </td>
                    <td><small>${ingredient.pricePerUnit} /{ingredient.unit}</small></td>
                    <td>${stack.totalPrice.toFixed(2)}</td>
                    <td>{stack.totalCalories.toFixed(2)}</td>
                    <td className={"controls"}>
                        <button
                            className="pure-button fas fa-trash" onClick={this.onTdTrashIconClick}
                            data-stack-id={stack.id}/>
                    </td>
                </tr>
            });

        return <>
            <table className="pure-table ingredient-table">
                <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                    <th>Unit Price</th>
                    <th>Price</th>
                    <th>Calories</th>
                    <th className={"action-th"}/>
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
                    <td className={"action-td"}/>
                </tr>
                </tfoot>
            </table>
        </>;
    }
}