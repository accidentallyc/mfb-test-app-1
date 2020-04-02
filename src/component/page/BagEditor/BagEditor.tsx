import React, {ChangeEvent, Component} from "react";
import "./BagEditor.css";
import {connect} from 'react-redux';
import AppState from "../../../interface/states/AppState";
import {UPDATE_BAG_NAME} from "../../../service/Actions";
import IngredientTable from "../../IngredientTable";
import RecipeTable from "../../RecipeTable";
import {DropdownSearch} from "../../DropdownSearch";
import {ViewType} from "../../ViewTypeSwitch";

class BagEditor extends Component<any, any> {
    public static MapStoreToProp(state: AppState) {
        return {
            bag: state.pageState.bag,
            viewType: state.pageState.viewType,
        };
    }

    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.dispatch(UPDATE_BAG_NAME(this.props.bag.id, event.target.value));
    }


    renderBody() {
        switch (this.props.viewType as ViewType) {
            case ViewType.ingredients:
                // return <IngredientTable foodbag={this.props.bag}/>
            case ViewType.recipes:
                // return <RecipeTable/>
        }
    }

    render() {
        return <div className="foodbag-customizer">
            <br/>
            <div className="pure-g">
                <div className="pure-u-1-5"/>
                <div className="pure-u-3-5">


                    <form className="pure-form pure-form-aligned">

                        <div className="pure-control-group foodbag-header-input">
                            <img src={"/logo192.png"} className={"foodbag-img"} alt={""}/>
                            <input
                                type="text"
                                placeholder="Type your food bag here"
                                className="title-input"
                                value={this.props.bag.name}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="pure-control-group foodbag-search-input">
                            {/*<DropdownSearch type="text"/>*/}
                        </div>


                        {
                            this.renderBody()
                        }

                        <div style={{marginTop: "1em", textAlign: "right"}}>
                            <button className={"pure-button"} style={{marginRight: "0.5em"}}>
                                <label>Cancel</label>
                            </button>
                            <button className={"pure-button button-success"}>
                                <i className="fas fa-save"/>
                                <label>Save</label>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="pure-u-1-5"/>

            </div>
        </div>
    }
}

export default connect(BagEditor.MapStoreToProp)(BagEditor);