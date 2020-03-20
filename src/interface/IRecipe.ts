import {IIngredientStack} from "./IIngredient";
import {IStack} from "./IStack";
import {URL} from "./AdvancedTypes";

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
    recipe:IRecipe;
}