import {IIngredientStack} from "./IIngredient";
import { IRecipeStack} from "./IRecipe";
import {IStack} from "./IStack";

export default interface IFoodBag extends IStack{
    id:string;
    name:string;
    ingredientStacks: IIngredientStack[];
    recipes: IRecipeStack[];
}