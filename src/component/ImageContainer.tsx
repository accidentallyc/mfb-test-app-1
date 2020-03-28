import React from "react";
import "./ImageContainer.scss";

export default class ImageContainer extends React.Component<any, any>{
    get style(){
        const style = {} as any;
        if(this.props.src) {
            style.backgroundImage = `url(${this.props.src})`;
        } else {
            style.backgroundColor = "#999999";
        }

        if(this.props.width) {
            style.width = this.props.width;
        }

        if(this.props.height) {
            style.height = this.props.height;
        }

        return style;
    }
    render() {
        return <div className={"image-container"} style={this.style}></div>
    }
}

