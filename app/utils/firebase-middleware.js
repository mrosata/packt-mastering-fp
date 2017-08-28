import R from 'ramda'
import firebase from 'firebase/app'
import 'firebase/database'
import config from '../../firebase.config'
import Observable from 'zen-observable'

firebase.initializeApp(config)

const { curry, map, ifElse, is, has, compose, nthArg } = R


function getFirebaseObservable(ref, evtType) {
  const database = firebase.database()

  return new Observable(observer => {
    const listener = snapshot => {
      observer.next(snapshot.val())
    }
    try {
      // Start listening
      database.ref(ref)
        .on(evtType, listener)
    } 
    catch(e) {
      observer.error(e.message)
      observer.complete()
    }

    return () => {
      // cancel
      database.ref(ref).off(evtType, listener)
      observer.complete()
    }
  })
}

// Handle Firebase Actions
function handleFirebaseAction(store, reducer, listeners = {}) {
  return (state, action = {}) => {
    // Our custom middleware
    const {
      type = 'FIREBASE',
      firebase: {
        ref, method = 'value', cancel = false,
      }
    } = action

    const actionTypes = map(
      t => `${ type }_${ t }`, 
      ['START', 'NEXT', 'ERROR', 'COMPLETE']
    )
     
    // Our dynamic action types!
    const [startType, successType, errorType, endType] = actionTypes

    // Key for our observable listener
    // key :: Str
    const key = `${ ref }_${ method }_${ type }`

    // Check to make sure that this event isn't already setup
    if (is(Function, listeners[key]) && !cancel) {
      return state
    }

    try {
      if (cancel) {
        listeners[key].unsubscribe()
        delete listeners[key]
        return reducer(state, { type: endType, ref })
      }
    }
    catch ({ message: error }) {
      return reducer(state, { type: errorType, error })
    }

    // delay :: (Fn, Int) -> * Side-Effect
    const delay = (fn, n = 0) => setTimeout(fn, n)

    listeners[key] = getFirebaseObservable(ref, method)
      .subscribe({
        next(val) {
          delay(() => store.dispatch({ type: successType, value: val }))
        },
        error({ message: error }) {
          delay(() => store.dispatch({ type: errorType, error }))
        },
        complete() {
          delay(() => store.dispatch({ type: endType, ref })) 
        },
        start() {
          delay(() => store.dispatch({ type: startType, ref }))
        },
      })

    // Return the state after starting listening
    return reducer(state, { type: startType, ref })
  }
}

// Handle Regular Actions
function handleRegularAction(reducer) {
  return (state, action = {}) => reducer(state, action)
}

export default R.curry((createStore, reducer, initState = {}) => {

  const listeners = {}

  const store = createStore((state, action) => {
    return ifElse(
      // If it is a firebase action
      compose(has('firebase'), nthArg(1)),
      // handle here
      handleFirebaseAction(store, reducer, listeners),
      // otherwise use regular reducer
      handleRegularAction(reducer)
    )(state, action)
  }, initState)

  return store
})

