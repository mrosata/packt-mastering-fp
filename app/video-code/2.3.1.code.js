const R = require('ramda')
const compose = require('../utils/compose')
const { S, B, T, I, K, C } = require('../utils/combinators')


// insertHTML :: Str -> Str -> Undefined
const insertHTML = R.curry((selector, html) => {
  const elem = document.querySelector(selector)
  if (elem) {
    elem.innerHTML = html
  }
})

insertHTML('#packtPubApp', '<h1 class="message"></h1>')

insertHTML('.message', 'hello world!')

insertHTML('#packtPubApp', '<svg id="mySVG"><circle r="100" fill="black" /></svg>')

insertHTML('.message', 'hello world!')


class IOContainer {
  constructor(fn) {
    this.value = fn
    if (R.not(R.is(Function, fn))) {
      throw `IOContainer expects function, actual: ${ R.type(fn) }`
    }
  }

  perform(fn) {
    const val = this.value()

    if (R.is(Function, fn)) {
      return fn(val)
    }
  }

}


function iAmPure (selector, html) {
  return new IOContainer(function() {
    const elem = document.querySelector(selector)
    if (elem) {
      elem.innerHTML = html
    }
  })
}

const io = iAmPure('#packtPubApp', '<h1>Safe and sound inside my container</h1>')

io.perform()

const io2 = new IOContainer(function() {
  return document.querySelector('h1').innerHTML
})

io2.perform(console.log)












