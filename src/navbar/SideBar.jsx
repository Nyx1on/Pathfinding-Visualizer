import React from "react";
import "./sidebar.css";
import { useRef } from "react";

export default function SideBar(props) {
  const {
    visualizeDijkstra,
    startCreateWalls,
    setStartCreateWalls,
    clearWalls,
    reset,
  } = props;
  const btnRef = useRef();
  function handleClick() {
    const currentWall = !startCreateWalls;
    setStartCreateWalls(currentWall);
    btnRef.current.classList.toggle("focus");
  }
  return (
    <>
      <div className="SideBar">
        <div className="logo">
          <h1>Pathfinding Visualizer</h1>
        </div>
        <div
          className="buttons"
          style={{ padding: "20px", textAlign: "center" }}
        >
          <ul>
            <li className="item">
              <button className="gen-btn" onClick={reset}>
                Reset
              </button>
            </li>
            <li className="item">
              <button
                ref={btnRef}
                className="create-walls"
                onClick={handleClick}
              >
                Create Walls
              </button>
            </li>
            <li className="item">
              <button className="gen-btn" onClick={clearWalls}>
                Clear Walls
              </button>
            </li>
            <li className="item">
              <button
                className="visualize-dijkstra"
                onClick={visualizeDijkstra}
              >
                Visualize Dijkstra's algorithm
              </button>
            </li>
          </ul>
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
