import React, { useState } from "react";
import "./sidebar.css";
import { useRef } from "react";

export default function SideBar(props) {
  const {
    selectedAlgorithm,
    setSelectedAlgorithm,
    vizualiseAlgorithm,
    startCreateWalls,
    setStartCreateWalls,
    clearWalls,
    reset,
    time,
    setTime,
    distanceFromStart,
  } = props;

  const [speed, setSpeed] = useState(2);

  const btnRef = useRef();
  function handleClick() {
    const currentWall = !startCreateWalls;
    setStartCreateWalls(currentWall);
    btnRef.current.classList.toggle("focus");
  }

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(parseInt(event.target.value));
  };
  return (
    <>
      <div className="SideBar">
        <div className="logo">
          <h1>Algorithm Visualizer</h1>
        </div>
        <div className="buttons" style={{ padding: "20px", textAlign: "left" }}>
          <ul>
            <li className="item">
              <div style={{ textAlign: "left" }}>
                <label htmlFor="algorithmSelector">
                  <p>Selected Algorithm : </p>
                </label>
                <select
                  id="algorithmSelector"
                  value={selectedAlgorithm}
                  onChange={handleAlgorithmChange}
                  className="algorithm-selector"
                >
                  <option value="dijkstra">Dijkstra's Algorithm</option>
                  <option value="BFS">Breadth-First Search</option>
                  <option value="DFS">Depth-First Search</option>
                  {/* <option value="aStar">A Star Algorithm</option> */}
                </select>
              </div>
            </li>
            <li className="item">
              <button
                className="visualize-dijkstra"
                onClick={vizualiseAlgorithm}
              >
                Visualize {selectedAlgorithm} algorithm
              </button>
            </li>
            <li
              className="item"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <button
                ref={btnRef}
                className="create-walls"
                onClick={handleClick}
              >
                Create Walls
              </button>
              <button className="gen-btn" onClick={clearWalls}>
                Clear Walls
              </button>
            </li>
            <li className="item">
              <button className="gen-btn" onClick={reset}>
                Reset
              </button>
            </li>
            <li
              className="item"
              style={{
                fontSize: "24px",
                fontWeight: "500",
                margin: "25px 0px",
              }}
            >
              Distance: {distanceFromStart}
            </li>
            <li className="item" style={{ margin: "25px 0" }}>
              <div className="speed-control">
                <label htmlFor="speedSlider">Speed: </label>
                <input
                  type="range"
                  id="speedSlider"
                  min="1"
                  max="3"
                  step="1"
                  value={speed}
                  onChange={handleSpeedChange}
                  className="speed-slider"
                />
                <div className="speed-label">
                  {speed === 1 ? "Slow" : speed === 2 ? "Medium" : "Fast"}
                </div>
              </div>
            </li>
            <li
              className="item"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "25px",
                padding: "16px",
              }}
            >
              <div
                className="startNode"
                style={{ width: "25px", height: "25px" }}
              />
              <div className="text" style={{ marginLeft: "20px" }}>
                : Start Node
              </div>
            </li>
            <li
              className="item"
              style={{ display: "flex", alignItems: "center", padding: "16px" }}
            >
              <div
                className="finishNode"
                style={{ width: "25px", height: "25px" }}
              />
              <div className="text" style={{ marginLeft: "20px" }}>
                : {distanceFromStart}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
