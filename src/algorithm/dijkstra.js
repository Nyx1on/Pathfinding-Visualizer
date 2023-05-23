export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes);

    const currentNode = unvisitedNodes.shift();
    console.log(currentNode)

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

const getNeighborNodes = (currentNode, grid) => {
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
  return neighborNodes.filter(
    (neighborNodes) => neighborNodes.isVisited !== true
  );
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => {
    return nodeA.distance - nodeB.distance;
  });
};

const getAllNodes = (grid) => {
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
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
