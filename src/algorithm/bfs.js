import { getNeighborNodes } from "./main";

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [];

  startNode.distance = 0;
  queue.push(startNode);

  while (queue.length !== 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighborNodes = getNeighborNodes(currentNode, grid);

    for (const neighbor of neighborNodes) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
