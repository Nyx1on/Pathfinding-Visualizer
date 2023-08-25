import React, { useEffect, useState } from "react";
import { getShortestPathNodesInOrder } from "../../algorithm/main";
import { dijkstra } from "../../algorithm/dijkstra";
import { bfs } from "../../algorithm/bfs";
import { dfs } from "../../algorithm/dfs";
import SideBar from "../../navbar/SideBar";
import Node from "../Node/Node";
import "./pathfindingvisualizer.css";

let START_NODE_ROW = 12;
let START_NODE_COL = 14;
let FINISH_NODE_ROW = 12;
let FINISH_NODE_COL = 18;

export default function PathfindingVisualizer() {
  const [node, setNode] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startCreateWalls, setStartCreateWalls] = useState(false);
  const [moveStart, setMoveStart] = useState(false);
  const [moveFinish, setMoveFinish] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dijkstra");
  const [time, setTime] = useState(10);
  const [distanceFromStart, setDistanceFromStart] = useState(Infinity);

  useEffect(() => {
    const createInitialGrid = () => {
      setNode((prevNode) => {
        const newNode = [];
        for (let row = 0; row < 25; row++) {
          const currentRow = [];
          for (let col = 0; col < 30; col++) {
            currentRow.push(createNode(row, col));
          }
          newNode.push(currentRow);
        }
        return newNode;
      });
    };
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

  const animateALgorithm = (visitedNodesInOrder, nodesInShortestPath) => {
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
    setDistanceFromStart(nodesInShortestPath.slice([-1][0]).distance);
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
          document.getElementById(
            "node node-finish-visited"
          ).className = ` node-${node.row}-${node.col}`;
        }
      }, 50 * i);
    }
  };

  const vizualiseAlgorithm = () => {
    const startNode = node[START_NODE_ROW][START_NODE_COL];
    const finishNode = node[FINISH_NODE_ROW][FINISH_NODE_COL];
    var visitedNodesInOrder = [];
    if (selectedAlgorithm === "dijkstra") {
      visitedNodesInOrder = dijkstra(node, startNode, finishNode);
    }
    if (selectedAlgorithm === "BFS") {
      visitedNodesInOrder = bfs(node, startNode, finishNode);
    }
    if (selectedAlgorithm === "DFS") {
      visitedNodesInOrder = dfs(node, startNode, finishNode);
    }
    // if (selectedAlgorithm == "AStar") {
    //   var visitedNodesInOrder = aStar(node, startNode, finishNode);
    // }
    const nodesInShortestPath = getShortestPathNodesInOrder(finishNode);
    console.log(nodesInShortestPath);
    animateALgorithm(visitedNodesInOrder, nodesInShortestPath);
    if (finishNode.previousNode === null)
      alert("Could not find the shortest path.");
  };

  const reset = () => {
    // createInitialGrid();
    // const newNode = node.slice();
    // for (var i = 0; i < newNode.length; i++) {
    //   for (var j = 0; j < newNode[i].length; j++) {
    //     document.getElementById(`node-${i}-${j}`).className = "node";
    //     if (newNode[i][j].isStart) {
    //       document.getElementById(`node-${i}-${j}`).className =
    //         "node node-start";
    //     }
    //     if (newNode[i][j].isFinish) {
    //       document.getElementById(`node-${i}-${j}`).className =
    //         "node node-finish";
    //     }
    //   }
    //   setNode(newNode);
    // }
  };

  return (
    <>
      <div
        className="grid-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#262730",
        }}
      >
        <div className="pathfinding-visualiser">
          <SideBar
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            vizualiseAlgorithm={vizualiseAlgorithm}
            startCreateWalls={startCreateWalls}
            setStartCreateWalls={setStartCreateWalls}
            clearWalls={clearWalls}
            reset={reset}
            time={time}
            setTime={setTime}
            distanceFromStart={distanceFromStart}
          ></SideBar>
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
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
