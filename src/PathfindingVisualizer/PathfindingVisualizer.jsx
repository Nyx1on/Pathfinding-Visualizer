import React, { useState, useEffect, useRef } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import { dijkstra, getShortestPathNodesInOrder } from "../algorithm/dijkstra";
import Navbar from "../navbar/Navbar";

let START_NODE_ROW = 12;
let START_NODE_COL = 14;
let FINISH_NODE_ROW = 12;
let FINISH_NODE_COL = 35;

export default function PathfindingVisualizer() {
  const [node, setNode] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startCreateWalls, setStartCreateWalls] = useState(false);
  const [moveStart, setMoveStart] = useState(false);
  const [moveFinish, setMoveFinish] = useState(false);
  const createInitialGrid = (reset = false) => {
    // This reset bool will check wheather the user want to reset the grid or not:
    //  - if reset -> false then it will take new_row, new_col
    //  - if reset -> true then it will reset to default coordinates
    if (reset) {
      START_NODE_ROW = 12;
      START_NODE_COL = 14;
      FINISH_NODE_ROW = 12;
      FINISH_NODE_COL = 35;
    }
    const node = [];
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      node.push(currentRow);
    }
    setNode(node);
  };
  useEffect(() => {
    createInitialGrid();
  }, []);

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const createWalls = (row, col) => {
    const newNode = node.slice();
    const newGrid = newNode[row][col];
    newNode[row][col].isWall = !newGrid.isWall;
    setNode(newNode);
  };

  const moveStartNode = (row, col) => {
    const newNode = node.slice();
    const grid = newNode[row][col];
    newNode[row][col].isStart = !grid.isStart;
    START_NODE_ROW = row;
    START_NODE_COL = col;
    setNode(newNode);
  };

  const moveFinishNode = (row, col) => {
    const newNode = node.slice();
    const grid = newNode[row][col];
    newNode[row][col].isFinish = !grid.isFinish;
    FINISH_NODE_ROW = row;
    FINISH_NODE_COL = col;
    setNode(newNode);
  };

  const clearWalls = () => {
    const newNode = node.slice();
    for (var i = 0; i < newNode.length; i++) {
      for (var j = 0; j < newNode[i].length; j++) {
        newNode[i][j].isWall = false;
      }
    }
    setNode(newNode);
  };

  const handleMouseDown = (isStart, row, col, isFinish) => {
    if (isStart) {
      moveStartNode(row, col);
      setMoveStart(true);
    }
    if (isFinish) {
      moveFinishNode(row, col);
      setMoveFinish(true);
    }
    if (startCreateWalls && !isStart && !isFinish) {
      createWalls(row, col);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!startCreateWalls || !mouseIsPressed || moveStart || moveFinish) return;
    createWalls(row, col);
  };

  const handleMouseUp = (row, col) => {
    if (startCreateWalls) {
      setMouseIsPressed(false);
    }
    if (moveStart) {
      moveStartNode(row, col);
      setMoveStart(false);
    }
    if (moveFinish) {
      moveFinishNode(row, col);
      setMoveFinish(false);
    }
  };
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPath) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (i === 0) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start-visited";
        } else if (i === visitedNodesInOrder.length - 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPath) => {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPath[i];
        if (i === nodesInShortestPath.length - 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish-shortestpath";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortestpath";
        }
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = node[START_NODE_ROW][START_NODE_COL];
    const finishNode = node[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(node, startNode, finishNode);
    const nodesInShortestPath = getShortestPathNodesInOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPath);
    if (finishNode.previousNode === null)
      alert("Could not find the shortest path.");
  };

  const reset = () => {
    // Initializing the Default Grid
    createInitialGrid(true);
    // Getting All the visited nodes and shortestpath Visited Node.
    const allVisitedNodes = document.querySelectorAll(`.node-visited`);
    const allShortestPathNodes =
      document.querySelectorAll(`.node-shortestpath`);

    // Using forEach iterating over each DOM element and removing node-visited class from both visited and shortedPathVisited Node's
    allVisitedNodes.forEach((v) => {
      v.classList.remove("node-visited");
    });
    allShortestPathNodes.forEach((v) => {
      v.classList.remove("node-shortestpath");
    });

    // At last to change th BG color of start and end node to default replacing with initial Classes.
    document
      .querySelector(".node-start-visited")
      .classList.replace("node-start-visited", "node-start");
    document
      .querySelector(".node-finish-shortestpath")
      .classList.replace("node-finish-shortestpath", "node-finish");
  };
  return (
    <>
      <div className="pathfinding-visualiser">
        <Navbar
          visualizeDijkstra={visualizeDijkstra}
          startCreateWalls={startCreateWalls}
          setStartCreateWalls={setStartCreateWalls}
          clearWalls={clearWalls}
          reset={reset}
        ></Navbar>
      </div>
      <table className="grid">
        <tbody>
          {node.map((row, rowIdx) => {
            return (
              <tr className="rows" key={rowIdx}>
                {row.map((currentNode, currentNodeIdx) => {
                  const { row, col, isStart, isFinish, isVisited, isWall } =
                    currentNode;
                  return (
                    <Node
                      key={currentNodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isWall={isWall}
                      onMouseDown={(isStart, row, col, isFinish) => {
                        handleMouseDown(isStart, row, col, isFinish);
                      }}
                      onMouseEnter={(row, col) => {
                        handleMouseEnter(row, col);
                      }}
                      onMouseUp={(row, col) => {
                        handleMouseUp(row, col);
                      }}
                    ></Node>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
