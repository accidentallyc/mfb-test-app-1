import IFoodBag from "../IFoodBag";

export default interface FoodBagCustomizerState {
    bag: IFoodBag;
    viewType: ViewType;
}

export enum ViewType {
    ingredients,
    recipes
}