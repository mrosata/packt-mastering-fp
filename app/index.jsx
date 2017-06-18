import R from 'ramda'
import dom, { renderDOM } from 'utils/dom'
import compose from 'utils/compose'
import { createStore } from './data/redux-ish'
import Slideshow from './components/Slideshow'
import mainReducer from './data/reducers'

// initialState :: Object
const initialState = { title: '', slides: [], money: 0 }


const middleware = R.curry((createStore, reducer, initState) => {

  const actionHistory = []
  const store = createStore((state, action) => {
    switch (action.type) {
      case '@@/JUMP':
        return R.reduce((accState, nextAction) => {
          console.log(nextAction.type, nextAction.value)
          return reducer(accState, nextAction)
        }, initState, action.value)

      default:

        return reducer(state, action)
    }
  }, initState)

  window.changeState = (i) => {
    actionHistory[i] && store.dispatch({ type: '@@/JUMP', value: R.slice(0, i, actionHistory) })
  }

  const middleDispatch = (action) => {
    store.dispatch(action)
    actionHistory.push(action)
    console.log(actionHistory)
  }

  return {
    getState: store.getState,

    dispatch: middleDispatch,

    subscribe: store.subscribe,
  }
})


const {
  getState, dispatch, subscribe
} = createStore(mainReducer, initialState, middleware)


const update = renderDOM((state) => {
  return (
    <div className='container'>
      <h1>{ state.title }</h1>
      <h5>MONEY: { state.money }</h5>
      <Slideshow  slides={ state.slides || [] } />
    </div>
  )
}, document.getElementById('packtPubApp'))


subscribe(() => {
  update(getState(), dispatch)
})

dispatch({ type: 'TEST_ACTION' })
dispatch({
  type: 'DEPOSIT',
  value: 60,
})
dispatch({
  type: 'WITHDRAW',
  value: 20,
})
dispatch({
  type: 'DEPOSIT',
  value: 200,
})
dispatch({
  type: 'DEPOSIT',
  value: 10,
})
