const R = require('ramda')
const { log } = console

const { compose, map, ap, chain, equals } = R


class Either {
 
  // of :: a -> Either a b
  static of(value) {
    return new Right(value)
  }
  
  // toEither :: a -> Either a b
  static toEither(value) {
    return value == null ? Left.of(value) : Right.of(value)
  }

  // encase :: (a, () -> b) -> Either a b
  static encase(leftValue, rightFn) {
    try {
      return new Right(rightFn())
    }
    catch(e) {
      return new Left(leftValue)
    }
  }
  
  constructor(value) {
    this.value = value
    if (this.constructor === Either) {
      throw new Error('Either is not a constructor')
    }
  }

  // bimap :: (Either e) => e a b ~> (a -> c, b -> d) -> e c d
  bimap(lFn, rFn) {
    return this.isRight ? Right.of(rFn) : Left.of(lFn(this.value))
  }

  // alt :: (Either e) => e a b ~> (e a b) -> e a b
  alt (alternative) {
    if (Either.isEither(alternative)) {
      return this.isRight ? this : alternative
    }
    throw new Error('Either#alt expects an Either as its argument')
  }
}



class Right extends Either {
  get isRight() { return true }
  get isLeft() { return false }
  // fmap :: (Either e) => e a b ~> (b -> c) -> e a c
  fmap (fn) {
    return Right.of(fn(this.value))
  }
  
  // ap :: (Either e) => e a b ~> e a (b -> c) -> e a c
  ap (aFn) {
    return aFn.chain(f => this.fmap(f))
  }
  
  // chain :: (Either e) => e a b ~> (b -> e a c) -> e a c
  chain(fn) {
    return this.fmap(fn).value
  }
  
}


class Left extends Either {
  get isLeft() { return true }
  get isRight() { return false }
 
  // of :: a -> Either a b
  static of (value) {
    return new Left(value)
  }

  // fmap :: (Either e) => e a b ~> (b -> c) -> e a c
  fmap (fn) {
    return this
  }
  
  // ap :: (Either e) => e a b ~> e a (b -> c) -> e a c
  ap (aFn) {
    return this
  }
  
  // chain :: (Either e) => e a b ~> (b -> e a c) -> e a c
  chain(fn) {
    return this
  }
}



const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)


const fa = new Right('Apply World')
// Identity
log(
  fa.ap(new Right(R.toUpper)).ap(new Right(R.concat('Hello, ')))
)

log(equals(
  Right.of(100).ap(Right.of(f))
  ,
  Right.of(f).ap(Right.of(f => f(100)))
))

const mf = n => Right.of(f(n))
const mg = n => Right.of(g(n))

log(equals(
  Right.of(100).chain(mf).chain(mg), Right.of(100).fmap(mf).value.fmap(mg).value
))

log(Right.of(100).chain(Right.of))

log(new Left().constructor.of(200))

log(
  Either.toEither(null)
)

const toEither = Either.toEither

log(
  toEither(100).ap(toEither(x => x + 100)),
  toEither(null).ap(toEither(x => x + 100))
)

log(
  Right.of(100).chain(x => Right.of(x * 100)),
  Right.of(100).chain(x => Left.of('God Save the Queen'))
)

log(
  Either.encase('Good Jason... but we need JSON!', () => JSON.parse('{ a: 100 }')),
  Either.encase('Good Jason... but we need JSON!', () => JSON.parse('{ "a": 100 }'))
)
