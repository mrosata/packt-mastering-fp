const R = require('ramda')
const chalk = require('chalk')
const { log } = console

const { compose, map, ap, chain, equals } = R


class Maybe {

  // of :: (Maybe a) => a -> m a
  static of(value) {
    return new Just(value)
  }
  
  // toMaybe :: (Maybe m) => a -> m a
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
  // fmap :: (Maybe m) => m a ~> (a -> b) -> m b
  fmap (fn) {
    return new Just(fn(this.value))
  }
 
  // ap :: (Maybe m) => m a ~> m (a -> b) -> m b
  ap (aFn) {
    return this.fmap(aFn.value)
  }
  
  // chain :: (Maybe m) => m a ~> (a -> m b) -> m b
  chain(fn) {
    return this.fmap(fn).value
  }
}


class Nothing extends Maybe {
  get isNothing() { return true }
  get isJust() { return false }
  // fmap :: (Maybe m) => m a ~> (a -> b) -> m a
  fmap (fn) {
    return this
  }
 
  // ap :: (Maybe m) => m a ~> m (a -> b) -> m b
  ap (aFn) {
    return this
  }
  
  // chain :: (Maybe m) => m a ~> (a -> m a) -> m a
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

