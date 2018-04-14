import React, { Component } from 'react';

export default class Regions extends Component {
  constructor(props){
    super(props);
    this.onSelectRegion = this.onSelectRegion.bind(this)
  }

  onSelectRegion = (region) => {
    this.props.onSelectRegion(region);
  };

  render () {
    return (
      <div className="col s12 m6 l3">
        <h1 className="center-align">Regions</h1>
        <div className="collection">
          {
            this.props.regions.map((region, i) =>{
              return(
                <a href="#" className={this.props.region===region? "collection-item active": "collection-item" } key={region} onClick={this.onSelectRegion(region)}>
                  {region}
                </a>
              )}
            )
          }
        </div>
      </div>
    )
  }
}