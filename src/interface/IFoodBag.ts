import { IRecipeStack} from "./IRecipe";
import {IStack} from "./IStack";
import {IIngredientStack} from "./IIngredientStack";

export default interface IFoodBag extends IStack{
    id:string;
    name:string;
    ingredientStacks: IIngredientStack[];
    recipeStacks: IRecipeStack[];
    photoUrl?:string;
    creator?:any;
    description?:string;
    [key:string] : any;
}