import {combineReducers, createStore} from "redux";
import FoodBagReducer from "./reducer/FoodBagReducer";

const MFBStore = createStore(
    combineReducers({
        config: (state = { apiServerUrl: "https://localhost:5001" }) => {
            return state;
        },
        foodBagMap:FoodBagReducer,
    })
);

export default MFBStore;
(window as any).MFBStore = MFBStore;