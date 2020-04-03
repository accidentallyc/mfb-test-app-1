import {IFoodBagStateMapItem} from "../../interface/states/AppState";
import _ from "lodash";
import FoodBagService from "../FoodBagService";
import MFBStore from "../MFBStore";
import {
    FOODBAG_COMMIT,
    FOODBAG_COMMIT_RESOLVE,
    FOODBAG_FETCH,
    FOODBAG_INGREDIENTSTACK_MODIFY,
    FOODBAG_INGREDIENTSTACK_NEW,
    FOODBAG_INGREDIENTSTACK_RM, FOODBAG_NEW,
    FOODBAG_RECIPESTACK_NEW,
    FOODBAG_RESOLVE_FETCH,
    FOODBAG_UPDATE_PROPERTY
} from "../action/FoodbagActions";
import {IngredientStack} from "../../model/IngredientStack";
import {IIngredient} from "../../interface/IIngredient";
import {IRecipe, IRecipeStack} from "../../interface/IRecipe";
import {RecipeStack} from "../../model/RecipeStack";
import {IIngredientStack} from "../../interface/IIngredientStack";
import RecipeService from "../RecipeService";
import {FoodBag} from "../../model/FoodBag";

export default function FoodBagReducer(prevState:any = {}, action:any){
    const foodBagId = action.foodBagId;
    let newState = prevState;
    let newFoodBagState:IFoodBagStateMapItem = prevState[foodBagId] ? _.cloneDeep(prevState[foodBagId]) : {};
    let isDirty = true;
    switch (action.type) {
        case FOODBAG_NEW.name:
            const foodBag = FoodBag(foodBagId, "Untitled FoodBag")
            foodBag.creator = {
                id:"USER_GUEST_1585783817984",
                fullName: "Guest",
            };
            foodBag.creatorId = foodBag.creator.id;
            foodBag.isPersisted = 0;
            newFoodBagState.value =foodBag;
            break;
        case FOODBAG_FETCH.name:
            newFoodBagState.value = newFoodBagState.value || {};
            newFoodBagState.isLoading = true;
            newFoodBagState.lastOperation = Promise
                .resolve(newFoodBagState.lastOperation)
                .then(() => FoodBagService.GetBagById(foodBagId, action.includes))
                .then((foodBag) => {
                    MFBStore.dispatch(FOODBAG_RESOLVE_FETCH(foodBagId, foodBag));
                });
            break;
        case FOODBAG_RESOLVE_FETCH.name:
            newFoodBagState.value = _.extend(newFoodBagState.value, action.foodBag);
            newFoodBagState.isLoading = false;
            break;
        case FOODBAG_UPDATE_PROPERTY.name:
            const key:string = action.propertyToUpdate ;
            newFoodBagState.value[key] = action.propertyNewValue;
            break;
        case FOODBAG_COMMIT.name:
            newFoodBagState.lastOperation = Promise
                .resolve(newFoodBagState.lastOperation)
                .then(() => {
                    debugger
                    if(action.isNew) {
                        return FoodBagService.CreateBag(newFoodBagState.value)
                    } else {
                        return FoodBagService.UpdateBagById(foodBagId, newFoodBagState.value)
                    }
                })
                .then((foodBag) => {
                    MFBStore.dispatch(FOODBAG_COMMIT_RESOLVE(foodBagId,foodBag));
                });
            break;
        case FOODBAG_INGREDIENTSTACK_NEW.name:
            if( newFoodBagState.value ) {
                const ingredient:IIngredient = action.ingredient;
                const ingredientStacks = newFoodBagState.value.ingredientStacks;
                let ingredientStack = ingredientStacks.find(s => s.item.id === ingredient.id && s.isDeleted === 0);
                if(ingredientStack == null) {
                    ingredientStack = IngredientStack(ingredient, action.amount);
                    ingredientStacks.push(ingredientStack);
                }

                // check to see if new ingredient uncovers new recipe
                newFoodBagState.lastOperation = Promise.resolve(newFoodBagState.lastOperation)
                    .then(() => RecipeService.getRecipesFromIngredients(ingredientStacks))
                    .then((recipes) => {
                        const recipeStacks = recipes.map<IRecipeStack>(r => RecipeStack(r,1));
                        MFBStore.dispatch(FOODBAG_UPDATE_PROPERTY(foodBagId,"recipeStacks",recipeStacks));
                    });
            }
            break;
        case FOODBAG_COMMIT_RESOLVE.name:
            newFoodBagState.value = action.foodBag;
            alert("Saved!");
            break;
        case FOODBAG_INGREDIENTSTACK_RM.name:
            if( newFoodBagState.value ) {
                const ingredientStackId = action.ingredientStackId as string;
                const ingredientStack = newFoodBagState.value.ingredientStacks.find(s => s.id === ingredientStackId && s.isDeleted === 0);
                if(ingredientStack) {
                    ingredientStack.isDeleted = 1;
                    newFoodBagState.value.ingredientStacks = newFoodBagState.value.ingredientStacks.filter(s => s.isDeleted == 0);

                    // check to see if deleted ingredient removes new recipe
                    newFoodBagState.lastOperation = Promise.resolve(newFoodBagState.lastOperation)
                        .then(() => RecipeService.getRecipesFromIngredients(newFoodBagState.value.ingredientStacks))
                        .then((recipes) => {
                            const recipeStacks = recipes.map<IRecipeStack>(r => RecipeStack(r,1));
                            MFBStore.dispatch(FOODBAG_UPDATE_PROPERTY(foodBagId,"recipeStacks",recipeStacks));
                        });
                }
            }
            break;
        case FOODBAG_INGREDIENTSTACK_MODIFY.name:
            if(newFoodBagState.value) {
                const ingredientStackId = action.ingredientStackId as string;
                const ingredientStack = newFoodBagState.value.ingredientStacks.find(s => s.id === ingredientStackId && s.isDeleted === 0);
                if (ingredientStack) {
                    const amount = action.amount;
                    const ingredient:IIngredient = ingredientStack.item;
                    ingredientStack.totalAmount = amount;
                    ingredientStack.totalPrice = amount * ingredient.pricePerUnit;
                    ingredientStack.totalCalories = amount * (ingredient.calories || 0);

                    // check to see if new amount uncovers new recipe
                    newFoodBagState.lastOperation = Promise.resolve(newFoodBagState.lastOperation)
                        .then(() => RecipeService.getRecipesFromIngredients(newFoodBagState.value.ingredientStacks))
                        .then((recipes) => {
                            const recipeStacks = recipes.map<IRecipeStack>(r => RecipeStack(r,1));
                            MFBStore.dispatch(FOODBAG_UPDATE_PROPERTY(foodBagId,"recipeStacks",recipeStacks));
                        });
                }
            }
            break;
        case FOODBAG_RECIPESTACK_NEW.name:
            if(newFoodBagState.value) {
                const foodBag = newFoodBagState.value;
                const recipe:IRecipe = action.recipe;
                const recipeStacks = foodBag.recipeStacks;
                let recipeStackToModify = recipeStacks.find(s => s.item.id === recipe.id);
                if(recipeStackToModify == null) {
                    recipeStackToModify = RecipeStack(recipe, action.amount);
                    recipeStacks.push(recipeStackToModify);

                    for (const ingredientStack of recipeStackToModify.item.ingredientStacks) {
                        let foundStack = foodBag.ingredientStacks.find(s => s.isDeleted === 0 && s.itemId === ingredientStack.itemId) as (IIngredientStack|null);
                        if(foundStack == null) {
                            const newStack = IngredientStack(ingredientStack.item, action.amount);
                            foodBag.ingredientStacks.push(newStack);
                        } else if (ingredientStack.totalAmount > foundStack.totalAmount ) {
                            foundStack.totalAmount = ingredientStack.totalAmount;
                        }
                    }
                }
            }
            break;
        default:
            isDirty = false;
    }

    if(isDirty) {
        newState = _.cloneDeep(prevState);
        newState[foodBagId] = newFoodBagState;
    }

    return newState;
}
