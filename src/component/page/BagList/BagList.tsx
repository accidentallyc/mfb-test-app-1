import React, {useEffect, useState} from "react";
import FoodBagService from "../../../service/FoodBagService";
import IFoodBag from "../../../interface/IFoodBag";
import ImageContainer from "../../ImageContainer";
import "./BagList.scss";

export default function BagList() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [foodBags, setFoodBags] = useState<IFoodBag[]>([]);
    const onNewFoodBag = () => {
        const newFoodBagId = "FOODBAG_" + (new Date).getTime();
        window.location.href = `/foodbag/${newFoodBagId}?edit=true&new=true`;
    }

    useEffect(() => {
        document.title = "MFB | FoodBags";
        FoodBagService
            .GetBags(["creator","description"])
            .then(setFoodBags)
            .then(() => setLoading(false));
        },[])

    if(isLoading) {
        return <section id={"bag-list"}>
            <div className={"pure-g"}>
                <div className={"pure-u-1-5"}/>
                <div className={"pure-u-3-5"}>
                    <span>Loading... too lazy to put in skeletons...</span>
                </div>
            </div>
        </section>
    } else {
        return <section id={"bag-list"}>
            <div className={"pure-g"}>
                <div className={"pure-u-1-5"}/>
                <div className={"pure-u-3-5"}>
                    <section id={"bag-list-actions"}>
                        <div className="pure-button-group" role="group">
                            <button className={"button-large pure-button pure-button-primary"} onClick={onNewFoodBag}>
                                <i className="fas fa-plus-circle"></i> New
                            </button>
                        </div>
                    </section>
                    <section id={"bag-list-container"}>
                        {
                            (foodBags||[]).map((fb) => <BagListItem key={fb.id} foodBag={fb} /> )
                        }
                    </section>
                </div>
                <div className={"pure-u-1-5"}/>
            </div>
        </section>
    }
}

function BagListItem(props:{foodBag:IFoodBag}) {
    const maxCount = 170;
    let shortDescp = props.foodBag.description || '';
    if(shortDescp.length  > maxCount) {
        shortDescp = shortDescp.substr(0, maxCount) + '...';
    }
    return <div className={"bag-list-item"}>
        <ImageContainer src={props.foodBag.photoUrl } width={'100%'} height={'14rem'} />
        <div className={"bag-list-cover"}>
            <span>{shortDescp}</span>
            <a href={`/foodbag/${props.foodBag.id}`}>Click for more</a>
        </div>
        <h2>{props.foodBag.name}</h2>
        <h3>{props.foodBag.creator.fullName}</h3>
    </div>
}