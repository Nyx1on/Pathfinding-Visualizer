import React from "react";
import "./navbar.css";
import { useRef } from "react";

export default function Navbar(props) {
  const { visualizeDijkstra, startCreateWalls, setStartCreateWalls, clearWalls,reset } = props;


  const btnRef = useRef()

  function handleClick() {
    const currentWall = !startCreateWalls;
    setStartCreateWalls(currentWall);
    btnRef.current.classList.toggle('focus')
  }
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
            ref={btnRef}
            className="create-walls"
            onClick={handleClick}
          >
            Create Walls
          </button>
          <button className="visualize-dijkstra" onClick={visualizeDijkstra}>
            Visualize Dijkstra's algorithm
          </button>
          <button className="gen-btn" onClick={clearWalls}>
            Clear Walls
          </button>
          <button className="reset-btn" onClick={reset}>
            Reset
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
