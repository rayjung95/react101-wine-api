import React, { Component } from 'react';

export default class Wine extends Component {


  render() {
    console.log("this is props----------------------------------")
    console.log(this.props)
    const url = `https://wines-api.herokuapp.com/api/wines/${this.props.wineID}/image`
    return (
        <div className="col s12 m12 l6">
            <h1 className="center-align">Wine details</h1>
            <div className="card horizontal">
                <div className="card-image">
                <img className="responsive-img wine-detail-image" alt="Wine bottle pic" src={url} />
                </div>
                <div className="card-stacked">
                <div className="card-content">
                     <h3>{this.props.wine.appellation.name}</h3>
                    <br/>
                    <p><b>Appellation:</b> {this.props.wine.appellation.name}</p>
                    <p><b>Region:</b> {this.props.wine.appellation.region}</p>
                    <p><b>Color:</b> {this.props.wine.type}</p>
                    <p><b>Grapes:</b> {this.props.wine.grapes.map((grape,i)=>this.props.wine.grapes.length===i+1?grape:grape+",")}</p>
                </div>
                <div className="card-action"></div>
                </div>
            </div>
        </div>
    );
  }
}