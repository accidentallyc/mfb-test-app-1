import IFoodBag from "../interface/IFoodBag";
import {IIngredientStack} from "../interface/IIngredient";
import _ from "lodash";
import {IngredientStack} from "./IngredientService";
import {Guid} from "../interface/AdvancedTypes";
import MFBStore from "./MFBStore";

export default class FoodBagService {
    static get API_URL() {
        return MFBStore.getState().config.apiServerUrl;
    }
    static GetBagById(foodBagId:Guid, include:string[] = []):Promise<IFoodBag> {
        return fetch(`${this.API_URL}/foodbag/${foodBagId}?include=${include.join(",")}`)
            .then( response => {
                if(response.status==200) {
                    return response.json().then(FoodBag.wrap);
                } else {
                    return null;
                }
            });
    }
}

export function FoodBag(id:string|Guid, name:string):IFoodBag {
    return {
        id: id as string,
        name,
        ingredientStacks:[] ,
        totalCalories: 0,
        totalPrice: 0,
        totalAmount: 0,
        recipeStacks: [],
        _createdAt : (new Date).getTime(),
        photoUrl: "/icons/generic-foodbag.png",
    };
}

/**
 * Ensures that the initializers from the FoodBag object
 * gets initialzied on a json fetched from another location
 * @param json
 */
FoodBag.wrap = function (json:any) {
    const foodbag = FoodBag("","");
    return _.extend(foodbag,json);
}


FoodBag.isEqual = function (thisObj:any,otherObj:any) {
    return 'ingredientStacks' in otherObj
        && 'totalCalories' in otherObj
        && 'totalPrice' in otherObj
        && 'totalAmount' in otherObj
        && 'recipeStacks' in otherObj
        && thisObj.totalCalories == otherObj.totalCalories
        && thisObj.totalPrice == otherObj.totalPrice
        && thisObj.totalAmount == otherObj.totalAmount
        && thisObj.ingredientStacks.length == otherObj.ingredientStacks.length
        && thisObj.recipeStacks.length == otherObj.recipeStacks.length
        && _.differenceWith(thisObj.ingredientStacks, otherObj.ingredientStacks, IngredientStack.isEqual).length == 0
        && _.differenceWith(thisObj.ingredientStacks, otherObj.ingredientStacks, IngredientStack.isEqual).length == 0;
}