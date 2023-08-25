import { getNeighborNodes } from "./main";

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  function visit(currentNode) {
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return true;

    const neighborNodes = getNeighborNodes(currentNode, grid);

    for (const neighbor of neighborNodes) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode;

        if (visit(neighbor)) {
          return true;
        }
      }
    }

    return false;
  }

  visit(startNode);

  return visitedNodesInOrder;
}
