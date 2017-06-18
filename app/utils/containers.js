import R from 'ramda'

export class IOContainer {

  /**
   * Helper for creating a new Container. Will
   *turn values into functions for containerization.
   * ```
   *   // These are the same thing
   *   const a = Container.of(10)
   *   const b = Container.of(() => 10)
   * ```
   * @param fn
   * @return {IOContainer}
   */
  static of (fn) {
    return R.compose(
      R.construct(IOContainer),
      R.when(
        R.complement(R.is(Function)),
        R.always(() => fn)
      )
    )(fn)
  }

  /**
   * Create a container that holds a function
   * to execute on `perform`
   *
   * @param {function} fn
   *   Function returning value or promise
   * @return {IOContainer}
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
   * @return {IOContainer}
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

