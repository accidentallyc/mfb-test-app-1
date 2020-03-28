import React from "react";
import {connect} from 'react-redux';
import AppState from "../../../../interface/states/AppState";
import "./RecipeTable.css";
import {IRecipe, IRecipeStack} from "../../../../interface/IRecipe";
class RecipeTable extends React.Component<any, any> {
    static MapStoreToProp(state:AppState) {
        return {
            bag: state.pageState.bag
        };
    }

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
        const trs = this.props.bag.recipeStacks.map((stack:IRecipeStack) => {
            const recipe:IRecipe = stack.recipe;
                return <tr key={recipe.id}>
                    <td>{recipe.name}</td>
                    <td>{recipe.cookTime}</td>
                    <td>
                        <ul>
                            {
                                recipe.ingredientStacks.map((ingredientStack) => {
                                    let ingredient = ingredientStack.ingredient;
                                    return <li  key={ingredient.id}>{ingredient.name} x {ingredientStack.totalAmount}</li>
                                })
                            }
                        </ul>
                    </td>
                    <td>{stack.totalCalories}</td>
                </tr>
            });

        return <>
            { trs}
            </>
    }
}

export default connect(RecipeTable.MapStoreToProp)(RecipeTable);