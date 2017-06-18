const R = require('ramda')
const compose = require('../utils/compose')


class IOContainer {

  /**
   * Helper for creating a new Container. Will
   *turn values into functions for containerization.
   * ```
   *   // These are the same thing
   *   const a = Container.of(10)
   *   const b = Container.of(() => 10)
   * ```
   * @param fn
   * @return {Container}
   */
  static of (fn) {
    return new IOContainer(
      R.when(
        R.complement(R.is(Function)),
        R.always(() => fn)
      )
    )
  }

  /**
   * Create a container that holds a function
   * to execute on `perform`
   *
   * @param {function} fn
   *   Function returning value or promise
   * @return {Container}
   */
  constructor(fn) {
    this.value = fn
    if (R.not(R.is(Function, fn))) {
      throw `IOContainer expects function, actual: ${ R.type(fn) }`
    }
  }

  /**
   * Apply a function over the output of containerized
   * function after `perform` is ran
   *
   * @param fn
   * @return {Container}
   */
  map(...fn) {
    const val = this.value()
    return new IOContainer(
      () => R.is(Promise, val) ? val.then(...fn) : fn[0](val)
    )
  }

  /**
   * Executes the containerized function, subsequently
   * calling any mapped functions with the result
   *
   * @param fn
   * @return {*|void} Side Effect
   */
  perform(fn) {
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

