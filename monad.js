const R = require('ramda')
const chalk = require('chalk')
const { log } = console

const { compose, map, ap, chain, equals } = R

class Functor {
  
  static of (value) {
    return new Functor(value)
  }

  constructor (value) {
    this.value = value
  }

  fmap (fn) {
    return new Functor(fn(this.value))
  }
 
  ap (aFn) {
    return this.fmap(aFn.value)
  }
  
  chain(fn) {
    return this.fmap(fn).value
  }
}


const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)


const fa = new Functor('Apply World')
// Identity
log(
  fa.ap(new Functor(R.toUpper)).ap(new Functor(R.concat('Hello, ')))
)

log(equals(
  Functor.of(100).ap(Functor.of(f))
  ,
  Functor.of(f).ap(Functor.of(f => f(100)))
))

const mf = n => Functor.of(f(n))
const mg = n => Functor.of(g(n))

log(equals(
  Functor.of(100).chain(mf).chain(mg), Functor.of(100).fmap(mf).value.fmap(mg).value
))

log(Functor.of(100).chain(Functor.of))
