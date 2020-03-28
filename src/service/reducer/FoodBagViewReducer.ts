import {IFoodBagView} from "../../interface/states/AppState";
import _ from "lodash";

export function FoodBagViewReducer(foodBagViewState:IFoodBagView){
    let newFoodBagViewState = _.cloneDeep(foodBagViewState);
    return newFoodBagViewState;
}
