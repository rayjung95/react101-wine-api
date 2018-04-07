import React, { Component } from 'react';

export default class Comments extends Component {

    render() {
        return (
            <div className="card-action">
                <p className="comment" data-title="title of the comment" data-date="date of the comment">
                    {this.props.comment.content}
                </p>
            </div>
        );
    }
}