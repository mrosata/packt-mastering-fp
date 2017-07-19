const R = require('ramda')
const { log } = console
const { map, compose, equals } = R
const prompt = require('readline-sync')

class IO {
  
  // of :: (IO f) => a -> f a
  static of (value) {
    return new IO(value)
  }

  constructor (value) {
    if (typeof value !== 'function') {
      throw new Error('IO Monad required a function')
    }
    this.value = value
  }

  // fmap :: (IO f) => f a ~> (a -> b) -> f b
  fmap (fn) {
    return new IO(() => fn( this.run() ))
  }
  
  // ap :: (IO f) => f a ~> f (a -> b) -> f b
  ap (aFn) { 
    return IO.of(() => aFn.run()(this.run()) )
  }

  // chain :: (IO f) => f a ~> (a -> f b) -> f b
  chain (fnA) {
    // return IO.of(() => fn(this.run()).run())
    return fnA(this.value())
  }

  // run :: (IO f) => f a ~> () -> a
  run () {
    return this.value()
  }
}



function getUser() {
  return prompt.question('What is your username?')
}

function askForPassword(username) {
  return IO.of(() => {
    log(`Hey there ${ username }`)
    const pass = prompt.question('Password please: ')
    return { username, pass }
  })
}

function checkPassword({ username, pass }) {
  const isCorrect = pass === '12345'
  log(
    isCorrect ?
      `Welcome ${ username }, to the machine` :
      `Whoa ${ username }! Come back correct!`
  )
  return isCorrect
}


module.exports = IO

