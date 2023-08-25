import { getAllNodes, getNeighborNodes, sortNodesByDistance } from "./main";

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes);

    const currentNode = unvisitedNodes.shift();
    // console.log(currentNode);

    if (currentNode.isWall) continue;

    if (currentNode.distance === Infinity) return visitedNodesInOrder;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;
    relaxationOfUnvisitedNodes(currentNode, grid);
  }
}

const relaxationOfUnvisitedNodes = (currentNode, grid) => {
  const unvisitedNeighborNodes = getNeighborNodes(currentNode, grid);
  for (let i = 0; i < unvisitedNeighborNodes.length; i++) {
    unvisitedNeighborNodes[i].distance = currentNode.distance + 1;
    unvisitedNeighborNodes[i].previousNode = currentNode;
  }
};
