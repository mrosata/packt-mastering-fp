const { log } = console
const R = require('ramda')

const tail = ([x, ...xs]) => xs
const head = ([x, ...xs]) => x

const map = (fn, list) => {
  if (list.length) {
    return [ fn(head(list)), ...map(fn, tail(list)) ]
  }
  return []
}



const kaplow = x => x + 1

log(
  map(kaplow, [3, 4, 5])
)







