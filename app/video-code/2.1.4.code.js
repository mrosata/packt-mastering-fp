// 2.4
const R = require('ramda')

function Num(a) {
  this.value = a;
}
Num.prototype.equals = function(b) {
  return this.value === b.value;
}
Num.prototype.map = function (fn) {
  return new Num(fn(this.value))
}
const num = R.construct(Num)


// addition :: Number -> Number -> Number
const addition = R.curry((x, y) => x + y);
addition.identity = 0;

// multiplication :: Number -> Number -> Number
const mult = R.curry((x, y) => x * y);
mult.identity = 1;

// division :: Number -> Number -> Number
const division = R.curry((n, d) => n / d);
division.rightIdentity = 1;


const { map, compose, equals } = R;
const data = [1, 4, 6, 12];

const output1 = data.map(addition(30)).map(mult(40)).map(addition(10));

const op1 = compose(map(addition(10)), map(mult(40)), map(addition(30)));

const op2 = compose(addition(10), mult(40), addition(30));

const output = map(op2, num(20));


//
//
// Log output
console.log(output)

