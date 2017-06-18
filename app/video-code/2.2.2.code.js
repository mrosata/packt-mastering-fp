const { log } = console
const { compose, map, append, prepend, concat, reduce, apply } = require('ramda')
const getInd = (list) => (n) => list[n]
const getProduct = getInd([
  'Walrus Slippers',
  'Bingo Mat',
  'Freedom Waffle',
  'Santas Email Password',
  'Special Boots with Environmental Jet Packs (but Jet-Packs none-the-less)'
])
const user = {
  name: 'JoeJi',
  cart: {
    items: [1, 1, 2, 4],
  },
  id: 'g-10324',
}

const getShoppingCart = function getCart(user) {
  return user.cart
}
const getItems = function getItems(cart) {
  return cart.items
}

// I :: a -> a
const I = (x) => x
const Identity = I

// tap :: Function -> a -> a
const tap = (f) => (x) => {
  f(x)
  return x
}

// labelLog :: Str -> Function
const labelLog = (label) => console.log.bind(console, label)
// trace :: a -> a
const trace = tap(console.log.bind(console))

// compose.clog :: ((a -> b), ... (y -> z)) -> (z -> a)
compose.clog = compose(
  apply(compose), // apply is compose.apply
  prepend(trace),
  reduce((acc, fn) => acc.concat(fn, trace), []),
  Array
)


// getCartItemNames :: User -> [Str]
const getCartItemNames = compose(map(getProduct), getItems,getShoppingCart)

// purchaseList :: [Str]
const purchaseList = getCartItemNames(user)


module.exports = compose
























