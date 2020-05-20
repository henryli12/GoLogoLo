import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import { Rnd } from "react-rnd";
import { Modal, Button} from 'react-materialize';

const ADD_LOGO = gql`
    mutation AddLogo(
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
        $margin: Int!,
        $padding: Int!) {
        addLogo(
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
            margin: $margin,
            padding: $padding) {
                lastUpdate
            }
        }
`;

class CreateLogoScreen extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            texts: ["GoLogoLo"],
            textLocations: [[150,100]],
            textColors: ["#FF1211"],
            fontSizes: [40],
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"],
            imageLocations: [[200,200]],
            imageDimensions: [[100,100]],
            backgroundColor: "#22FFFF",
            borderColor: "#0000FF",
            borderRadius: "30",
            borderWidth: "10",
            width: "500",
            height: "500",
            padding: "10",
            margin: "20",
            textChange: false,
            text: "",
            sizeChange: false,
            size: "",
            colorChange: false,
            color: "",
            urlChange: false,
            url: "",
            imgWidthChange: false,
            imgWidth:"",
            imgHeightChange: false,
            imgHeight:"",
        }
    }
    genTextList = (list, fontSizes, fontColor,textLocations) => {
        return( 
            <div>
            <ul className="list-group overflow-auto" style={{maxHeight: 150 + 'px'}}>
                {list.map((x, index) =>(
                    <li key={index} className="list-group-item">{x}
                        <Modal className="col-6" actions={[<Button flat modal="close" node="button" waves="red" onClick={()=>{
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
                                this.setState({textChange:false, sizeChange:false, colorChange:false})
                            }}>Change</Button>,
                                        <Button flat modal="close" node="button" waves="green">Close</Button>,
                                        <Button flat modal="close" node="button" onClick={()=>{
                                            let texts=this.state.texts?this.state.texts:list;
                                            texts.splice(index,1)
                                            let sizes=this.state.fontSizes?this.state.fontSizes:fontSizes;
                                            sizes.splice(index,1)
                                            let color = this.state.textColors?this.state.textColors:fontColor;
                                            color.splice(index,1)
                                            let location = this.state.textLocations?this.state.textLocations:textLocations;
                                            location.splice(index,1)
                                            this.setState({textChange:false});
                                        }}>&#128465;</Button>]}
                            trigger={<button className="waves-effect waves-light btn-small" style={{float:"right"}}>Edit</button>}>
                                <h4>Edit Text</h4>
                                <label htmlFor="text">Text:</label>
                                <input type="text" className="form-control" onChange={(e)=>{this.setState({text:e.target.value,textChange:true})}} name="text" placeholder={x} defaultValue={x} />
                                <label htmlFor="fontSize">Font Size:</label>
                                <input type="number" min = "5" max="100" className="form-control" onChange={(e)=>{this.setState({size:e.target.value,sizeChange:true})}} name="fontSize" placeholder={fontSizes[index]} defaultValue={fontSizes[index]} />
                                <label htmlFor="fontColor">Font Color:</label>
                                <input type="color" className="form-control" name="fontColor" onChange={(e)=>{this.setState({color:e.target.value,colorChange:true})}} placeholder={fontColor[index]} defaultValue={fontColor[index]} />
                        </Modal>
                    </li>
                ))}
            </ul>
            <Modal className="col-6" actions={[<Button flat modal="close" node="button" waves="red" onClick={()=>{
                    let texts=this.state.texts?this.state.texts:list
                    if(this.state.textChange){
                        texts.push(this.state.text);
                    }else{
                        texts.push("GoLogoLo")
                    }
                    let sizes=this.state.fontSizes?this.state.fontSizes:fontSizes;
                    if(this.state.sizeChange){
                        sizes.push(parseInt(this.state.size));
                    }else{
                        sizes.push(20);
                    }
                    let color = this.state.textColors?this.state.textColors:fontColor;
                    if(this.state.colorChange){
                        color.push(this.state.color);
                    }else{
                        color.push("#111111")
                    }
                    let location = this.state.textLocations?this.state.textLocations:textLocations
                    location.push([0,0])
                    this.setState({textChange:false, sizeChange:false, colorChange:false})
                }}>Add</Button>,
                            <Button flat modal="close" node="button" waves="green">Close</Button>]}
                trigger={<button className="waves-effect waves-light btn-small" style={{float:"right"}}>Add Text</button>}>
                    <h4>Add Text</h4>
                    <label htmlFor="text">Text:</label>
                    <input type="text" className="form-control" onChange={(e)=>{this.setState({text:e.target.value,textChange:true})}} name="text" placeholder="GoLogoLo" defaultValue="GoLogoLo" />
                    <label htmlFor="fontSize">Font Size:</label>
                    <input type="number" min = "5" max="100" className="form-control" onChange={(e)=>{this.setState({size:e.target.value,sizeChange:true})}} name="fontSize" placeholder="20" defaultValue="20" />
                    <label htmlFor="fontColor">Font Color:</label>
                    <input type="color" className="form-control" name="fontColor" onChange={(e)=>{this.setState({color:e.target.value,colorChange:true})}} placeholder="#111111" defaultValue="#111111" />
            </Modal>
        </div>
            )
    }
    genImageList = (list, dimensions, locations) =>{
        return( 
            <div>
                <ul className="list-group overflow-auto" style={{maxHeight: 150 + 'px'}}>
                    {list.map((x, index) =>(
                        <li key={index} className="list-group-item"><img src={x} width="25" height="25" alt="Error"></img>
                        <Modal className="col-6" actions={[<Button flat modal="close" node="button" waves="red" onClick={()=>{
                            if(this.state.urlChange){
                                let imgs=this.state.images?this.state.images:list
                                imgs[index]=this.state.url;
                            }
                            let dimes=this.state.imageDimensions?this.state.imageDimensions:dimensions;
                            if(this.state.imgWidthChange){
                                dimes[index][0]=parseInt(this.state.imgWidth);
                            }
                            if(this.state.imgHeightChange){
                                dimes[index][1]=parseInt(this.state.imgHeight);
                            }
                            this.setState({urlChange:false, imgWidthChange:false, imgHeightChange:false})
                        }}>Change</Button>,
                                    <Button flat modal="close" node="button" waves="green">Close</Button>,
                                    <Button flat modal="close" node="button" onClick={()=>{
                                        let imgs=this.state.images?this.state.images:list;
                                        imgs.splice(index,1)
                                        let dimes=this.state.imageDimensions?this.state.imageDimensions:dimensions;
                                        dimes.splice(index,1)
                                        let location = this.state.imageLocations?this.state.imageLocations:locations;
                                        location.splice(index,1)
                                        this.setState({urlChange:false});
                                    }}>&#128465;</Button>]}
                        trigger={<button className="waves-effect waves-light btn-small" style={{float:"right"}}>Edit</button>}>
                            <h4>Edit Image</h4>
                            <label htmlFor="url">URL:</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({url:e.target.value, urlChange:true})}} name="url" placeholder={x} defaultValue={x} />
                            <label htmlFor="imgWidth">Width:</label>
                            <input type="number" className="form-control" max="500" min="10" onChange={(e)=>{this.setState({imgWidth:e.target.value, imgWidthChange:true})}} name="imgWidth" placeholder={dimensions[index][0]} defaultValue={dimensions[index][0]} />
                            <label htmlFor="imgHeight">Height:</label>
                            <input type="number" className="form-control" max="500" min="10" onChange={(e)=>{this.setState({imgHeight:e.target.value, imgHeightChange:true})}} name="imgHeight" placeholder={dimensions[index][1]} defaultValue={dimensions[index][1]} />
                    </Modal></li>
                    ))}
                </ul>
                <Modal className="col-6" actions={[<Button flat modal="close" node="button" waves="red" onClick={()=>{
                    let imgs=this.state.images?this.state.images:list
                    if(this.state.urlChange){
                        imgs.push(this.state.url);
                    }else{
                        return
                    }
                    let dimes=this.state.imageDimensions?this.state.imageDimensions:dimensions;
                    let values = [0,0]
                    if(this.state.imgWidthChange){
                        values[0] = this.state.imgWidth
                    }else{
                        values[0] = 100
                    }
                    if(this.state.imgHeightChange){
                        values[1] = this.state.imgHeight
                    }else{
                        values[1] = 100
                    }
                    dimes.push(values)
                    let location = this.state.imageLocations?this.state.imageLocations:locations
                    location.push([0,0])
                    this.setState({urlChange:false, imgWidthChange:false, imgHeightChange:false})
                }}>Add</Button>,
                            <Button flat modal="close" node="button" waves="green">Close</Button>]}
                trigger={<button className="waves-effect waves-light btn-small" style={{float:"right"}}>Add Image</button>}>
                    <h4>Edit Image</h4>
                    <label htmlFor="url">URL:</label>
                    <input type="text" className="form-control" onChange={(e)=>{this.setState({url:e.target.value, urlChange:true})}} name="url"/>
                    <label htmlFor="imgWidth">Width:</label>
                    <input type="number" className="form-control" max="500" min="10" onChange={(e)=>{this.setState({imgWidth:e.target.value, imgWidthChange:true})}} name="imgWidth" defaultValue="100" />
                    <label htmlFor="imgHeight">Height:</label>
                    <input type="number" className="form-control" max="500" min="10" onChange={(e)=>{this.setState({imgHeight:e.target.value, imgHeightChange:true})}} name="imgHeight" defaultValue="100" />
            </Modal>
            </div>)
    }
    genText = (texts, textLocations, textColors, fontSizes) => {
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
    genImages = (images, imageLocations, imageDimensions) => {
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
    render() {
        let  backgroundColor, borderColor, borderRadius, borderWidth, padding, width, height, margin;
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
                                <form className="col-4" onSubmit={e => {
                                    e.preventDefault();
                                    let dimensions = [parseInt(this.state.width),parseInt(this.state.height)]
                                    addLogo({ variables: { texts: this.state.texts, textLocations: this.state.textLocations, textColors: this.state.textColors, fontSizes: this.state.fontSizes,
                                                        images: this.state.images, imageLocations: this.state.imageLocations, imageDimensions:this.state.imageDimensions, backgroundColor: backgroundColor.value,
                                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                                        padding: parseInt(padding.value), margin: parseInt(margin.value), dimensions:dimensions} });
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
                                        <div>{this.genTextList(this.state.texts, this.state.fontSizes, this.state.textColors, this.state.textLocations)}</div>
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="images">Images:</label>
                                        <div>{this.genImageList(this.state.images, this.state.imageDimensions, this.state.imageLocations)}</div>                                                
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({backgroundColor: backgroundColor.value})} defaultValue={this.state.backgroundColor} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({borderColor: borderColor.value})} defaultValue={this.state.borderColor} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => this.setState({borderWidth: parseInt(borderWidth.value)})} placeholder={parseInt(this.state.borderWidth)} defaultValue={this.state.borderWidth} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => this.setState({borderRadius: parseInt(borderRadius.value)})} placeholder={parseInt(this.state.borderRadius)} defaultValue={parseInt(this.state.borderRadius)} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="width">Width:</label>
                                        <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 700);}} className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} onChange={() => this.setState({width: parseInt(width.value)})} placeholder={parseInt(this.state.width)} defaultValue={parseInt(this.state.width)} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="height">Height:</label>
                                        <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 700);}} className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} onChange={() => this.setState({height: parseInt(height.value)})} placeholder={parseInt(this.state.height)} defaultValue={parseInt(this.state.height)} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={() => this.setState({margin: parseInt(margin.value)})} placeholder={parseInt(this.state.margin)} defaultValue={parseInt(this.state.margin)} />
                                    </div>
                                    <div className="form-group col-10">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => this.setState({padding: parseInt(padding.value)})} placeholder={parseInt(this.state.padding)} defaultValue={parseInt(this.state.padding)} />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                    <span style={{
                                        display: "inline-block",
                                        color: this.state.color,
                                        backgroundColor: this.state.backgroundColor,
                                        borderColor: this.state.borderColor,
                                        borderStyle: "solid",
                                        borderWidth: this.state.borderWidth + "px",
                                        borderRadius: this.state.borderRadius + "px",
                                        padding: this.state.padding + "px",
                                        margin: this.state.margin + "px",
                                        height: this.state.height + "px",
                                        width: this.state.width + "px"
                                    }}>{this.genText(this.state.texts, this.state.textLocations, this.state.textColors, this.state.fontSizes)}
                                    {this.genImages(this.state.images, this.state.imageLocations, this.state.imageDimensions)}</span>
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