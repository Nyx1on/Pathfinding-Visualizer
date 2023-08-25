import React from "react";
import "node.css";

export default function Node(props) {
  const {
    row,
    col,
    isStart,
    isFinish,
    isVisited,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;

  const nodeName = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
    : isVisited
    ? "node-visited"
    : isWall
    ? "node-wall"
    : "";

  return (
    <td
      id={`node-${row}-${col}`}
      className={`node ${nodeName}`}
      onMouseDown={() => onMouseDown(isStart,row, col,isFinish)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row,col)}
    ></td>
  );
}
