import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import html2canvas from 'html2canvas';
import { Rnd } from "react-rnd";

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
            dimensions
            margin
            padding
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

const genList = (list, type) => {
    if (type === "text"){
        return( 
        <ul className="list-group col-6 overflow-auto" style={{maxHeight: 150 + 'px'}}>
            {list.map((x, index) =>(
                <li key={index} className="list-group-item">{x}</li>
            ))}
        </ul>
        )
    }else{
        return( 
            <ul className="list-group col-6 overflow-auto" style={{maxHeight: 150 + 'px'}}>
                {list.map((x, index) =>(
                    <li key={index} className="list-group-item"><img src={x} width="25" height="25" alt="Error"></img></li>
                ))}
            </ul>
            )
    }
}

class ViewLogoScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            image: "",
            name: "",
        }
    }
    genText = (texts, textLocations, textColors, fontSizes, margin) => {
        if(texts.length!==textLocations.length){
            textLocations.push([0,0])
        }
        return(
            texts.map((text, index) => (
                <Rnd key={index}
                bounds="parent"
                enableResizing="false"
                disableDragging="true"
                default={{
                    x:textLocations[index][0]?textLocations[index][0]:0,
                    y:textLocations[index][1]?textLocations[index][1]:0,
                }}
                style={{
                textAlign: 'center',
                color: textColors[index],
                fontSize: fontSizes[index]}}>{text}</Rnd>
            ))
        )
    }
    genImages = (images, imageLocations, imageDimensions, margin) => {
        if(images){
            return(
                images.map((image, index) => (
                    <Rnd key={index}
                    bounds="parent"
                    default={{
                        x:imageLocations[index][0],
                        y:imageLocations[index][1],
                    }}
                    disableDragging="true"
                    enableResizing="false"
                    style={{
                    textAlign: 'center'}}><img width={imageDimensions[index][0]} height={imageDimensions[index][1]}  draggable="false" src={images[index]} alt="img"></img></Rnd>
                ))
            )
        }
    }
    handleExport = () => {
        html2canvas(document.querySelector("#capture")).then(canvas => {
            let uri = canvas.toDataURL()
            let link = document.createElement('a');
            link.href = uri
            link.download = "idk.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        });
    }
    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body row">
                                    <div className="col-4">
                                        <dl>
                                            <dt>Download Here:</dt>
                                            <dd><input type="button" onClick={this.handleExport} className="btn btn-info" value="Download"></input></dd>
                                            <dt>Texts:</dt>
                                            <dd>{genList(data.logo.texts, "text")}</dd>
                                            <dt>Images:</dt>
                                            <dd>{genList(data.logo.images, "image")}</dd>
                                            <dt>BackgroundColor:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>BorderColor:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Dimension:</dt>
                                            <dd>{data.logo.dimensions[0]} x {data.logo.dimensions[1]}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    </div>
                                    <div className="col-8">
                                        <div id="capture" 
                                        style={{
                                            display: "inline-block",
                                            width:data.logo.dimensions[0],
                                            height:data.logo.dimensions[1],
                                            textAlign: 'center',
                                            color: data.logo.color,
                                            backgroundColor: data.logo.backgroundColor,
                                            borderColor: data.logo.borderColor,
                                            borderStyle: "solid",
                                            fontSize: data.logo.fontSize + "pt",
                                            borderWidth: data.logo.borderWidth + "px",
                                            borderRadius: data.logo.borderRadius + "px",
                                            padding: data.logo.padding + "px",
                                            margin: data.logo.margin + "px"
                                        }}>{this.genText(data.logo.texts, data.logo.textLocations, data.logo.textColors, data.logo.fontSizes, data.logo.margin)}
                                        {this.genImages(data.logo.images, data.logo.imageLocations, data.logo.imageDimensions, data.logo.margin)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;