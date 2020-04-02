import FoodBagCustomizerState from "./FoodBagCustomizerState";
import IFoodBag from "../IFoodBag";

export default interface AppState {
    page:string;
    pageState:FoodBagCustomizerState;
    pages : {
        FoodBagView : IFoodBagView,
    },
    config: {
        apiServerUrl: string;
    },
    foodBagMap : IFoodBagStateMap,
    ingredientMap: IIngredientStateMap,
}

export interface IFoodBagStateMap {
    [key:string] :IFoodBagStateMapItem;
}
export interface IFoodBagStateMapItem {
    isLoading: boolean;
    lastOperation: Promise<any>;
    value: IFoodBag;
}

export interface IIngredientStateMap {
    [key:string] :IFoodBagStateMapItem;
}




export interface IFoodBagView {
    foodbag:IFoodBag
}