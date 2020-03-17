import AppState from "../interface/states/AppState";
import {createStore} from "redux";
import {ACTIONS, IAction, NAMESPACE} from "./Actions";
import * as _ from "lodash";
import {Potato} from "./stubs/IngredientStubs";
import {IIngredient, IIngredientStack} from "../interface/IIngredient";
import {IngredientStack} from "./IngredientService";
import IFoodBag from "../interface/IFoodBag";
import {FoodBag} from "./FoodBagService";
import {getRecipesFromIngredients} from "./stubs/RESTAPIStub";
import {RecipeStack} from "./RecipeService";

const initialState = {
    page: "customize-foodbag",
    pageState: {
        bag: FoodBag("0000", "Fat Arse's Bag")
    }
} as AppState;


function UpdateBag(state: object = initialState, action: any) {
    const newState: AppState = (_.cloneDeep(state) as AppState);
    const bag: IFoodBag = newState.pageState.bag;

    const ingredientMatch = (stack: IIngredientStack) => stack.ingredient.id == action.ingredientId;

    if (action.ns == NAMESPACE.CUSTOMIZE_BAG) {
        switch (action.type) {
            case ACTIONS.UPDATE_NAME:
                newState.pageState.bag.name = action.name;
                break;
            case ACTIONS.UPDATE_BAG_INGREDIENT_MODIFYCOUNT: {
                const index = _.findIndex(bag.ingredientStacks, ingredientMatch);
                if (index > -1) {
                    const ingredientStack = bag.ingredientStacks[index];
                    bag.ingredientStacks[index] = (IngredientStack(ingredientStack.ingredient, action.amount));
                }
            }
                break;
            case ACTIONS.UPDATE_BAG_ADDINGREDIENT: {
                const ingredient: IIngredient = action.ingredient;
                const ingredientStacks = newState.pageState.bag.ingredientStacks;
                const existingIngredient = bag.ingredientStacks.find(ingredientMatch);
                if (!existingIngredient) {
                    let ingredientStack: IIngredientStack = IngredientStack(ingredient, 1);
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
}

function UpdateRecipes(state: AppState, action: any) {
    const newState: AppState = (_.cloneDeep(state) as AppState);
    const bag: IFoodBag = newState.pageState.bag;
    if (action.ns == NAMESPACE.CUSTOMIZE_BAG) {
        switch (action.type) {
            case ACTIONS.UPDATE_BAG_RMINGREDIENT:
            case ACTIONS.UPDATE_BAG_INGREDIENT_MODIFYCOUNT:
            case ACTIONS.UPDATE_BAG_ADDINGREDIENT:
                const ingredientStacks = bag.ingredientStacks;
                const recipes = getRecipesFromIngredients({ ingredientStacks });
                bag.recipeStacks = recipes.map((recipe) => RecipeStack(recipe,1))
                break;
        }
    }
    return newState;
}

const reducers = _.flow(UpdateBag, UpdateRecipes);
const MFBStore = createStore((state: object = initialState, action: any) => {
    return UpdateRecipes(UpdateBag(state,action),action);
});

export default MFBStore;