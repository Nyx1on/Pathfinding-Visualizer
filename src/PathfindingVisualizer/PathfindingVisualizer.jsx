import React, { Component } from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css';


export default class PathfindingVisualizer extends Component {
  constructor(props){
    super(props);
    this.state = {
      nodes: [],
    };
  }


  componentDidMount(){
    const node = [];
      for(let row=0;row<20;row++){
        const currentRow = [];
        for(let col=0;col<20;col++){
          const currentNode = {
            row,
            col,
          };
        }
      }
  }
  
  render() {
    const {nodes} = this.state;
    console.log(nodes)

    return (
      <div>
        <Node></Node>
      </div>
    )
  }
}

 