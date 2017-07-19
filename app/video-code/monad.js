const R = require('ramda')
const { log } = console
const { map, compose, equals } = R

class Identity {
  
  // of :: (Identity f) => a -> f a
  static of (value) {
    return new Identity(value)
  }

  constructor (value) {
    this.value = value
  }

  // fmap :: (Identity f) => f a ~> (a -> b) -> f b
  fmap (fn) {
    return new Identity(fn(this.value))
  }
  
  // ap :: (Identity f) => f a ~> f (a -> b) -> f b
  ap (aFn) { 
    return this.fmap(aFn.value)
  }

  // chain :: (Identity f) => f a ~> (a -> f b) -> f b
  chain (fnA) {
    return fnA(this.value)
  }

}


const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)

const fa = new Identity('Apply World')
const mf = n => Identity.of(f(n))
const mg = n => Identity.of(g(n))

log(
  fa.ap(new Identity(R.toUpper))
)

log(equals(
  Identity.of(100).ap(Identity.of(f))
  ,
  Identity.of(f).ap(Identity.of(fn => fn(100)))
))

log(equals(
  Identity.of(100).fmap(mf).value.fmap(mg).value,
  Identity.of(100).chain(mf).chain(mg)
))

log(Identity.of(101).chain(Identity.of))

