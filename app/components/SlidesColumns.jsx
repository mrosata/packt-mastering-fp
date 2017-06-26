import dom, { fromHTML } from 'utils/dom'
import R from 'ramda'
import { K } from 'utils/combinators'

// slideClass :: Slide -> String
const slideClass = (slide) => `slide ${ !slide.active ? '' : 'active' }`

// columnClass :: Bool -> Str
const columnClass = R.ifElse(
  R.equals(true),
  K('fullscreen presentation'),
  K('presentation')
)

// Img :: Obj -> VNode
const Img = ({ src, alt = ''}) => <img src={ src } alt={ alt } />


// Slide :: [Slide] -> VNode
const Slide = (slide) => (
  <div style={ slide.style } className={ slideClass(slide) }>
    <div className='header'>
      <div className='header title'>
        <h1 className='display-4'>
          <strong className='lead'>
          </strong> { slide.title || '' }
        </h1>
      </div>
    </div>
    <div className='body'>
      { slide.html ? fromHTML(slide.html) : null }
    </div>
    <div className='img img-responsive'>
      { slide.img ? Img(slide.img) : null }
    </div>
    <footer className='footer'>
      { slide.text ? <blockquote>{ slide.text }</blockquote> : null }
    </footer>
  </div>
)


// Column :: [Slide] -> VNode
export const Column = ({ slides, fullscreen = false }) => (
  <div
    className={ columnClass(fullscreen) }>
    { R.map(Slide, slides) }
  </div>
)
