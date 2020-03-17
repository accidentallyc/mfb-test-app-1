import {IIngredientStack} from "../interface/IIngredient";
import {IRecipe, IRecipeStack} from "../interface/IRecipe";
import * as RecipeStubs from "./stubs/RecipeStubs";
import {HTTPService, IResponseStub} from "./HTTPService";


const API_SERVER = "www.some-fake-address.com";
export default class RecipeService {
    public static getRecipesFromIngredients(ingredientStacks:IIngredientStack[]):Promise<IRecipe[]> {
        return HTTPService
            .POST(`${API_SERVER}/recipe`, { ingredientStacks })
            .then((response:IResponseStub) => {
                return response.body as IRecipe[];
            });
    }
}

export function Recipe(id:string, name:string, ingredients:IIngredientStack[], cookTime = "15-30 mins"):IRecipe {
    return {
        id,
        name,
        ingredients,
        cookTime,
        totalCalories: ingredients.reduce((sum:number,stack:IIngredientStack)=> sum +stack.totalCalories, 0),
        totalPrice: ingredients.reduce((sum:number,stack:IIngredientStack)=> sum +stack.totalPrice, 0),
    }
}

export function RecipeStack(recipe:IRecipe, totalAmount:number):IRecipeStack {
    return {
        recipe,
        totalAmount,
        totalCalories: recipe.totalCalories * totalAmount,
        totalPrice: recipe.totalPrice * totalAmount,
    }
}