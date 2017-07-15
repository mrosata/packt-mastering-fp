const R = require('ramda')
const chalk = require('chalk')
const { log } = console

const { compose, map, ap, chain, equals } = R

class Monad {

  // of :: (Monad f) => a -> f a
  static of (value) {
    return new Monad(value)
  }

  constructor (value) {
    this.value = value
  }

  // fmap :: (Monad f) => f a ~> (a -> b) -> f b
  fmap (fn) {
    return new Monad(fn(this.value))
  }
 
  // ap :: (Monad f) => f a ~> f (a -> b) -> f b
  ap (aFn) {
    return this.fmap(aFn.value)
  }
  
  // chain :: (Monad f) => f a ~> (a -> f b) -> f b
  chain(fn) {
    return this.fmap(fn).value
  }
}


const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)


const fa = new Monad('Apply World')

// Identity
log(
  fa.ap(new Monad(R.toUpper)).ap(new Monad(R.concat('Hello, ')))
)

log(equals(
  Monad.of(100).ap(Monad.of(f))
  ,
  Monad.of(f).ap(Monad.of(f => f(100)))
))

const mf = n => Monad.of(f(n))
const mg = n => Monad.of(g(n))

log(equals(
  Monad.of(100).chain(mf).chain(mg), Monad.of(100).fmap(mf).value.fmap(mg).value
))

log(Monad.of(100).chain(Monad.of))
