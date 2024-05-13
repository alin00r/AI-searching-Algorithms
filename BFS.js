const readline = require('readline');

let graph = {
  S: ['A', 'B', 'D'],
  A: ['C'],
  B: ['D'],
  C: ['G', 'D'],
  D: ['G'],
};
//      S
//    / | \
//   A  B  D
//  |      |
//  C      G
//        |
//       D
function bfs(graph, start, goal) {
  let visited = [];
  let queue = [[start]];

  while (queue.length) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (visited.includes(node)) {
      continue;
    }

    visited.push(node);

    if (node === goal) {
      return path;
    } else {
      let adjacentNodes = graph[node] || [];

      for (let i = 0; i < adjacentNodes.length; i++) {
        let node2 = adjacentNodes[i];
        let newPath = path.slice();
        newPath.push(node2);
        queue.push(newPath);
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
    let solution = bfs(graph, startNode, goalNode);
    console.log('solution is', solution);
    rl.close();
  });
});
