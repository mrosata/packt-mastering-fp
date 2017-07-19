const I = (x) => x
const K = (x) => (y) => x
const C = (f) => (a) => (b) => f(b)(a)
const B = (f) => (g) => (x) => f(g(x))
const T = (x) => (f) => f(x)
const D = (f) => (x) => (g) => (y) => f(x)(g(y))
const S = (f) => (g) => (x) => f(x)(g(x))

module.exports = {
  I, K, C, B, T, D, S
}
