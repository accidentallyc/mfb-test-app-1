import {IRecipe} from "../interface/IRecipe";
import {HTTPService, IResponseStub} from "./HTTPService";
import MFBStore from "./MFBStore";
import {IIngredientStack} from "../interface/IIngredientStack";
import {IIngredient} from "../interface/IIngredient";
import _ from "lodash";
import {Recipe} from "../model/Recipe";
import {FOODBAG_RECIPESTACK_NEW} from "./action/FoodbagActions";

const API_SERVER = () => {
    MFBStore.getState()
}
export default class RecipeService {
    static get API_URL():string {
        return (window as any).ENV_VARS.API_SERVER_URL;
    }

    public static getRecipesFromIngredients(ingredientStacks:IIngredientStack[]):Promise<IRecipe[]> {
        const url = `${this.API_URL}/recipe?ingredients=${_(ingredientStacks).map('itemId').join(',')}`;
        return HTTPService.GET(url)
            .then((response:object) => {
                const recipes = (response as IRecipe[]).map(Recipe.wrap);
                const tempMap = _.keyBy(ingredientStacks, 'itemId');

                return recipes.filter(r => r.ingredientStacks
                    .every((i) => {
                        return i.totalAmount <= _.get(tempMap,[i.itemId,'totalAmount'],0)
                    })
                );
            });
    }

    static getRecipesByName(searchTerm:string):Promise<IRecipe[]> {
        const url = `${this.API_URL}/recipe?term=${searchTerm}`;
        return HTTPService.GET(url).then((response) => {
            return (response as IRecipe[]).map(Recipe.wrap);
        })
    }
}