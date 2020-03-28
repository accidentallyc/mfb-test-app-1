import {IIngredientStack} from "../interface/IIngredient";
import {IRecipe, IRecipeStack} from "../interface/IRecipe";
import {HTTPService, IResponseStub} from "./HTTPService";
import {URL} from "../interface/AdvancedTypes";
import MFBStore from "./MFBStore";

const API_SERVER = () => {
    MFBStore.getState()
}
export default class RecipeService {
    public static getRecipesFromIngredients(ingredientStacks:IIngredientStack[]):Promise<IRecipe[]> {
        return HTTPService
            .POST(`${API_SERVER()}/recipe`, { ingredientStacks })
            .then((response:IResponseStub) => {
                return response.body as IRecipe[];
            });
    }

    static getRecipesByName(searchTerm: string) {
        return HTTPService
            .GET(`${API_SERVER()}/recipe?term=${searchTerm}`)
            .then((response:IResponseStub|Response) => {
                return response.body as IRecipe[];
            });
    }
}



export function Recipe(id:string, name:string, photoUrl:URL, ingredients:IIngredientStack[], cookTime = "15-30 mins"):IRecipe {
    return {
        id,
        name,
        photoUrl,
        ingredientStacks: ingredients,
        cookTime,
        totalCalories: ingredients.reduce((sum:number,stack:IIngredientStack)=> sum +stack.totalCalories, 0),
        totalPrice: ingredients.reduce((sum:number,stack:IIngredientStack)=> sum +stack.totalPrice, 0),
    };
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


export function RecipeStack(recipe:IRecipe, totalAmount:number):IRecipeStack {
    return {
        recipe,
        totalAmount,
        totalCalories: recipe.totalCalories * totalAmount,
        totalPrice: recipe.totalPrice * totalAmount,
        _createdAt : (new Date).getTime(),
    }
}

RecipeStack.isEqual = function (thisObj:any,otherObj:any) {
    return RecipeStack.isInstance(otherObj)
        && thisObj.totalAmount === otherObj.totalAmount
        && thisObj.totalCalories === otherObj.totalCalories
        && thisObj.totalPrice === otherObj.totalPrice
        && thisObj.recipe.id === otherObj.recipe.id;
};



RecipeStack.isInstance = function (obj:any) {
    return 'recipe' in obj
    && 'totalAmount' in obj
    && 'totalCalories' in obj
    && 'totalPrice' in obj;
};
