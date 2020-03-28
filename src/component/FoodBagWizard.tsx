import React from "react";
import AppState from "../interface/states/AppState";

class FoodBagWizard extends React.Component<any, any> {
    public static MapStoreToProp(state:AppState){
        return {
            bag: state.pageState.bag,
            viewType: state.pageState.viewType,
        };
    }

    render (){
        return <></>;
    }
}

