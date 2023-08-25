export const getAllNodes = (grid) => {
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
};

export const getNeighborNodes = (currentNode, grid) => {
  const { row, col } = currentNode;
  const neighborNodes = [];
  if (row > 0 && row < grid.length - 1) {
    neighborNodes.push(grid[row - 1][col]);
    neighborNodes.push(grid[row + 1][col]);
  }
  if (col > 0 && col < grid[0].length - 1) {
    neighborNodes.push(grid[row][col - 1]);
    neighborNodes.push(grid[row][col + 1]);
  }
  if (row == 0) {
    neighborNodes.push(grid[row + 1][col]);
  }
  if (col == 0) {
    neighborNodes.push(grid[row][col + 1]);
  }
  if (row == grid.length - 1) {
    neighborNodes.push(grid[row - 1][col]);
  }
  if (col == grid[0].length - 1) {
    neighborNodes.push(grid[row][col - 1]);
  }
  return neighborNodes.filter(
    (neighborNodes) => neighborNodes.isVisited !== true
  );
};

export const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => {
    return nodeA.distance - nodeB.distance;
  });
};

export function getShortestPathNodesInOrder(finishNode) {
  const nodesInShortestPath = [];
  let currentNode = finishNode;
  while (currentNode.previousNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPath;
}
