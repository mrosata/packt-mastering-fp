import './styles/main.scss'
import R from 'ramda'
import dom, { renderDOM } from 'utils/dom'
import compose from 'utils/compose'
import { createStore } from './data/redux-ish'
import Slideshow from './components/Slideshow'
import Controls from './components/Controls'
import mainReducer from './data/reducers'
import middleware from './utils/action-history-middleware'
import slides from './data/slides'

// initialState :: Object
const initialState = {
  title: '',
  presentation: {
    slides: [],
    slidePos: [0, 0],
  },
  settings: {},
}

const {
  getState, dispatch, subscribe
} = createStore(mainReducer, initialState, middleware)


const update = renderDOM((state) => {
  const {
    title,
    presentation: {
      slides, slidePos,
    },
    settings,
  } = state
  return (
    <div>
      <h1>{ title }</h1>
      <Slideshow slides={ slides } settings={ settings } />
      <Controls { ...state } dispatch={ dispatch } />
    </div>
  )
}, document.getElementById('packtPubApp'), getState())


subscribe(() => {
  update(getState(), dispatch)
})

dispatch({ type: 'CUSTOM_TITLE', value: 'Packt Presentation App' })
dispatch({ type: 'SETUP_SLIDES', value: slides })
