const R = require('ramda')
const chalk = require('chalk')
const readline = require('readline')
const { log } = console
const prompt = require('readline-sync')
const { compose, map, ap, chain, equals } = R

class IO {
  
  static of (value) {
    return new IO(value)
  }


  constructor (value) {
    if (typeof value !== "function") {
      throw new Error(
      'IO constructor expects a function, actual: ' + typeof value)
    }
    this.value = value
  }


  run() {
    return this.value()
  }
  

  fmap (fn) {
    return IO.of(() => fn(this.run()))
  }
 

  ap (aFn) {
    return this.fmap(aFn.value())
  }
  

  chain(fn) {
    return IO.of(() => fn(this.run())).run()
  }
}


const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)

const login = username => password => `Sign in ${ username }, ${ password }...`

function getUser() {
  return prompt.question('What is your username?')
}
function askForPassword(username) {
  return IO.of(() => {
    console.log(`Hey there ${ username }!`)
    return prompt.question('Password please: ')
  })
}


IO.of(getUser).chain(askForPassword).fmap(value => {
  console.log(typeof value, value)
}).run()

