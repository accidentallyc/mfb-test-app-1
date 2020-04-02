import IFoodBag from "../IFoodBag";
import {ViewType} from "../../component/ViewTypeSwitch";

export default interface FoodBagCustomizerState {
    bag: IFoodBag;
    viewType: ViewType;
}

