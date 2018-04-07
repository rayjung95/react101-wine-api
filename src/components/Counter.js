import React, { Component } from 'react';

export default class Counter extends Component {
    constructor(props){
        super(props)
        this.state={
            count: 0
        }
    }
    incrementCounter = () => {
        this.setState({ count: this.state.count + 1 }); // trigger a component redraw
    };

    render() {
        return (
        <div>
            <h2>Count: {this.state.count}</h2>
            <button type="button" onClick={() => this.incrementCounter()}>increment</button>
        </div>
        );
    }
}