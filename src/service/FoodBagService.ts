import IFoodBag from "../interface/IFoodBag";
import {IIngredientStack} from "../interface/IIngredient";
import _ from "lodash";

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
        isEqual (otherObj:any) {
            return 'ingredientStacks' in otherObj
                && 'totalCalories' in otherObj
                && 'totalPrice' in otherObj
                && 'totalAmount' in otherObj
                && 'recipeStacks' in otherObj
                && this.totalCalories == otherObj.totalCalories
                && this.totalPrice == otherObj.totalPrice
                && this.totalAmount == otherObj.totalAmount
                && this.ingredientStacks.length == otherObj.ingredientStacks.length
                && this.recipeStacks.length == otherObj.recipeStacks.length
                && _.differenceWith(this.ingredientStacks, otherObj.ingredientStacks, (i1,i2) => i1.isEqual(i2)).length == 0
                && _.differenceWith(this.ingredientStacks, otherObj.ingredientStacks, (i1,i2) => i1.isEqual(i2)).length == 0;
        }
    };
}