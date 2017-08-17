import R from 'ramda'
import compose from 'utils/compose'
import { activeSlide, setupSlides } from 'utils/slide-utils'

const { mergeDeepRight, apply } = R
// mainReducer :: (Object, Object) -> Object
function mainReducer (state, action = {}) {
  const { type, value, error } = action

  switch (type) {
    case 'MOVE_TO_SLIDE':
      const slidePos = value
      const slides = activeSlide(slidePos)(
        state.presentation.slides || []
      )
      
      localStorage.setItem(
        'slides', JSON.stringify({ title: state.title, slides: R.unnest(slides), slidePos })
      )
      return R.mergeDeepRight(
        state, {
          presentation: {
            slidePos,
            slides,
          }
        }
      )

    case 'SETUP_SLIDES':
      const presentation = { ...state.presentation, slides: setupSlides(value), slidePos: value.slidePos }
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
    
    case 'REMOTE_SLIDES_START':
      return mergeDeepRight(
        state,
        { presentation: { error: null, loading: true } }
      )
    
    case 'REMOTE_SLIDES_ERROR':
      return mergeDeepRight(
        state,
        { presentation: { error, loading: true } }
      )

    case 'REMOTE_SLIDES_SUCCESS':
      return mergeDeepRight(
        state,
        { presentation: { slides: value, slidePos: [0, 0], loading: false } }
      )

    default:
      // We don't know how to handle this action
      return state
  }
}

export default mainReducer
