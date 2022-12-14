import React from "react";
import "./navbar.css";

export default function Navbar(props) {
  const { visualizeDijkstra, startCreateWalls, setStartCreateWalls, clearWalls } = props;
  return (
    <>
      <div className="Navbar">
        <div className="logo">
          <h1>
            Pathfinding Visualizer
          </h1>
        </div>
        <div className="buttons">
          <button
            className="create-walls"
            onClick={() => {
              const currentWall = !startCreateWalls;
              setStartCreateWalls(currentWall);
            }}
          >
            Create Walls
          </button>
          <button className="visualize-dijkstra" onClick={visualizeDijkstra}>
            Visualize Dijkstra's algorithm
          </button>
          <button className="gen-btn" onClick={clearWalls}>
            Clear Walls
          </button>
        </div>
      </div>
      <div className="footer">
          <div className="startNode"></div>
          <div className="text">: Start Node</div>
          <div className="finishNode"></div>
          <div className="text">: End Node</div>
      </div>
    </>
  );
}
