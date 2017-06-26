import dom from 'utils/dom'
import R from 'ramda'
import { existsObjAt } from 'utils/slide-utils'
import SlideMap from './SlideMap'

const { o, assoc, flip, lensIndex, over, set, inc, dec } = R

// right :: [Int, Int] -> [Int, Int]
const right = o(
  set(lensIndex(1), 0), over(lensIndex(0), inc)
)

// left :: [Int, Int] -> [Int, Int]
const left = o(
  set(lensIndex(1), 0), over(lensIndex(0), dec)
)

// up :: [Int, Int] -> [Int, Int]
const up = over(lensIndex(1), dec) /// instead of [col, slide--]

// down :: [Int, Int] -> [Int, Int]
const down = over(lensIndex(1), inc) // instead of [col, slide++]

export default (props) => {
  const {
    presentation: {
      slides = [],
      slidePos = [0,0],
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

      <SlideMap slides={ slides } />

      {
        buttons.map(([nextSlidePos, dir], index) => (
          <button
            className='btn btn-lg btn-info btn-outline'
            onclick={ () => moveToSlide(nextSlidePos) }
            disabled={ R.not(existsObjAt(nextSlidePos)(slides)) }
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
    </aside>
  )
}
