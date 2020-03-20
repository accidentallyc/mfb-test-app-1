import IFoodBag from "../interface/IFoodBag";
import {IIngredientStack} from "../interface/IIngredient";
import _ from "lodash";
import {IngredientStack} from "./IngredientService";

export default class FoodBagService {

}

export function FoodBag(id:string, name:string):IFoodBag {
    return {
        id,
        name,
        ingredientStacks:[] ,
        totalCalories: 0,
        totalPrice: 0,
        totalAmount: 0,
        recipeStacks: [],
        _createdAt : (new Date).getTime(),
    };
}


FoodBag.isEqual = function (thisObj:any,otherObj:any) {
    return 'ingredientStacks' in otherObj
        && 'totalCalories' in otherObj
        && 'totalPrice' in otherObj
        && 'totalAmount' in otherObj
        && 'recipeStacks' in otherObj
        && thisObj.totalCalories == otherObj.totalCalories
        && thisObj.totalPrice == otherObj.totalPrice
        && thisObj.totalAmount == otherObj.totalAmount
        && thisObj.ingredientStacks.length == otherObj.ingredientStacks.length
        && thisObj.recipeStacks.length == otherObj.recipeStacks.length
        && _.differenceWith(thisObj.ingredientStacks, otherObj.ingredientStacks, IngredientStack.isEqual).length == 0
        && _.differenceWith(thisObj.ingredientStacks, otherObj.ingredientStacks, IngredientStack.isEqual).length == 0;
}