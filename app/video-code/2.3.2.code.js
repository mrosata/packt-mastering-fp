const R = require('ramda')
const compose = require('../utils/compose')


class IOContainer {

  constructor(fn) {
    this.value = fn
    if (R.not(R.is(Function, fn))) {
      throw `IOContainer expects function, actual: ${ R.type(fn) }`
    }
  }

  // map :: (IOContainer io) => io (a -> b) ~> (b -> c) -> io (b -> c)
  map(...fns) {
    const val = this.value()

    return new IOContainer(
      () => R.is(Promise, val) ?
        val.then(...fns) : fns[0](val)
    )
  }

  perform() {
    this.value()
  }

}


const lazy = new IOContainer(function() {
  return new Promise((resolver, rejector) => {
    setTimeout(rejector, 1000, 'Hello from Prom!')
  })
})

const work = lazy
  .map(R.tap(console.log), R.tap(console.log('ERROROROROR!!!! ')))
  .map(R.concat(R.__, ' World'))
  .map(R.tap(console.log))

const friend = lazy
  .map(R.concat(R.__, ' friends'))
  .map(R.tap(console.log))

const family = lazy
  .map(R.concat(R.__, ' family'))
  .map(R.tap(console.log))

const lovers = lazy
  .map(R.concat(R.__, ' lovers'))
  .map(R.tap(console.log))

friend.perform()
family.perform()
lovers.perform()


debugger

