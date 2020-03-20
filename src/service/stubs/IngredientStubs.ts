import {IIngredient, IngredientUnit} from "../../interface/IIngredient";

export function Beef():IIngredient {
    return {
        id:"beef",
        name:"beef",
        pricePerUnit:12.2,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/beef.png",
        calories:325,
    };
}

export function Cabbage():IIngredient {
    return {
        id:"cabbage",
        name:"cabbage",
        pricePerUnit:4.5,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/cabbage.png",
        calories:15,
    };
}

export function Chicken():IIngredient {
    return {
        id:"chicken",
        name:"chicken",
        pricePerUnit:9.5,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/chicken.png",
        calories:2105,

    };
}

export function Ketchup():IIngredient {
    return {
        id:"ketchup",
        name:"ketchup",
        pricePerUnit:1.1,
        unit: IngredientUnit.ML,
        photoUrl:"/icons/small/ketchup.png",
        calories:64,
    };
}

export function Lamb():IIngredient {
    return {
        id:"lamb",
        name:"lamb",
        pricePerUnit:14.7,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/lamb.png",
        calories:290,
    };
}

export function Parsley():IIngredient {
    return {
        id:"parsley",
        name:"parsley",
        pricePerUnit:3.83,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/parsley.png",
        calories:3,
    };
}

export function Potato():IIngredient {
    return {
        id:"potato",
        name:"potato",
        pricePerUnit:4.4,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/potato.png",
        calories:75,
    };
}

export function Soybean():IIngredient {
    return {
        id:"soybean",
        name:"soybean",
        pricePerUnit:4.7,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/soybean.png",
        calories:90,
    };
}

export function Soysauce():IIngredient {
    return {
        id:"soysauce",
        name:"soysauce",
        pricePerUnit:2.5,
        unit: IngredientUnit.ML,
        photoUrl:"/icons/small/soysauce.png",
        calories:73,
    };
}

export function Tomato():IIngredient {
    return {
        id:"tomato",
        name:"tomato",
        pricePerUnit:3.66,
        unit: IngredientUnit.G,
        photoUrl:"/icons/small/tomato.png",
        calories:23,
    };
}