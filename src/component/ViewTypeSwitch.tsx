import React from "react";
import {IStack} from "../interface/IStack";
import {RecipeStack} from "../model/RecipeStack";
import {IngredientStack} from "../model/IngredientStack";
import _ from "lodash";
import IFoodBag from "../interface/IFoodBag";

export enum ViewType {
    ingredients,
    recipes
}

interface ViewTypeSwitchProps {
    onChangeViewType: (viewType: ViewType) => any;
    foodBag: IFoodBag;
}

interface ViewTypeSwitchState {
    viewType: ViewType;
    unopenedIngredientCount: number;
    unopenedRecipeCount: number;

    [key: string]: number;
}

export class ViewTypeSwitch extends React.Component<ViewTypeSwitchProps, ViewTypeSwitchState> {
    constructor(props: ViewTypeSwitchProps) {
        super(props);
        this.state = {
            viewType: ViewType.ingredients,
            unopenedIngredientCount: 0,
            unopenedRecipeCount: 0,
        }
    }

    componentDidUpdate(prevProps: ViewTypeSwitchProps) {
        // let prevStack: IStack[];
        // let currStack: IStack[];
        // let counterPropName = null;
        // let equalFunction: (a: any, b: any) => boolean;
        // switch (this.state.viewType as ViewType) {
        //     default:
        //     case ViewType.ingredients:
        //         // update recipes counter
        //         currStack = this.props.foodBag.recipeStacks;
        //         prevStack = prevProps.foodBag.recipeStacks;
        //         counterPropName = 'unopenedRecipeCount';
        //         equalFunction = RecipeStack.isEqual;
        //         break;
        //     case ViewType.recipes:
        //         // update ingredients counter
        //         currStack = this.props.foodBag.ingredientStacks;
        //         prevStack = prevProps.foodBag.ingredientStacks;
        //         counterPropName = 'unopenedIngredientCount';
        //         equalFunction = IngredientStack.isEqual;
        //         break;
        // }
        //
        // const diffs = _.differenceWith(currStack, prevStack, equalFunction);
        //
        //
        // if (diffs.length) {
        //     this.setState({
        //         [counterPropName]: this.state[counterPropName] + diffs.length
        //     })
        // }
    }

    onChangeViewType = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const newViewType = +(event.currentTarget.dataset.viewType || 0);
        switch (newViewType as ViewType) {
            case ViewType.ingredients:
                this.setState({unopenedIngredientCount: 0, viewType: newViewType});
                break;
            case ViewType.recipes:
                this.setState({unopenedRecipeCount: 0, viewType: newViewType});
                break;
        }
        this.props.onChangeViewType(newViewType);
    }

    renderIngredientViewBtn() {
        let className = "pure-button fas fa-shopping-bag";
        if (this.state.viewType === ViewType.ingredients) {
            className += " pure-button-primary pure-button-active";
        }

        const badge = this.state.unopenedIngredientCount !== 0 ?
            <span className={"amount-badge"}>{this.state.unopenedIngredientCount}</span>
            : <></>;
        return <button key={0} className={className} data-view-type={ViewType.ingredients}
                       onClick={this.onChangeViewType}>
            {badge}
        </button>
    }

    renderRecipeViewBtn() {
        let className = "pure-button fas fa-utensils";
        if (this.state.viewType === ViewType.recipes) {
            className += " pure-button-primary pure-button-active";
        }
        const badge = this.state.unopenedRecipeCount !== 0 ?
            <span className={"amount-badge"}>{this.state.unopenedRecipeCount}</span>
            : <></>;
        return <button key={1} className={className} data-view-type={ViewType.recipes} onClick={this.onChangeViewType}>
            {badge}
        </button>
    }

    render() {


        return <div className={"pure-button-group view-type-buttons"} role={"group"} style={{marginBottom: "0.5em"}}>
            {this.renderIngredientViewBtn()}
            {this.renderRecipeViewBtn()}
        </div>
    }
}