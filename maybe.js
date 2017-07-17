const R = require('ramda')
const { log } = console
const { map, compose, equals } = R


class Maybe {
  
  // of :: (Maybe m) => a -> m a
  static of (value) {
    return new Just(value)
  }
  
  // toMaybe :: (Maybe m) => a -> m a
  static toMaybe (value) {
    return value == null ? new Nothing() : new Just(value)
  }

  constructor (value) {
    if (this.constructor === Maybe) {
      throw new Error('Maybe should not be used as constructor.')
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
  
  // ap :: (Maybe m) => m a ~> f (a -> b) -> m b
  ap (aFn) { 
    //return this.fmap(aFn.value)
    return aFn.chain(fn => Just.of(fn(this.value)))
  }

  // chain :: (Maybe m) => m a ~> (a -> m b) -> m b
  chain (fnA) {
    return fnA(this.value)
  }

}


class Nothing extends Maybe  {
  
  get isJust() { return false }
  get isNothing() { return true }

  // fmap :: (Maybe m) => m a ~> (a -> b) -> m b
  fmap (_) {
    return this
  }
  
  // ap :: (Maybe m) => m a ~> f (a -> b) -> m b
  ap (_) { 
    return this
  }

  // chain :: (Maybe m) => m a ~> (a -> m b) -> m b
  chain (_) {
    return this 
  }

}



const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)

const fa = new Just('Apply World')
const mf = n => Just.of(f(n))
const mg = n => Just.of(g(n))

const toMaybe = Maybe.toMaybe

log(
  fa.ap(new Just(R.toUpper))
)

log(equals(
  Just.of(100).ap(Just.of(f))
  ,
  Just.of(f).ap(Just.of(fn => fn(100)))
))

log(equals(
  Just.of(100).fmap(mf).value.fmap(mg).value,
  Just.of(100).chain(mf).chain(mg)
))

log(Just.of(101).chain(Just.of))

log(
  toMaybe(100).ap(toMaybe(x => x + 100)),
  Nothing.of().ap(toMaybe(x => x + 100))
)

log(
  Just.of(':)').ap(toMaybe(null))
)

