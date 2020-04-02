import React from "react";
import "./RecipeTable.scss";
import {IRecipe, IRecipeStack} from "../interface/IRecipe";


interface RecipeTableProps {
    recipeStacks: IRecipeStack[];
}

export default class RecipeTable extends React.Component<RecipeTableProps, any> {
    render(){
        return <>
                <table className="pure-table recipe-table">
                    <thead>
                        <tr>
                            <th>Recipe</th>
                            <th>Prep Time</th>
                            <th>Ingredients</th>
                            <th>Total Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTrs()}
                    </tbody>
                </table>
            </>
    }

    renderTrs() {
        return this.props.recipeStacks.map((stack:IRecipeStack) => {
            const recipe:IRecipe = stack.item;
                return <tr key={recipe.id}>
                    <td>{recipe.name}</td>
                    <td>{recipe.cookTime}</td>
                    <td>
                        <ul>
                            {
                                recipe.ingredientStacks.map((ingredientStack) => {
                                    let ingredient = ingredientStack.item;
                                    return <li  key={ingredient.id}>{ingredient.name} x {ingredientStack.totalAmount}</li>
                                })
                            }
                        </ul>
                    </td>
                    <td>{stack.totalCalories}</td>
                </tr>
            });
    }
}