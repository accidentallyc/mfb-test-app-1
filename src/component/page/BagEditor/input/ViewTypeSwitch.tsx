import React from "react";
import AppState from "../../../../interface/states/AppState";
import {connect} from "react-redux";
import "./ViewTypeSwitch.css";
import {UPDATE_PAGE_CUSTOMBAG_VIEWTYPE} from "../../../../service/Actions";
import _ from "lodash";
import {ViewType} from "../../../../interface/states/FoodBagCustomizerState";
import {IStack} from "../../../../interface/IStack";
import {RecipeStack} from "../../../../service/RecipeService";
import {IngredientStack} from "../../../../service/IngredientService";

class ViewTypeSwitch extends React.Component<any, any> {
    static MapStoreToProp(state:AppState) {
        return {
            bag: state.pageState.bag,
            viewType: state.pageState.viewType,
        };
    }

    constructor(props:unknown) {
        super(props);
        this.onChangeViewType = this.onChangeViewType.bind(this);
        this.state = {
            unopenedIngredientCount: 0,
            unopenedRecipeCount: 0,
        }
    }

    componentDidUpdate(prevProps:any) {
        let prevStack:IStack[];
        let currStack:IStack[];
        let counterPropName = null
        let equalFunction:(a:any,b:any)=>boolean;
        switch (this.props.viewType as ViewType) {
            default:
            case ViewType.ingredients:
                // update recipes counter
                currStack = this.props.bag.recipeStacks;
                prevStack = prevProps.bag.recipeStacks;
                counterPropName = 'unopenedRecipeCount';
                equalFunction = RecipeStack.isEqual;
                break;
            case ViewType.recipes:
                // update ingredients counter
                currStack = this.props.bag.ingredientStacks;
                prevStack = prevProps.bag.ingredientStacks;
                counterPropName = 'unopenedIngredientCount';
                equalFunction = IngredientStack.isEqual;
                break;
        }

        const diffs = _.differenceWith(currStack, prevStack, equalFunction);


        if(diffs.length) {
            this.setState({
                [counterPropName]: this.state[counterPropName] + diffs.length
            })
        }
    }

    onChangeViewType(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        const newViewType = +(event.currentTarget.dataset.viewType || 0);
        this.props.dispatch(UPDATE_PAGE_CUSTOMBAG_VIEWTYPE(newViewType));
        switch (newViewType as ViewType) {
            case ViewType.ingredients:
                this.setState({unopenedIngredientCount:0});
                break;
            case ViewType.recipes:
                this.setState({unopenedRecipeCount : 0});
                break;
        }
    }

    renderIngredientViewBtn() {
        let className = "pure-button fas fa-shopping-bag";
        if( this.props.viewType == ViewType.ingredients) {
            className += " pure-button-primary pure-button-active";
        }

        const badge = this.state.unopenedIngredientCount != 0 ?
            <span className={"amount-badge"}>{this.state.unopenedIngredientCount}</span>
            : <></>;
        return <button key={0} className={className} data-view-type={ViewType.ingredients} onClick={this.onChangeViewType}>
            {badge}
        </button>
    }

    renderRecipeViewBtn() {
        let className = "pure-button fas fa-utensils";
        if( this.props.viewType == ViewType.recipes) {
            className += " pure-button-primary pure-button-active";
        }
        const badge = this.state.unopenedRecipeCount != 0 ?
            <span className={"amount-badge"}>{this.state.unopenedRecipeCount}</span>
            : <></>;
        return <button key={1} className={className} data-view-type={ViewType.recipes} onClick={this.onChangeViewType}>
            {badge}
        </button>
    }

    render() {


        return <div className={"pure-button-group view-type-buttons"} role={"group"} style={{marginBottom:"0.5em"}}>
            {this.renderIngredientViewBtn()}
            {this.renderRecipeViewBtn()}
        </div>
    }
}

export default connect(ViewTypeSwitch.MapStoreToProp)(ViewTypeSwitch);