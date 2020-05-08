import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';

const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
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

class CreateLogoScreen extends Component {

    constructor(props){
        super(props)
        console.log(props)
        
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
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body row">
                                <form className="col-6" onSubmit={e => {
                                    e.preventDefault();
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
                                    addLogo({ variables: { texts: texts2, textLocations: textLocations2, textColors: textColors2, fontSizes: fontSizes2,
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
                                        }} onChange={() => this.setState({texts: texts.value})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="images">Images:</label>
                                        <input type="text" className="form-control" name="images" ref={node => {
                                            images = node;
                                        }} onChange={() => this.setState({images: images.value})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="textColors">Colors:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            textColors = node;
                                        }}onChange={() => this.setState({textColors: textColors.value})}/>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({renderBorderColor: borderColor.value})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})}/>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                    <span style={{
                                        display: "inline-block",
                                        color: this.state.renderColor ? this.state.renderColor : "#000000",
                                        backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#FFFFFF",
                                        borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#000000",
                                        borderStyle: "solid",
                                        fontSize: (this.state.renderFontSize ? this.state.renderFontSize : 12) + "pt",
                                        borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 5) + "px",
                                        borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 5) + "px",
                                        padding: (this.state.renderPadding ? this.state.renderPadding : 0) + "px",
                                        margin: (this.state.renderMargin ? this.state.renderMargin : 0) + "px"
                                    }}>{this.state.renderText ? this.state.renderText : "New Logo"}</span>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;