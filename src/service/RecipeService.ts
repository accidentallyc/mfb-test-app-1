import {IIngredientStack} from "../interface/IIngredient";
import {IRecipe} from "../interface/IRecipe";

export default class RecipeService {
    public static red() {

    }
}

export function Recipe(id:string, name:string, ingredients:IIngredientStack[]):IRecipe {
    return {
        id,
        name,
        ingredients,
        totalCalories: ingredients.reduce((sum:number,stack:IIngredientStack)=> sum +stack.totalCalories, 0),
        totalPrice: ingredients.reduce((sum:number,stack:IIngredientStack)=> sum +stack.totalPrice, 0),
    }
}

export function RecipeStack() {

}