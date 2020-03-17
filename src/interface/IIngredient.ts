import {URL} from "./AdvancedTypes";
import {IStack} from "./IStack";

export enum IngredientUnit {
    ML="mL",
    G = "g",
}

export interface IIngredient {
    id:string;
    name:string;
    pricePerUnit:number;
    unit:IngredientUnit;
    photoUrl: URL;

    shortDescp?: string;
    tags?: IFoodTag;
    calories?:number;
}

export interface IIngredientStack extends IStack{
    ingredient: IIngredient;
}

export interface IFoodTag {
    /**
     * VEGANISM
     */
    VG?: boolean;
    /**
     * GLUTEN FREE
     */
    GF?:boolean;
    /**
     * DAIRY FREE
     */
    DF?: boolean;
    /**
     * EGG FREE
     */
    EF?:boolean;
    /**
     * NUT FREE
     */
    NF?: boolean;
    /**
     * SUGAR FREE
     */
    SF?:boolean;
    /**
     * LOW SUGAR
     */
    LS?: boolean;
}