import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import { Rnd } from "react-rnd";
import { Modal, Range, TextInput, Button} from 'react-materialize';

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
        imageDimensions
        backgroundColor
        borderColor
        borderWidth
        borderRadius
        location
        dimensions
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
        $imageDimensions: [[Int]]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $dimensions: [Int]!,
        $location: [Int]!) {
            updateLogo(
                id: $id,
                texts: $texts,
                textLocations: $textLocations,
                textColors: $textColors,
                fontSizes: $fontSizes,
                images: $images,
                imageLocations: $imageLocations,
                imageDimensions: $imageDimensions,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                dimensions: $dimensions,
                location: $location) {
                    lastUpdate
                }
        }
`;

const genText = (texts, textLocations, textColors, fontSizes) => {
    if(texts){
        return(
            texts.map((text, index) => (
                <Rnd key={index}
                bounds="parent"
                enableResizing="false"
                default={{
                    x:textLocations[index][0]?textLocations[index][0]:0,
                    y:textLocations[index][1]?textLocations[index][1]:0,
                }}
                onClick =  {
                    () => {}
                }
                onDragStop = {
                    (e,d) => {
                         textLocations[index][0] = parseInt(d.x)
                         textLocations[index][1] = parseInt(d.y)
                    }
                }
                style={{
                textAlign: 'center',
                color: textColors[index],
                fontSize: fontSizes[index]}}>{text}</Rnd>
            ))
        )
    }
}
const genImages = (images, imageLocations, imageDimensions) => {
    if(images){
        return(
            images.map((image, index) => (
                <Rnd key={index}
                bounds="parent"
                default={{
                    x:imageLocations[index][0],
                    y:imageLocations[index][1],
                }}
                onClick =  {
                    () => {}
                }
                onDragStop = {
                    (e,d) => {
                         imageLocations[index][0] = parseInt(d.x)
                         imageLocations[index][1] = parseInt(d.y)
                    }
                }
                enableResizing="false"
                style={{
                textAlign: 'center'}}><img width={imageDimensions[index][0]} height={imageDimensions[index][1]}  draggable="false" src={images[index]} alt="img"></img></Rnd>
            ))
        )
    }
}
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
            width: "",
            height: "",
            location: "",
            textChange: false,
            text: "",
            sizeChange: false,
            size: "",
            colorChange: false,
            color: "",
        }
    }

    genTextList = (list, fontSizes, fontColor,textLocations) => {
        return( 
            <ul className="list-group overflow-auto" style={{maxHeight: 150 + 'px'}}>
                {list.map((x, index) =>(
                    <li key={index} className="list-group-item">{x}
                        <Modal className="col-6" actions={[<Button flat modal="close" node="button" waves="red" onClick={()=>{
                                console.log(this.state.text);
                                if(this.state.textChange){
                                    let texts=this.state.texts?this.state.texts:list
                                    texts[index]=this.state.text;
                                }
                                if(this.state.sizeChange){
                                    let sizes=this.state.fontSizes?this.state.fontSizes:fontSizes;
                                    sizes[index]=parseInt(this.state.size);
                                }
                                if(this.state.colorChange){
                                    let color = this.state.textColors?this.state.textColors:fontColor;
                                    color[index] = this.state.color;
                                }
                                // let location = this.state.textLocations?this.state.textLocations:textLocations
                                // location.push([0,0])
                                this.setState({textChange:false})
                            }}>Change</Button>,
                                        <Button flat modal="close" node="button" waves="green">Close</Button>]}
                            trigger={<button className="waves-effect waves-light btn-small" style={{float:"right"}}>Edit</button>}>
                            <div className="modal-content">
                                <h4>Edit Text</h4>
                                <div className="form-group">
                                    <label htmlFor="text">Text:</label>
                                    <input type="text" className="form-control" onChange={(e)=>{this.setState({text:e.target.value,textChange:true})}} name="text" placeholder={x} defaultValue={x} />
                                    <label htmlFor="fontSize">Font Size:</label>
                                    <input type="number" min = "5" max="100" className="form-control" onChange={(e)=>{this.setState({size:e.target.value,sizeChange:true})}} name="fontSize" placeholder={fontSizes[index]} defaultValue={fontSizes[index]} />
                                    <label htmlFor="fontColor">Font Color:</label>
                                    <input type="color" className="form-control" name="fontColor" onChange={(e)=>{this.setState({color:e.target.value,colorChange:true})}} placeholder={fontColor[index]} defaultValue={fontColor[index]} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <span className="red-text"></span>
                            </div>
                        </Modal>
                    </li>
                ))}
            </ul>
            )
    }
    genImageList = (list) =>{
        return( 
            <ul className="list-group overflow-auto" style={{maxHeight: 150 + 'px'}}>
                {list.map((x, index) =>(
                    <li key={index} className="list-group-item"><img src={x} width="25" height="25" alt="Error"></img></li>
                ))}
            </ul>)
    }

    render() {
        let texts, textLocations, textColors, fontSizes, images, imageLocations, backgroundColor, borderColor, borderRadius, borderWidth, location, width, height;
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
                                            <form className="col-4" onSubmit={e => {
                                                e.preventDefault();
                                                console.log(width.value, height.value)
                                                let texts2 = data.logo.texts
                                                let textLocations2 = data.logo.textLocations
                                                let textColors2 = data.logo.textColors
                                                let fontSizes2 = data.logo.fontSizes
                                                let images2 = data.logo.images
                                                let imageLocations2 = data.logo.imageLocations
                                                let imageDimensions2 = data.logo.imageDimensions
                                                let location2 = data.logo.location
                                                let dimensions2 = [parseInt(width.value), parseInt(height.value)]
                                                console.log(texts2, textColors2, fontSizes2, images2, imageLocations2, location2);
                                                console.log(backgroundColor.value)
                                                updateLogo({ variables: { id: data.logo._id, texts: texts2, textLocations: textLocations2, textColors: textColors2, fontSizes: fontSizes2,
                                                                        images: images2, imageLocations: imageLocations2, imageDimensions: imageDimensions2, backgroundColor: backgroundColor.value,
                                                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                                                        location: location2, dimensions: dimensions2} });
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
                                                <div className="form-group col-10">
                                                    <label htmlFor="texts">Texts:</label>
                                                    <div>{this.genTextList(data.logo.texts, data.logo.fontSizes, data.logo.textColors, data.logo.textLocations)}</div>
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="images">Images:</label>
                                                    <div>{this.genImageList(data.logo.images)}</div>                                                
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({backgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({borderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => this.setState({borderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => this.setState({borderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="width">Width:</label>
                                                    <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 700);}} className="form-control" name="width" ref={node => {
                                                        width = node;
                                                    }} onChange={() => this.setState({width: parseInt(width.value)})} placeholder={data.logo.dimensions[0]} defaultValue={data.logo.dimensions[0]} />
                                                </div>
                                                <div className="form-group col-10">
                                                    <label htmlFor="height">Height:</label>
                                                    <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 700);}} className="form-control" name="height" ref={node => {
                                                        height = node;
                                                    }} onChange={() => this.setState({height: parseInt(height.value)})} placeholder={data.logo.dimensions[1]} defaultValue={data.logo.dimensions[1]} />
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            <div className="col-6">
                                                <div style={{
                                                    display: "inline-block",
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                    backgroundColor: this.state.backgroundColor ? this.state.backgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.borderColor ? this.state.borderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                    borderWidth: (this.state.borderWidth ? this.state.borderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.borderRadius ? this.state.borderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.padding ? this.state.padding : data.logo.padding) + "px",
                                                    width: (this.state.width? this.state.width : data.logo.dimensions[0]),
                                                    height: (this.state.height? this.state.height : data.logo.dimensions[1])
                                                }}>{genText(this.state.texts?this.state.texts:data.logo.texts, this.state.textLocations?this.state.textLocations:data.logo.textLocations, this.state.textColors?this.state.textColors:data.logo.textColors, this.state.fontSizes?this.state.fontSizes:data.logo.fontSizes)}
                                                {genImages(data.logo.images, data.logo.imageLocations, data.logo.imageDimensions)}</div>
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