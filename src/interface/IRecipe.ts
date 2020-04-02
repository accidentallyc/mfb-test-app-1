import {IStack} from "./IStack";
import {URL} from "./AdvancedTypes";
import {IIngredientStack} from "./IIngredientStack";

export interface IRecipe  {
    photoUrl: URL;
    id:string;
    name:string;
    ingredientStacks:IIngredientStack[];
    totalCalories:number;
    totalPrice:number;
    cookTime:string;
}


export interface IRecipeStack extends IStack {
    item:IRecipe;
    itemId:string;
}