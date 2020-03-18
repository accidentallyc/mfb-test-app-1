import {
    Beef,
    Cabbage,
    Chicken,
    Ketchup,
    Lamb,
    Parsley,
    Potato,
    Soybean,
    Soysauce,
    Tomato
} from "./stubs/IngredientStubs";
import {IIngredient, IIngredientStack} from "../interface/IIngredient";
import _ from "lodash";

export class IngredientService {
    static async getIngredientsByName(searchTerm:string) {
        const ingredients:IIngredient[] = [
            Beef(),
            Cabbage(),
            Chicken(),
            Ketchup(),
            Lamb(),
            Parsley(),
            Potato(),
            Soybean(),
            Soysauce(),
            Tomato(),
        ];
        return Promise.resolve(ingredients.filter(ingredient => _.includes(ingredient.name.toLowerCase(), searchTerm.toLowerCase())));
    }
}

export function IngredientStack(ingredient:IIngredient, amount:number):IIngredientStack {
    return  {
        ingredient,
        totalAmount: amount,
        totalPrice: amount * ingredient.pricePerUnit,
        totalCalories: amount * (ingredient.calories || 0),
        _createdAt : (new Date).getTime(),
        isEqual (otherStack:any) {
            return 'ingredient' in otherStack
                && 'totalAmount' in otherStack
                && 'totalCalories' in otherStack
                && 'totalPrice' in otherStack
                && this.ingredient.id == otherStack.ingredient.id
                && this.totalAmount == otherStack.totalAmount
                && this.totalPrice == otherStack.totalPrice
                && this.totalCalories == otherStack.totalCalories;
        }
    } as IIngredientStack;
};