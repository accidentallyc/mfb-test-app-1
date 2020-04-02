import IFoodBag from "../interface/IFoodBag";
import _ from "lodash";
import {IngredientStack} from "./IngredientStack";
import {RecipeStack} from "./RecipeStack";

export function FoodBag(id: string, name: string): IFoodBag {
    return {
        id,
        name,
        ingredientStacks: [],
        totalCalories: 0,
        totalPrice: 0,
        totalAmount: 0,
        recipeStacks: [],
        _createdAt: (new Date).getTime(),
        photoUrl: "/icons/generic-foodbag.png",
        isDeleted: 0,
        isPersisted:0,
    };
}

/**
 * Ensures that the initializers from the FoodBag object
 * gets initialzied on a json fetched from another location
 * @param json
 */
FoodBag.wrap = function (json: any) :IFoodBag {
    const foodbag:IFoodBag = _.extend(FoodBag("", ""), json);
    foodbag.ingredientStacks = foodbag.ingredientStacks.map(IngredientStack.wrap);
    foodbag.recipeStacks = foodbag.recipeStacks.map(RecipeStack.wrap);
    return foodbag;
}


FoodBag.isEqual = function (thisObj: any, otherObj: any) {
    return 'ingredientStacks' in otherObj
        && 'totalCalories' in otherObj
        && 'totalPrice' in otherObj
        && 'totalAmount' in otherObj
        && 'recipeStacks' in otherObj
        && thisObj.totalCalories === otherObj.totalCalories
        && thisObj.totalPrice === otherObj.totalPrice
        && thisObj.totalAmount === otherObj.totalAmount
        && thisObj.ingredientStacks.length === otherObj.ingredientStacks.length
        && thisObj.recipeStacks.length === otherObj.recipeStacks.length
        && _.differenceWith(thisObj.ingredientStacks, otherObj.ingredientStacks, IngredientStack.isEqual).length === 0
        && _.differenceWith(thisObj.ingredientStacks, otherObj.ingredientStacks, IngredientStack.isEqual).length === 0;
}