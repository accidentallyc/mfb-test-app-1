import {
    Beef,
    Cabbage,
    Chicken,
    Ketchup,
    Lamb,
    Parsley,
    Potato,
    Soybean,
    Soysauce,
    Tomato
} from "./stubs/IngredientStubs";
import {IIngredient} from "../interface/IIngredient";
import _ from "lodash";
import {HTTPService} from "./HTTPService";

export class IngredientService {
    static get API_URL() {
        return (window as any).ENV_VARS.API_SERVER_URL;
    }

    static async getIngredientsByName(searchTerm:string):Promise<IIngredient[]> {
        const url = `${this.API_URL}/ingredient?term=${searchTerm}`;
        return HTTPService.GET(url).then((ingredients) => {
            return ingredients as IIngredient[];
        })
    }
};