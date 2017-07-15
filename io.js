const R = require('ramda')
const chalk = require('chalk')
const readline = require('readline')
const { log } = console
const prompt = require('readline-sync')
const { compose, map, ap, chain, equals } = R

class IO {

  // of :: (IO f) => a -> f a
  static of (value) {
    return new IO(value)
  }

  constructor (value) {
    if (typeof value !== 'function') {
      throw new Error('IO Monad requires a function')
    }
    this.value = value
  }

  // fmap :: (IO f) => f a ~> (a -> b) -> f b
  fmap (atob) {
    return new IO(() => atob(this.run()))
  }
 
  // ap :: (IO f) => f a ~> f (a -> b) -> f b
  ap (aFn) {
    return new IO(() => aFn.run()(this.run()))
  }
  
  // chain :: (IO f) => f a ~> (a -> f b) -> f b
  chain(fn) {
    //return fn(this.run())
    return new IO(() => fn(this.run()).run())
  }

  run() {
    return this.value()
  }
}


function getUser() {
  return prompt.question('What is your username?')
}
function askForPassword(username) {
  return IO.of(() => {
    console.log(`Hey there ${ username }!`)
    const pass = prompt.question('Password please: ')
    return {username, pass}
  })
}
function checkPassword({username, pass}) {
  const isCorrect = pass === '12345'
  log(
    isCorrect ?
      `Welcome ${ username  }, to the machine!` :
      `Whoa ${ username }, come back correct!`
  )
  return isCorrect
}


IO.of(getUser)
  .chain(askForPassword)
  .ap(IO.of(() => checkPassword))
  .run()

