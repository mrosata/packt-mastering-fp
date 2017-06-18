import R from 'ramda'

export default R.curry((createStore, reducer, initState) => {

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
