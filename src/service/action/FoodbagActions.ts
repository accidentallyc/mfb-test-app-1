import IFoodBag from "../../interface/IFoodBag";
import {IIngredient} from "../../interface/IIngredient";
import {IRecipe} from "../../interface/IRecipe";

export function FOODBAG_FETCH (foodBagId:string, includes?:string[]){
    return {
        includes,
        foodBagId,
        type: FOODBAG_FETCH.name,
        _dispatchTime: new Date,
    }
};

export function FOODBAG_NEW (foodBagId:string) {
    return {
        foodBagId,
        type: FOODBAG_NEW.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_RESOLVE_FETCH(foodBagId:string, foodBag:IFoodBag) {
    return {
        foodBag,
        foodBagId,
        type: FOODBAG_RESOLVE_FETCH.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_UPDATE_PROPERTY(foodBagId:string, propertyToUpdate:string, propertyNewValue:any) {
    return {
        foodBagId,
        propertyToUpdate,
        propertyNewValue,
        type: FOODBAG_UPDATE_PROPERTY.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_COMMIT(foodBagId:string, isNew:boolean = false){
    return {
        foodBagId,
        isNew,
        type: FOODBAG_COMMIT.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_COMMIT_RESOLVE(foodBagId:string, foodBag:IFoodBag){
    return {
        foodBagId,
        foodBag,
        type: FOODBAG_COMMIT_RESOLVE.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_INGREDIENTSTACK_NEW(foodBagId: string | string, ingredient: IIngredient, amount:number) {
    return {
        type: FOODBAG_INGREDIENTSTACK_NEW.name,
        ingredient,
        amount,
        foodBagId,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_INGREDIENTSTACK_RM(foodBagId: string, ingredientStackId: string | string) {
    return {
        foodBagId,
        ingredientStackId,
        type: FOODBAG_INGREDIENTSTACK_RM.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_INGREDIENTSTACK_MODIFY(foodBagId: string | string, ingredientStackId: string | string, amount: number) {
    return {
        amount,
        foodBagId,
        ingredientStackId,
        type: FOODBAG_INGREDIENTSTACK_MODIFY.name,
        _dispatchTime: new Date,
    }
}

export function FOODBAG_RECIPESTACK_NEW(foodBagId: string | string, recipe: IRecipe, amount:number) {
    return {
        type: FOODBAG_RECIPESTACK_NEW.name,
        recipe,
        amount,
        foodBagId,
        _dispatchTime: new Date,
    }
}
