import React, { Component } from 'react';
import Regions from './Regions'
import WineList from './WineList'
import Wine from './Wine'
import { comment } from 'postcss';

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
        isWineLiked:null,
        comments:[]
      }
      this.likeWine = this.likeWine.bind(this);
      this.unlikeWine = this.unlikeWine.bind(this);
      this.isWineLiked = this.isWineLiked.bind(this);
      this.fetchRegions = this.fetchRegions.bind(this);
      this.fetchWinesFrom = this.fetchWinesFrom.bind(this);
      this.fetchWine = this.fetchWine.bind(this);
      this.fetchComments = this.fetchComments.bind(this);
      this.onSelectRegion = this.onSelectRegion.bind(this);
      this.onSelectWine = this.onSelectWine.bind(this);
  }
  

  componentDidMount() {
    console.log("didmount")
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
        this.isWineLiked(wines[0].id)
        this.fetchComments(wines[0].id)
        console.log(wines[0].id)
        this.state.wines=wines
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
      this.fetchComments(id)
      this.setState({
        selectedWine:wine,
        selectedWineID:wine.id
      })
    })
  }

  fetchComments(id) {
    return fetch(`https://wines-api.herokuapp.com/api/wines/${id}/comments`)
    .then((r)=>{return r.json()})
    .then((comments)=>{
      console.log(comments)
      this.setState({
        comments
      })
    })
  }

  likeWine(id) {
    return fetch(`https://wines-api.herokuapp.com/api/wines/${id}/like`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ like: true })
    })
    .then(this.setState({
      isWineLiked:true
    }))

  }

  unlikeWine(id) {
    return fetch(`https://wines-api.herokuapp.com/api/wines/${id}/like`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ like: false })
    }).then(this.setState({
      isWineLiked:false
    }))
  }
  
  isWineLiked(id) {
    return fetch(`https://wines-api.herokuapp.com/api/wines/${id}/like`)
    .then((r) => {return r.json()})
    .then((isWineLiked)=>{
      this.setState({
        isWineLiked:isWineLiked.like
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
    this.isWineLiked(id)
    this.fetchComments(id)
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
            isWineLiked={this.state.isWineLiked}
            likeWine={this.likeWine}
            unlikeWine={this.unlikeWine}
            comments={this.state.comments}
          />
          }
          
        </div>
      </div>
    );
  }
}




