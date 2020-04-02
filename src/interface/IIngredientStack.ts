import {IStack} from "./IStack";
import {IIngredient} from "./IIngredient";

export interface IIngredientStack extends IStack {
    item: IIngredient;
    itemId: string;
}