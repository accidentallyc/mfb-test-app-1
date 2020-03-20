import AppState from "../interface/states/AppState";
import {createStore} from "redux";
import {ACTIONS, NAMESPACE} from "./Actions";
import * as _ from "lodash";
import {IIngredient, IIngredientStack} from "../interface/IIngredient";
import {IngredientStack} from "./IngredientService";
import IFoodBag from "../interface/IFoodBag";
import {FoodBag} from "./FoodBagService";
import {getRecipesFromIngredients} from "./stubs/RESTAPIStub";
import {RecipeStack} from "./RecipeService";
import {ViewType} from "../interface/states/FoodBagCustomizerState";
import {IRecipe} from "../interface/IRecipe";

const initialState = {
    page: "customize-foodbag",
    pageState: {
        bag: FoodBag("0000", "Fat Arse's Bag"),
        viewType: ViewType.ingredients,
    }
} as AppState;


function UpdateBag(state: object = initialState, action: any) {
    const newState: AppState = (_.cloneDeep(state) as AppState);
    const newBag: IFoodBag = newState.pageState.bag;

    const ingredientMatch = (stack: IIngredientStack) => stack.ingredient.id == action.ingredientId;

    if (action.ns == NAMESPACE.CUSTOMIZE_BAG) {
        switch (action.type) {
            case ACTIONS.UPDATE_NAME:
                newState.pageState.bag.name = action.name;
                break;

            case ACTIONS.UPDATE_BAG_INGREDIENT_MODIFYCOUNT: {
                const index = _.findIndex(newBag.ingredientStacks, ingredientMatch);
                if (index > -1) {
                    const ingredientStack = newBag.ingredientStacks[index];
                    newBag.ingredientStacks[index] = (IngredientStack(ingredientStack.ingredient, action.amount));
                }
            }
                break;
            case ACTIONS.UPDATE_BAG_ADDINGREDIENT: {
                const ingredient: IIngredient = action.ingredient;
                const ingredientStacks = newBag.ingredientStacks;
                const existingIngredient = _.find(newBag.ingredientStacks,(s)=>s.ingredient.id == ingredient.id);
                if (!existingIngredient) {
                    let ingredientStack: IIngredientStack = IngredientStack(ingredient, 1);
                    ingredientStacks.push(ingredientStack);
                }
            }
                break;
            case ACTIONS.UPDATE_BAG_RMINGREDIENT:
                _.remove(newBag.ingredientStacks, ingredientMatch);
                break;

            case ACTIONS.UPDATE_BAG_ADDRECIPE:
                const recipe: IRecipe = action.recipe;
                const newBagIngredientStackMap = _.keyBy(newBag.ingredientStacks, 'ingredient.id');
                const newBagRecipeStackMap = _.keyBy(newBag.recipeStacks, 'recipe.id');

                if( !(recipe.id in newBagRecipeStackMap)) {
                    for (const stackToInsert of recipe.ingredientStacks) {
                        const idToInsert = stackToInsert.ingredient.id;
                        if( idToInsert in newBagIngredientStackMap) {
                            const newBagIngredientStack = newBagIngredientStackMap[idToInsert];
                            // if the bag already contains more than the specified ingredients
                            // we just leave it as is, else replace the stack completely
                            if( newBagIngredientStack.totalAmount < stackToInsert.totalAmount ) {
                                newBagIngredientStackMap[idToInsert] = stackToInsert;
                                const index = _.findIndex(newBag.ingredientStacks, (s) => s.ingredient.id === idToInsert );
                                newBag.ingredientStacks[index] = stackToInsert;
                            }
                        } else {
                            newBag.ingredientStacks.push(stackToInsert);
                            newBagIngredientStackMap[idToInsert] = stackToInsert;
                        }
                    }
                    newBag.recipeStacks.push(RecipeStack(recipe,1));
                }
                break;
            case ACTIONS.UPDATE_BAG_RMRECIPE:
                break;
        }
    }

    return newState;
}

function UpdateOthers(state: AppState, action: any) {
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
            case ACTIONS.UPDATE_PAGE_CUSTOMBAG_VIEWTYPE:
                newState.pageState.viewType = action.viewType;
                break;
        }
    }
    return newState;
}

const reducers = _.flow(UpdateBag, UpdateOthers);
const MFBStore = createStore((state: object = initialState, action: any) => {
    return UpdateOthers(UpdateBag(state,action),action);
});

export default MFBStore;