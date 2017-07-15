const R = require('ramda')
const chalk = require('chalk')
const { log } = console

const { compose, map, ap, chain, equals } = R


class Maybe {
  static of(value) {
    return new Just(value)
  }
  static toMaybe(value) {
    return value == null ? new Nothing() : new Just(value)
  }
  constructor(value) {
    if (this.constructor === Maybe) {
      throw new Error('Maybe is not a constructor')
    }
    if (!this.isNothing) {
      this.value = value
    }
  }
}

class Just extends Maybe {
  get isJust() { return true }
  get isNothing() { return false }
  // fmap :: (Just f) => f a ~> (a -> b) -> f b
  fmap (fn) {
    return new Just(fn(this.value))
  }
 
  // ap :: (Just f) => f a ~> f (a -> b) -> f b
  ap (aFn) {
    return this.fmap(aFn.value)
  }
  
  // chain :: (Just f) => f a ~> (a -> f b) -> f b
  chain(fn) {
    return this.fmap(fn).value
  }
}


class Nothing extends Maybe {
  get isNothing() { return true }
  get isJust() { return false }
  // fmap :: (Nothing f) => f () ~> (a -> b) -> f ()
  fmap (fn) {
    return this
  }
 
  // ap :: (Nothing f) => f () ~> f (a -> b) -> f ()
  ap (aFn) {
    return this
  }
  
  // chain :: (Nothing f) => f () ~> (a -> f ()) -> f ()
  chain(fn) {
    return this
  }
}

const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)


const fa = new Just('Apply World')
// Identity
log(
  fa.ap(new Just(R.toUpper)).ap(new Just(R.concat('Hello, ')))
)

log(equals(
  Just.of(100).ap(Just.of(f))
  ,
  Just.of(f).ap(Just.of(f => f(100)))
))

const mf = n => Just.of(f(n))
const mg = n => Just.of(g(n))

log(equals(
  Just.of(100).chain(mf).chain(mg), Just.of(100).fmap(mf).value.fmap(mg).value
))

log(Just.of(100).chain(Just.of))

log(new Nothing().constructor.of(200))

log(
  Maybe.toMaybe(null)
)

const toMaybe = Maybe.toMaybe

log(
  toMaybe(100).ap(toMaybe(x => x + 100)),
  toMaybe(null).ap(toMaybe(x => x + 100))
)


log(
  R.ap(toMaybe(100), toMaybe(x => x + 20020))
)
