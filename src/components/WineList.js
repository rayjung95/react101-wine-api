import React, {Component} from 'react';

export default class WineList extends Component {
  
  onSelectWine = (id) => {
    console.log(id)
    this.props.onSelectWine(id);
  };
  
  render(){
    console.log("im in wine list")
    console.log(this.props.wineID)
      return(
        <div className="col s12 m6 l3">
          <h1 className="center-align">Wines</h1>
            <div className="collection">
            {
              this.props.wines.map( (wine,i) =>{
                return(
                  <a href="#" className={this.props.wineID===wine.id? "collection-item active": "collection-item" } key={wine.id} onClick={e => this.onSelectWine(wine.id)} >
                    {wine.id}
                  </a>
                )
              }
                
              )
            }
            </div>
        </div>
      )
  }
};