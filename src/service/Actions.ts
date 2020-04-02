import {IRecipe} from "../interface/IRecipe";
import {ViewType} from "../component/ViewTypeSwitch";

export enum ACTIONS {
    UPDATE_NAME = "UPDATE_NAME",
    UPDATE_BAG_ADDINGREDIENT = "UPDATE_BAG_ADDINGREDIENT",
    UPDATE_BAG_RMINGREDIENT = "UPDATE_BAG_RMINGREDIENT",
    UPDATE_BAG_ADDRECIPE = "UPDATE_BAG_ADDRECIPE",
    UPDATE_BAG_RMRECIPE = "UPDATE_BAG_RMRECIPE",
    UPDATE_BAG_INGREDIENT_MODIFYCOUNT = "UPDATE_BAG_INGREDIENT_MODIFYCOUNT",
    UPDATE_PAGE_CUSTOMBAG_VIEWTYPE = "UPDATE_PAGE_CUSTOMBAG_VIEWTYPE",
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

export function UPDATE_BAG_ADDRECIPE(bagId:string, recipe:IRecipe) {
    return {
        type: ACTIONS.UPDATE_BAG_ADDRECIPE,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        recipe,
        bagId,
    }
}

export function UPDATE_BAG_RMRECIPE(bagId:string, recipe:IRecipe) {
    return {
        type: ACTIONS.UPDATE_BAG_ADDRECIPE,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        recipe,
        bagId,
    }
}


export function UPDATE_PAGE_CUSTOMBAG_VIEWTYPE(viewType:ViewType|number) {
    return {
        type: ACTIONS.UPDATE_PAGE_CUSTOMBAG_VIEWTYPE,
        ns: NAMESPACE.CUSTOMIZE_BAG,
        viewType: viewType as ViewType
    };
}