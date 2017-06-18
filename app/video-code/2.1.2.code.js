// 2.2
const { log } = console;

function composeN1(...fns) {
  return (x) => {
    let output = x;
    let l = R.length(fns);
    while (l--) {
      output = fns[l](output);
    }
    return output;
  }
}

function composeN(...fns) {
  return (x) => {
    return R.reduce((output, fn) => {
      return fn(output);
    }, x, R.reverse(fns));
  }
}

function compose(...fns) {
  return (x) => {
    return R.reduceRight((fn, output) => fn(output), x, fns);
  }
}


const n = 99.9999;
const fixedTwo = compose(
  n => n / 100,
  parseInt,
  R.multiply(100)
);

log(fixedTwo(n));


