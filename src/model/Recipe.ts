import {URL} from "../interface/AdvancedTypes";
import {IRecipe} from "../interface/IRecipe";
import {IIngredientStack} from "../interface/IIngredientStack";
import _ from "lodash";
import {IngredientStack} from "./IngredientStack";

export function Recipe(id: string, name: string, photoUrl: URL, ingredients: IIngredientStack[], cookTime = "15-30 mins"): IRecipe {
    return {
        id,
        name,
        photoUrl,
        cookTime,
        ingredientStacks: ingredients,
        totalCalories: ingredients.reduce((sum: number, stack: IIngredientStack) => sum + stack.totalCalories, 0),
        totalPrice: ingredients.reduce((sum: number, stack: IIngredientStack) => sum + stack.totalPrice, 0),
    };
}

/**
 * Ensures that the initializers from the Recipe object
 * gets initialzied on a json fetched from another location
 * @param json
 */
Recipe.wrap = function (json: any):IRecipe {
    const recipe:IRecipe = _.extend(Recipe("", "", "", [], ""),json);
    recipe.ingredientStacks = recipe.ingredientStacks.map(IngredientStack.wrap);
    return recipe;
};


Recipe.isInstance = function (obj:any) {
    return "id" in obj
        && "name" in obj
        && "ingredientStacks" in obj
        && "cookTime" in obj
        && "totalCalories" in obj
        && "totalPrice" in obj;
};

Recipe.isEqual = function (thisObj:any, otherObj:any) {
    return Recipe.isInstance(otherObj)
        && thisObj.cookTime === otherObj.cookTime
        && thisObj.totalCalories === otherObj.totalCalories
        && thisObj.totalPrice === otherObj.totalPrice
        && thisObj.id === otherObj.id
        && thisObj.ingredientStacks.length === otherObj.ingredientStacks.length;
};
