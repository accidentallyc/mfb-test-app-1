import {IRecipe} from "../../interface/IRecipe";
import {Recipe} from "../RecipeService";
import {IngredientStack} from "../IngredientService";
import {Beef, Lamb, Parsley, Potato, Tomato} from "./IngredientStubs";

export function PotatoCrisps():IRecipe {
    return Recipe(
        "Potato Crisps",
        "Potato Crisps",
        [
            IngredientStack(Potato(), 1),
        ]
    );
}

export function BeefAndPotatoStew ():IRecipe {
    return Recipe(
        "Beef And Potato Stew",
        "Beef And Potato Stew",
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
        [
            IngredientStack(Lamb(), 3),
            IngredientStack(Parsley(),1),
        ]
    )
}