import {IRecipe, IRecipeStack} from "../interface/IRecipe";
import {v4 as uuid} from "uuid";
import _ from "lodash";

export function RecipeStack(recipe: IRecipe, totalAmount: number = 1): IRecipeStack {
    return {
        id: uuid(),
        item: recipe,
        itemId: recipe.id,
        totalAmount,
        totalCalories: _.get(recipe,'totalCalories',0) * totalAmount,
        totalPrice: _.get(recipe,'totalPrice',0) * totalAmount,
        _createdAt: (new Date).getTime(),
        isDeleted: 0,
        isPersisted:0,
    }
}

RecipeStack.wrap = function (json:any) :IRecipeStack {
    const recipeStack:IRecipeStack = _.extend(RecipeStack(json.item, 1), json);
    return recipeStack;
};

RecipeStack.isEqual = function (thisObj: any, otherObj: any) {
    return RecipeStack.isInstance(otherObj)
        && thisObj.totalAmount === otherObj.totalAmount
        && thisObj.totalCalories === otherObj.totalCalories
        && thisObj.totalPrice === otherObj.totalPrice
        && thisObj.recipe.id === otherObj.recipe.id;
};


RecipeStack.isInstance = function (obj: any) {
    return 'recipe' in obj
        && 'totalAmount' in obj
        && 'totalCalories' in obj
        && 'totalPrice' in obj;
};