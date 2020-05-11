import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
            location
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

const genText = (texts, textLocations, textColors, fontSizes) => {
    return(
        texts.map((text, index) => (
            <div key={index}
            style={{
                position: 'absolute',
                left: textLocations[index][0] + 10,
                top: textLocations[index][1],
                textAlign: 'center',
                color: textColors[index],
                fontSize: fontSizes[index]}}>{text}</div>
        ))
    )
}
const genImages = (images, imageLocations, imageDimensions) => {
    if(images){
        console.log('here')
        return(
            images.map((image, index) => (
                <div key={index}
                style={{
                textAlign: 'center',
                position: 'absolute',
                left: imageLocations[index][0] + 10,
                top: imageLocations[index][1],}}><img width={imageDimensions[index][0]} height={imageDimensions[index][1]}  draggable="false" src={images[index]} alt="img"></img></div>
            ))
        )
    }
}
class ViewLogoScreen extends Component {
    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    console.log(data)
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
                                        <div 
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
                                            padding: data.logo.padding + "px"
                                        }}>{genText(data.logo.texts, data.logo.textLocations, data.logo.textColors, data.logo.fontSizes)}
                                        {genImages(data.logo.images, data.logo.imageLocations, data.logo.imageDimensions)}</div>
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