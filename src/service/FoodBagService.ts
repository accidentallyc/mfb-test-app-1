import IFoodBag from "../interface/IFoodBag";
import {FoodBag} from "../model/FoodBag";
import {HTTPService} from "./HTTPService";

export default class FoodBagService {
    static get API_URL() {
        return (window as any).ENV_VARS.API_SERVER_URL;
    }

    static GetBagById(foodBagId:string, include:string[] = []):Promise<IFoodBag> {
        const url = `${this.API_URL}/foodbag/${foodBagId}?include=${include.join(",")}`;
        return HTTPService.GET(url).then(FoodBag.wrap);
    }

    static UpdateBagById(foodBagId:string, foodBag:IFoodBag):Promise<IFoodBag> {
        return HTTPService.PUT(`${this.API_URL}/foodbag/${foodBagId}`,foodBag).then(FoodBag.wrap);
    }

}

