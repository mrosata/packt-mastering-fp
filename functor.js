const R = require('ramda')
const { log } = console


class Functor {
  
  // of :: (Functor f) => a -> f a
  static of (value) {
    return new Functor(value)
  }

  constructor (value) {
    this.value = value
  }

  fmap (fn) {
    return new Functor(fn(this.value))
  }

}

Functor.prototype['fantasy-land/map'] = Functor.prototype.fmap
Functor['fantasy-land/of'] = Functor.of

// gt0 :: Num -> Bool
const gt0 = n => n > 0


log(
  R.map(gt0, Functor.of(200))
)

