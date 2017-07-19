import R from 'ramda'
import compose from 'utils/compose'
import { activeSlide, setupSlides } from 'utils/slide-utils'


// mainReducer :: (Object, Object) -> Object
function mainReducer (state, action = {}) {
  const { type, value } = action

  switch (type) {
    case 'MOVE_TO_SLIDE':
      const slidePos = value
      const slides = state.presentation.slides || []
      return R.mergeDeepRight(
        state, {
          presentation: {
            slidePos,
            slides: activeSlide(slidePos)(slides)
          }
        }
      )

    case 'SETUP_SLIDES':
      const presentation = { ...state.presentation, slides: setupSlides(value) }
      return { ...state, presentation }

    case 'CHANGE_SETTING':
      // takes pair ['settingName', val] and merges
      // object {settingName: val} into state.settings
      return R.mergeDeepRight(state, {
        settings: R.apply(R.objOf)(value)
      })

    case 'CUSTOM_TITLE':
      const title = value
      return { ...state, title } // same as Object.assign({}, state, { title })

    case 'DEPOSIT':
      return R.over(
        R.lensProp('money'), R.add(value), state
      )

    case 'WITHDRAW':
      const money = state.money - value
      return { ...state, money }

    default:
      // We don't know how to handle this action
      return state
  }
}

export default mainReducer
