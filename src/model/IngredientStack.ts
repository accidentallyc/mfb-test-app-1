import {IIngredient} from "../interface/IIngredient";
import {IIngredientStack} from "../interface/IIngredientStack";
import {v4 as uuid} from "uuid";
import IFoodBag from "../interface/IFoodBag";
import _ from "lodash";
import {RecipeStack} from "./RecipeStack";
import {FoodBag} from "./FoodBag";

/**
 * Creates a new IngredientStack
 *
 * @param ingredient
 * @param amount
 * @constructor
 */
export function IngredientStack(ingredient: IIngredient, amount: number = 1): IIngredientStack {
    return {
        id: uuid(),
        item: ingredient,
        totalAmount: amount,
        totalPrice: amount * _.get(ingredient,'pricePerUnit', 0),
        totalCalories: amount * _.get(ingredient,'calories', 0),
        _createdAt: (new Date).getTime(),
        isPersisted: 0,
        isDeleted: 0,
        itemId: _.get(ingredient,'id', undefined),
    } as IIngredientStack;
};

IngredientStack.wrap = function (json: any):IIngredientStack {
    const ingredientStack:IIngredientStack = _.extend(IngredientStack(json.item, 1), json);
    return ingredientStack;
}

IngredientStack.isEqual = function (thisObj:any,otherStack:any):boolean {
    return 'ingredient' in otherStack
        && 'totalAmount' in otherStack
        && 'totalCalories' in otherStack
        && 'totalPrice' in otherStack
        && thisObj.ingredient.id === otherStack.ingredient.id
        && thisObj.totalAmount === otherStack.totalAmount
        && thisObj.totalPrice === otherStack.totalPrice
        && thisObj.totalCalories === otherStack.totalCalories;
};