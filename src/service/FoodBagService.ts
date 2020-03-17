import IFoodBag from "../interface/IFoodBag";
import {IIngredientStack} from "../interface/IIngredient";

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
    };
}