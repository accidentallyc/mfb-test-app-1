import {IngredientService} from "./IngredientService";
import {IIngredient, IIngredientStack} from "../interface/IIngredient";

export enum ACTIONS {
    UPDATE_NAME = "UPDATE_NAME",
    UPDATE_BAG_ADDINGREDIENT = "UPDATE_BAG_ADDINGREDIENT",
    UPDATE_BAG_RMINGREDIENT = "UPDATE_BAG_RMINGREDIENT",
    UPDATE_BAG_INGREDIENT_MODIFYCOUNT = "UPDATE_BAG_INGREDIENT_MODIFYCOUNT",
}

export enum NAMESPACE {
    CUSTOMIZE_BAG = "CUSTOMIZE_BAG",
}

export function UPDATE_BAG_NAME(bagId:string, name:string) {
    return {
        type: ACTIONS.UPDATE_NAME,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        name,
    }
}

export function UPDATE_BAG_ADDINGREDIENT(bagId:string, ingredient:IIngredient, amount?:number) {
    return {
        type: ACTIONS.UPDATE_BAG_ADDINGREDIENT,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        ingredient,
        ingredientId: ingredient.id, // temp resolution
        amount,
        bagId,
    }
}

export function UPDATE_BAG_RMINGREDIENT(bagId:string, ingredientId:string) {
    return {
        type: ACTIONS.UPDATE_BAG_RMINGREDIENT,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        ingredientId,
        bagId,
    }
}

export function UPDATE_BAG_INGREDIENT_MODIFYCOUNT(bagId:string, ingredientId:string, amount:number) {
    return {
        type: ACTIONS.UPDATE_BAG_INGREDIENT_MODIFYCOUNT,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        ingredientId,
        bagId,
        amount,
    }
}


export interface IAction {
    type: ACTIONS,
    ns: NAMESPACE,
    value:unknown,
    bagId?:string,
}