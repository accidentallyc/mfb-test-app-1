import * as RecipeStubs from "./RecipeStubs";
import {IMap} from "../../interface/AdvancedTypes";
import {IRecipe} from "../../interface/IRecipe";
import _ from "lodash";
import {IIngredientStack} from "../../interface/IIngredientStack";

type FunctionStub = (payload:any) => any;


const PostStubs:IMap<Function> = {};
const GetStubs:IMap<Function> = {};
const ApiStubs: IMap<IMap<Function>> = { PostStubs, GetStubs };

PostStubs["recipe"] = getRecipesFromIngredients;
GetStubs["recipe"] = getRecipesFromName;
export default ApiStubs;

export function getRecipesFromName(payload:any) {
    const recipeStubs = RecipeStubs as IMap<Function>;
    const term:string = payload.term.toLowerCase();

    const recipes:IRecipe[] = [];
    for(let recipeName in recipeStubs) {
        if(_.includes(recipeName.toLowerCase(), term)) {
            const Recipe = recipeStubs[recipeName];
            recipes.push(Recipe())
        }
    }
    return recipes;
}

export function getRecipesFromIngredients(payload:any) {
    const ingredientStacks = payload.ingredientStacks as IIngredientStack[];
    const recipeStubs = RecipeStubs as IMap<Function>;
    const ingredientMap:IMap<IIngredientStack> = {};
    for(const stack of ingredientStacks) {
        ingredientMap[stack.item.id] = stack;
    }

    const recipes:IRecipe[] = [];
    for(let recipeName in recipeStubs) {
        const Recipe = recipeStubs[recipeName];
        const recipe:IRecipe = Recipe();
        const hasAllIngredients = recipe.ingredientStacks.every(stackInRecipe =>{
            const stackInBag = ingredientMap[ stackInRecipe.item.id ];
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