const readline = require('readline');

let graph = {
  S: ['A', 'B', 'D'],
  A: ['C'],
  B: ['D'],
  C: ['G', 'D'],
  D: ['G'],
};

function dfs(graph, start, goal) {
  let visited = new Set();
  let stack = [[start]];

  while (stack.length) {
    let path = stack.pop();
    let node = path[path.length - 1];

    if (visited.has(node)) {
      continue;
    }

    visited.add(node);

    if (node === goal) {
      return path;
    } else {
      let adjacentNodes = graph[node] || [];

      for (let i = adjacentNodes.length - 1; i >= 0; i--) {
        let node2 = adjacentNodes[i];
        let newPath = path.slice();
        newPath.push(node2);
        stack.push(newPath);
      }
    }
  }

  return null; // if no path found
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter start node: ', (startNode) => {
  rl.question('Enter goal node: ', (goalNode) => {
    let solution = dfs(graph, startNode, goalNode);
    console.log('Solution is', solution);
    rl.close();
  });
});
