import dom from 'utils/dom'
import R from 'ramda'
import { existsObjAt } from 'utils/slide-utils'
import SlideMap from './SlideMap'
import { toMaybe, isNothing } from 'utils/maybe'
import RemoteSlidesBtn from './RemoteSlidesBtn'


const { o, zipWith, add, assoc, flip, lensIndex, over, set, inc, dec } = R

// vAdd :: [Int, Int] -> [Int, Int]
const vAdd = zipWith(add)

// right :: [Int, Int] -> [Int, Int]
const right = vAdd([1, 0])

// left :: [Int, Int] -> [Int, Int]
const left = vAdd([-1, 0]) 

// up :: [Int, Int] -> [Int, Int]
const up = vAdd([0, -1])

// down :: [Int, Int] -> [Int, Int]
const down = vAdd([0, 1])

// slideAtPosM :: ([Int, Int], Slides) -> Maybe Slide
const slideAtPosM = R.compose(toMaybe, R.path)

export default (props) => {
  const {
    presentation: {
      slides = [],
      slidePos = [0,0],
      loading = false,
      error,
    },
    settings = {},
    dispatch,
  } = props

  // moveToSlide :: [Int, Int] -> void
  const moveToSlide = o(
    dispatch,
    flip(assoc('value'))({ type: 'MOVE_TO_SLIDE' })
  )

  // slidesLoaded :: Bool
  const slidesLoaded = !!(slides && slides.length)

  // changeSetting :: (String, Bool) -> void
  const changeSetting = (setting, value) => {
    dispatch({ type: 'CHANGE_SETTING', value: [setting, value] })
  }

  const buttons  = [
    [left(slidePos), 'left'],
    [right(slidePos), 'right'],
    [up(slidePos), 'up'],
    [down(slidePos), 'down'],
  ]

  return (
    <aside className='slide-controls'>
      { error && <strong className='lead text-danger'>{ error }</strong> }
      <SlideMap slides={ slides } />

      {
        buttons.map(([nextSlidePos, dir], index) => (
          <button
            className='btn btn-lg btn-info btn-outline'
            onclick={ () => moveToSlide(nextSlidePos) }
            disabled={ isNothing(slideAtPosM(nextSlidePos, slides)) }
          >
            <i className={ `fa fa-arrow-${ dir }` }></i>
            <span className="hidden">{ dir }</span>
          </button>
        ))
      }


      <button
        className='btn btn-lg btn-info btn-outline'
        onclick={ () => changeSetting(
          'fullscreen', !R.prop('fullscreen', settings)
        ) }
      >
        <i className={ `fa fa-${      // 'fa-compress' : 'fa-expand'
          R.prop('fullscreen', settings) ? 'compress' : 'expand'}`
        }></i>
        <span className="hidden">Up</span>
      </button>


      &nbsp; - &nbsp;


      {  !slidesLoaded ? null : (
        <button
          onclick={ () => moveToSlide([0, 0]) }
          className='btn btn-md btn-danger'
        >
          <i className="fa fa-refresh"></i>
          <span className="hidden">Restart</span>
        </button>)
      }

       <button
          onclick={ () => dispatch({ type: 'SETUP_FB_SLIDES', firebase: { ref: 'slides', method: 'value' } }) }
          className='btn btn-md btn-success'
          type='button'
        >
          <i className="fa fa-database"></i>
          <span className="hidden">Firebase</span>
      </button>
        
      <RemoteSlidesBtn
        className='btn btn-md btn-success'
        dispatch={ dispatch }
        disabled={ loading }
        prefetch={ { type: 'SETUP_FB_SLIDES', firebase: { ref: 'slides', method: 'value', cancel: true } } }
      >
        <i className='fa fa-feed' />  
      </RemoteSlidesBtn>
    </aside>
  )
}
