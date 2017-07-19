const R = require('ramda')
const { log } = console

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

}

Functor['fantasy-land/of'] = Functor.of
Functor['fantasy-land/map'] = Functor.prototype.fmap

const { map, compose, equals } = R

const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)

const fa = Functor.of(90)
// Identity
log(equals(fa.fmap(id), Functor.of(id(90))))
log(equals(fa.fmap(id), fa))
// Composition
log(fa.fmap(f).fmap(g))
log(fa.fmap(fg))
log(map(compose(g, f), fa))

