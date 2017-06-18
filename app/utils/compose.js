const apply = require('ramda/src/apply')
const prepend = require('ramda/src/prepend')
const compose = require('ramda/src/compose')
const reduce = require('ramda/src/reduce')


// I :: a -> a
const I = (x) => x
const Identity = I
const S = (f) => (g) => (x) => f(x)(g(x))
const K = (x) => (y) => x
// tap :: Function -> a -> a
const tap = (f) => (x) => {
  f(x)
  return x
}

// trace :: a -> a
const trace = tap(console.log.bind(console))

// compose.clog :: ((a -> b), ... (y -> z)) -> (z -> a)
compose.log = compose(
  apply(compose), // apply is compose.apply
  prepend(trace),
  reduce((acc, fn) => acc.concat(fn, trace), []),
  Array
)

module.exports = compose
