import React from "react";
import "./navbar.css";

export default function Navbar(props) {
  const { visualizeDijkstra, setStartCreateWalls } = props;
  return (
    <div className="Navbar">
      <div className="left">
        <h1 id="logo">
          <a href=".">Pathfinding Visualizer</a>
        </h1>
      </div>
      <div className="centre">
        <div className="buttons">
          <button className="create-walls"
            onClick={() => {
              setStartCreateWalls(true);
            }}
          >
            Create Walls
          </button>
          <button className="visualize-dijkstra" onClick={visualizeDijkstra} >
            Visualize Dijkstra's algorithm
          </button>
        </div>
      </div>
    </div>
  );
}
