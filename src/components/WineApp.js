import React, { Component } from 'react';
import Regions from './Regions'
import WineList from './WineList'
import Wine from './Wine'

export default class WineApp extends Component {
  constructor(props){
      super(props);
      this.state={
        regions: [],
        selectedRegion: null,
        wines: [],
        selectedWineID: null,
        selectedWine:{
            id: "cheval-noir",
            name: "Cheval Noir",
            type: "Rouge",
            appellation: {
              name: "Saint-Emilion",
              region: "Bordeaux"
            },
            grapes: [
              "Cabernet Sauvignon",
              "Merlot",
              "Cabernet Franc"
            ]
        },
      }
      this.fetchRegions = this.fetchRegions.bind(this);
      this.fetchWinesFrom = this.fetchWinesFrom.bind(this);
      this.fetchWine = this.fetchWine.bind(this);
      this.onSelectRegion = this.onSelectRegion.bind(this);
      this.onSelectWine = this.onSelectWine.bind(this);
  }
  

  componentDidMount() {
    console.log("didmoutn")
    // load regions and maybe wines from the first region
    this.fetchRegions()
  }

  fetchRegions() {
    return fetch(`https://wines-api.herokuapp.com/api/regions`)
    .then(r => r.json())
    .then((regions)=>{
      this.fetchWinesFrom(regions[0])
      return this.setState({
        regions,
        selectedRegion:regions[0]
      })
    });
  }

  fetchWinesFrom(region) {
    return fetch(`https://wines-api.herokuapp.com/api/wines?region=${region}`)
    .then((r) => {
      return r.json()
    })
    .then((wines)=>{
      if(wines[0]){
        this.setState({
          wines,
          selectedWineID:wines[0].id
        })
        return this.fetchWine(wines[0].id)
      }
      else{
        return this.setState({
          wines,
          selectedWineID:null
        })
      }
      
    })
  }

  fetchWine(id) {
    return fetch(`https://wines-api.herokuapp.com/api/wines/${id}`)
    .then((r) => {return r.json()})
    .then((wine)=>{
      this.setState({
        selectedWine:wine,
        selectedWineID:wine.id
      })
    })
  }

  onSelectRegion = (region) => {
    this.fetchWinesFrom(region)
    this.setState({ 
      selectedRegion: region 
    });
    
    // TODO : maybe we need to reload wines here ???
  };


  onSelectWine = (id) => {
    // load wine details from wine id
    this.fetchWine(id)
  };


  render() {
    return (
      <div className="container">
        <h1 className="center-align">Open with Database</h1>
        <div className="center-align">
        You can read the Wines API documentation at
        <a href="https://bit.ly/rbw-api" > https://wines-api.herokuapp.com </a>
        and try it
        <a href="https://bit.ly/rbw-api-swag" > here </a>
        </div>
        <div className="row">
          <Regions
            regions={this.state.regions}
            region={this.state.selectedRegion} 
            onSelectRegion={this.onSelectRegion} />
          
          <WineList
            wines={this.state.wines}
            wineID={this.state.selectedWineID}
            onSelectWine={this.onSelectWine}
          />
          {this.state.selectedWineID==null? 
          null
          :
          <Wine
            wine={this.state.selectedWine}
            wineID={this.state.selectedWineID}
          />
          }
          
        </div>
      </div>
    );
  }
}

