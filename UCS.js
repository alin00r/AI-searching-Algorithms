function pathCost(path) {
  let totalCost = 0;
  for (const [node, cost] of path) {
    totalCost += cost;
  }
  return totalCost;
}

function ucs(graph, start, goal) {
  const visited = new Set();
  const queue = [[[start, 0]]];

  while (queue.length) {
    queue.sort((a, b) => pathCost(a) - pathCost(b));
    const path = queue.shift(); // left
    const node = path[path.length - 1][0]; //first node in rigth

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
    ['A', 2],
    ['B', 3],
    ['D', 5],
  ],
  A: [['C', 4]],
  B: [['D', 4]],
  C: [
    ['D', 1],
    ['G', 2],
  ],
  D: [['G', 5]],
};

const solution = ucs(graph, 'S', 'G');
console.log('Solution is', solution);
console.log('Cost of Solution is', pathCost(solution));
