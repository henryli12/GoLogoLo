import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";

const GET_LOGO = gql`
query logo($logoId: String) {
    logo(id: $logoId) {
        _id
        texts
        textLocations
        textColors
        fontSizes
        images
        imageLocations
        backgroundColor
        borderColor
        borderWidth
        borderRadius
        padding
        location
        lastUpdate
    }
}
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $texts: [String]!,
        $textLocations: [[Int]]!,
        $textColors: [String]!,
        $fontSizes: [Int]!,
        $images: [String]!,
        $imageLocations: [[Int]]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $location: [Int]!) {
            updateLogo(
                id: $id,
                texts: $texts,
                textLocations: $textLocations,
                textColors: $textColors,
                fontSizes: $fontSizes,
                images: $images,
                imageLocations: $imageLocations,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                location: $location) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            texts: "",
            textLocations: "",
            textColors: "",
            fontSizes: "",
            images: "",
            imageLocations: "",
            backgroundColor: "",
            borderColor: "",
            borderRadius: "",
            borderWidth: "",
            padding: "",
            location: ""
        }
    }

    render() {
        let texts, textLocations, textColors, fontSizes, images, imageLocations, backgroundColor, borderColor, borderRadius, borderWidth, padding, location;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form className="col-6" onSubmit={e => {
                                                e.preventDefault();
                                                console.log(this.state);
                                                console.log(location)
                                                let texts2 = [];
                                                if(texts) texts2 = texts.value.split(',');
                                                let textLocations2 = [];
                                                if(textLocations) textLocations2 = textLocations.value.split(',');
                                                let textColors2 = [];
                                                if(textColors) textColors2 = textColors.value.split(',');
                                                let fontSizes2 = [];
                                                if (fontSizes) fontSizes2 = fontSizes.value.split(',');
                                                let images2 = [];
                                                if(images) images2 = images.value.split(',');
                                                let imageLocations2 = [];
                                                if(imageLocations) imageLocations2 = imageLocations.value.split(',');
                                                let location2 = [0, 0];
                                                if(location) location2 = location.value.split(',');
                                                console.log(texts2, textColors2, fontSizes2, images2, imageLocations2, location2);
                                                updateLogo({ variables: { id: data.logo._id, texts: texts2, textLocations: textLocations2, textColors: textColors2, fontSizes: fontSizes2,
                                                                        images: images2, imageLocations: imageLocations2, backgroundColor: backgroundColor.value,
                                                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                                                        padding: parseInt(padding.value), location: location2} });
                                                // texts.value = "";
                                                // textLocations.value = "";
                                                // textColors.value = "";
                                                // fontSizes.value = "";
                                                // images.value = "";
                                                // imageLocations.value = "";
                                                // backgroundColor.value = "";
                                                // borderColor.value = "";
                                                // borderRadius.value = "";
                                                // borderWidth.value = "";
                                                // padding.value = "";
                                                // location.value = "";
                                            }}>
                                                <div className="form-group col-8">
                                                    <label htmlFor="texts">Texts:</label>
                                                    <input type="text" className="form-control" name="texts" ref={node => {
                                                        texts = node;
                                                    }} onChange={() => this.setState({texts: texts.value})} placeholder={data.logo.texts} defaultValue={data.logo.texts} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="images">Images:</label>
                                                    <input type="text" className="form-control" name="images" ref={node => {
                                                        images = node;
                                                    }} onChange={() => this.setState({images: images.value})} placeholder={data.logo.images} defaultValue={data.logo.images} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="textColors">Colors:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        textColors = node;
                                                    }}onChange={() => this.setState({textColors: textColors.value})} placeholder={data.logo.textColors} defaultValue={data.logo.textColors} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder={data.logo.padding} defaultValue={data.logo.padding} />
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            <div className="col-6">
                                                <span style={{
                                                    display: "inline-block",
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                    backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                    borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.renderPadding ? this.state.renderPadding : data.logo.padding) + "px",
                                                    margin: (this.state.renderMargin ? this.state.renderMargin : data.logo.margin) + "px"
                                                }}>{this.state.renderText ? this.state.renderText :  data.logo.text}</span>
                                            </div>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;