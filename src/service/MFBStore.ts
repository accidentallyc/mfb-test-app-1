import AppState from "../interface/states/AppState";
import {createStore} from "redux";
import {ACTIONS, IAction, NAMESPACE} from "./Actions";
import * as _ from "lodash";
import {Potato} from "./stubs/IngredientStubs";
import {IIngredient, IIngredientStack} from "../interface/IIngredient";
import {IngredientStack} from "./IngredientService";
import IFoodBag from "../interface/IFoodBag";
import {FoodBag} from "./FoodBagService";

const initialState = {
    page: "customize-foodbag",
    pageState: {
        bag: FoodBag("0000", "Fat Arse's Bag")
    }
} as AppState;

const MFBStore = createStore((state:object = initialState, action:any ) =>{
    const newState:AppState = (_.cloneDeep(state) as AppState);
    const bag:IFoodBag = newState.pageState.bag;

    const ingredientMatch = (stack:IIngredientStack) => stack.ingredient.id == action.ingredientId;

    if(action.ns == NAMESPACE.CUSTOMIZE_BAG) {
        switch(action.type) {
            case ACTIONS.UPDATE_NAME:
                newState.pageState.bag.name = action.name;
                break;
            case ACTIONS.UPDATE_BAG_INGREDIENT_MODIFYCOUNT:
                {
                    const index = _.findIndex(bag.ingredientStacks, ingredientMatch);
                    if(index > -1 ) {
                        const ingredientStack = bag.ingredientStacks[index];
                        bag.ingredientStacks[index] = (IngredientStack(ingredientStack.ingredient, action.amount));
                    }
                }
                break;
            case ACTIONS.UPDATE_BAG_ADDINGREDIENT:
                {
                    const ingredient:IIngredient = action.ingredient;
                    const ingredientStacks = newState.pageState.bag.ingredientStacks;
                    const existingIngredient = bag.ingredientStacks.find(ingredientMatch);
                    if(!existingIngredient) {
                        let ingredientStack:IIngredientStack = IngredientStack(ingredient, 1);
                        ingredientStacks.push(ingredientStack);
                    }
                }
                break;
            case ACTIONS.UPDATE_BAG_RMINGREDIENT:
                _.remove(bag.ingredientStacks, ingredientMatch);
                break;
        }
    }

    return newState;
});

export default MFBStore;


(window as any).store = MFBStore;