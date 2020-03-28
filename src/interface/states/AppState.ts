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
    }
}

export interface IFoodBagView {
    foodbag:IFoodBag
}