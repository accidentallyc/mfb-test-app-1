import {IRecipe} from "../../interface/IRecipe";
import {Recipe} from "../RecipeService";
import {IngredientStack} from "../IngredientService";
import {Beef, Lamb, Parsley, Potato, Tomato} from "./IngredientStubs";

export function PotatoCrisps():IRecipe {
    return Recipe(
        "Potato Crisps",
        "Potato Crisps",
        "/icons/small/PotatoCrisps.png",
        [
            IngredientStack(Potato(), 1),
        ]
    );
}

export function BeefAndPotatoStew ():IRecipe {
    return Recipe(
        "Beef And Potato Stew",
        "Beef And Potato Stew",
        "/icons/small/BeefAndPotatoStew.png",
        [
            IngredientStack(Potato(), 1),
            IngredientStack(Beef(), 1),
            IngredientStack(Tomato(),1),
        ]
    )
}

export function BeefSteak():IRecipe {
    return Recipe(
        "Beef Steak",
        "Beef Steak",
        "/icons/small/BeefSteak.png",
        [
            IngredientStack(Beef(), 3),
            IngredientStack(Parsley(),1),

        ]
    )
}

export function LambSteak():IRecipe {
    return Recipe(
        "Lamb Steak",
        "Lamb Steak",
        "/icons/small/LambSteak.png",
        [
            IngredientStack(Lamb(), 3),
            IngredientStack(Parsley(),1),
        ]
    )
}