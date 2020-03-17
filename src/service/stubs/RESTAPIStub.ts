import {IIngredientStack} from "../../interface/IIngredient";
import * as RecipeStubs from "./RecipeStubs";
import {IMap} from "../../interface/AdvancedTypes";
import {IRecipe} from "../../interface/IRecipe";

type FunctionStub = (payload:any) => any;


const PostStubs:IMap<Function> = {};
const GetStubs:IMap<Function> = {};
const ApiStubs: IMap<IMap<Function>> = { PostStubs, GetStubs };

PostStubs["/recipe"] = getRecipesFromIngredients;

export default ApiStubs;

export function getRecipesFromIngredients(payload:any) {
    const ingredientStacks = payload.ingredientStacks as IIngredientStack[];
    const recipeStubs = RecipeStubs as IMap<Function>;
    const ingredientMap:IMap<IIngredientStack> = {};
    for(const stack of ingredientStacks) {
        ingredientMap[stack.ingredient.id] = stack;
    }

    const recipes:IRecipe[] = [];
    for(let recipeName in recipeStubs) {
        const Recipe = recipeStubs[recipeName];
        const recipe:IRecipe = Recipe();
        const hasAllIngredients = recipe.ingredients.every( stackInRecipe =>{
            const stackInBag = ingredientMap[ stackInRecipe.ingredient.id ];
            if(stackInBag) {
                return  stackInBag.totalAmount >= stackInRecipe.totalAmount;
            }
            return false;
        });

        if(hasAllIngredients) {
            recipes.push(recipe);
        }
    }
    return recipes;
};