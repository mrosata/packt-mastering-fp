const R = require('ramda')
const compose = require('../utils/compose')
const getData = require('../data/users')


const I = (x) => x
const K = (x) => (y) => x
const C = (f) => (a) => (b) => f(b)(a)
const B = (f) => (g) => (x) => f(g(x))
const T = (x) => (f) => f(x)
const D = (f) => (x) => (g) => (y) => f(x)(g(y))
const S = f => g => x => f(x)(g(x))

// data :: [User]
const data = getData()

// greeting :: Str -> Str
const greeting = R.concat('Greetings, ')

// nameArr :: Obj -> [Str]
const nameArr =S(
  (B(R.prepend)(R.prop('first')))
)(B(Array)(R.prop('last')))

// userGreeting :: User -> Str
const userGreeting =
  compose(greeting, R.join(' '), nameArr, R.prop('name'))

// getUserById :: Str -> User
const getUserById =
  compose(R.head, T(data), R.filter, R.propEq('id'))

// main :: String -> String
const main = compose.log(userGreeting, getUserById)

main('59110bb415e9c57f9c3c5c32')

