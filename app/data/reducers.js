import R from 'ramda'
import compose from 'utils/compose'


// mainReducer :: (Object, Object) -> Object
function mainReducer (state, action = {}) {

  switch (action.type) {
    case 'TEST_ACTION':
      return R.merge(state, { title: 'Packt Pub Presentation App' })

    case 'CUSTOM_TITLE':
      const title = action.type
      return { ...state, title } // same as Object.assign({}, state, { title })

    case 'DEPOSIT':
      return R.over(
        R.lensProp('money'), R.add(action.value), state
      )

    case 'WITHDRAW':
      const money = state.money - action.value
      return { ...state, money }

    default:
      // We don't know how to handle this action
      return state
  }
}

export default mainReducer
