import React from "react";
import AppState from "../../../interface/states/AppState";
import {connect} from "react-redux";
import "./BagView.scss";
import ImageContainer from "../../ImageContainer";
import Skeleton from "react-loading-skeleton/lib";
import _ from "lodash";
import FoodBagService from "../../../service/FoodBagService";
import {Async} from "react-async";

class BagView extends React.Component<any, any> {
    public static MapStoreToProp(state: AppState) {
        return {
        };
    }

    constructor(props:any) {
        super(props);
        this.state = {
            foodbagFetch : () => FoodBagService.GetBagById(this.props.foodbagId,["creator","description","ingredientStacks","recipeStacks"])
        }

        this.renderAsnyc = this.renderAsnyc.bind(this);
    }

    render() {
        return <Async promiseFn={this.state.foodbagFetch}>
            {this.renderAsnyc}
        </Async>;
    }

    renderAsnyc({ data, error, isLoading } : {data:any, error:any, isLoading:boolean}) {
        const foodbag = data;
        return <section id={"bag-view"}>

            <div className={"pure-g"}>
                <div className={"pure-u-1-5"} />
                <div className={"pure-u-3-5"}>


                    <div className={"pure-u-2-24"}>
                        {
                            isLoading ?
                                <Skeleton width={"6em"} height={"6em"}></Skeleton>:
                                <ImageContainer src={foodbag.photoUrl}  height={"6em"} width={"6em"} />
                        }
                    </div>
                    <div className={"pure-u-18-24"}>
                        <h2>{ isLoading ? <Skeleton width={"18rem"}/> : foodbag.name} </h2>
                        <h3>{ isLoading ? <Skeleton width={"12rem"}/> : foodbag.creator.fullName }</h3>
                        <h4>{ <Skeleton width={"8rem"}/>}</h4>
                    </div>
                    <div className={"pure-u-4-24"}>
                        {
                            isLoading ?
                                <Skeleton width={"11.5rem"} height={"2rem"}/> :
                                <div className="pure-button-group" role="group">
                                    <button className={"button-large pure-button"}><i className="far fa-copy"></i> Copy</button>
                                    <button className={"button-large pure-button"}><i className="fas fa-shopping-cart"></i> Order</button>
                                </div>
                        }
                    </div>

                    <div className={"pure-u-1"} id={"bag-view-body"}>
                        <div id={"bag-view-description"}>
                            {
                                isLoading ?
                                    <Skeleton height={"1em"} count={6}/> :
                                    foodbag.description
                            }
                        </div>
                    </div>

                    <div className={"pure-u-4-24"}/>
                    <div className={"pure-u-18-24"} id={"bag-view-table"}>
                        <Skeleton height={"12rem"}  width={"100%"}/>
                    </div>
                    <div className={"pure-u-4-24"}/>

                </div>
                <div className={"pure-u-1-5"} />
            </div>

        </section>
    }
}

export default connect(BagView.MapStoreToProp)(BagView);