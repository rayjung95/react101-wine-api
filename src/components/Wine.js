import React, { Component } from 'react';
import Comments from './Comments'

export default class Wine extends Component {


  render() {

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
                        <h3>{this.props.wine.name}</h3>
                        <br/>
                        <p><b>Appellation:</b> {this.props.wine.appellation.name}</p>
                        <p><b>Region:</b> {this.props.wine.appellation.region}</p>
                        <p><b>Color:</b> {this.props.wine.type}</p>
                        <p><b>Grapes:</b> {this.props.wine.grapes.map((grape,i)=>this.props.wine.grapes.length===i+1?grape:grape+",")}</p>
                    </div>
                    {this.props.comments[0]? <h5>Comments</h5> : null}
                    {this.props.comments.map((comment,index)=>{
                        return (
                            <Comments
                                key={index}
                                comment={comment}
                            />
                        )
                    })}
                    <div className="card-action">
                        <a className="waves-effect waves-teal btn-flat" onClick={this.props.isWineLiked? e=>this.props.unlikeWine(this.props.wine.id): e=>this.props.likeWine(this.props.wine.id)}>
                            {this.props.isWineLiked?<span> Like <i className="material-icons left">thumb_up</i></span>:<span> UnLike <i className="material-icons left">thumb_down</i></span> } 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}