const H_table = {
  S: 7,
  A: 6,
  B: 4,
  C: 2,
  G: 0,
};

function pathFCost(path) {
  let gCost = 0;
  for (const [node, cost] of path) {
    gCost += cost;
  }
  const lastNode = path[path.length - 1][0];
  const hCost = H_table[lastNode];
  return hCost;
}

function aStar(graph, start, goal) {
  const visited = new Set();
  const queue = [[[start, 0]]];

  while (queue.length) {
    queue.sort((a, b) => pathFCost(a) - pathFCost(b));
    const path = queue.shift();
    const node = path[path.length - 1][0];

    if (visited.has(node)) {
      continue;
    }
    visited.add(node);

    if (node === goal) {
      return path;
    } else {
      const adjacentNodes = graph[node] || [];

      for (const [node2, cost] of adjacentNodes) {
        const newPath = [...path, [node2, cost]];
        queue.push(newPath);
      }
    }
  }

  return null; // if no path found
}

const graph = {
  S: [
    ['A', 1],
    ['B', 4],
  ],
  A: [
    ['B', 2],
    ['C', 5],
    ['G', 12],
  ],
  B: [['C', 2]],
  C: [['G', 3]],
};

const solution = aStar(graph, 'S', 'G');
console.log('Solution is', solution);
console.log('Cost of Solution is', pathFCost(solution));
