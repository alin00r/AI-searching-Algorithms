const math = require('mathjs');

function funMinMax(cd, node, maxt, scr, td) {
  if (cd === td) {
    return scr[node];
  }
  if (maxt) {
    return Math.max(
      funMinMax(cd + 1, node * 2, false, scr, td),
      funMinMax(cd + 1, node * 2 + 1, false, scr, td)
    );
  } else {
    return Math.min(
      funMinMax(cd + 1, node * 2, true, scr, td),
      funMinMax(cd + 1, node * 2 + 1, true, scr, td)
    );
  }
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let scr = [];
let x;
rl.question('Enter total number of leaf nodes: ', (input) => {
  x = parseInt(input);
  getLeafValues(x);
});

function getLeafValues(count) {
  rl.question('Enter leaf value: ', (input) => {
    scr.push(parseInt(input));
    count--;
    if (count === 0) {
      calculateMinMax();
    } else {
      getLeafValues(count);
    }
  });
}

function calculateMinMax() {
  const td = math.log(scr.length, 2);
  rl.question('Enter current depth value: ', (input) => {
    const cd = parseInt(input);
    rl.question('Enter node value: ', (input) => {
      const nodeV = parseInt(input);
      const maxt = true;
      const result = funMinMax(cd, nodeV, maxt, scr, td);
      console.log('Result is:', result);
      rl.close();
    });
  });
}
