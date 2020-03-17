import {IIngredientStack} from "./IIngredient";
import {IStack} from "./IStack";

export interface IRecipe  {
    id:string;
    name:string;
    ingredients:IIngredientStack[];
    totalCalories:number;
    totalPrice:number;
}


export interface IRecipeStack extends IStack {
    recipe:IRecipe;
}