import R from 'ramda'
import dom from 'utils/dom'
import SlideMap from './SlideMap'
import { existsObjAt } from 'utils/slide-utils'
const { o } = R

const up = R.over(R.lensIndex(1), R.dec)
const down = R.over(R.lensIndex(1), R.inc)

const left = o(
  R.set(R.lensIndex(1), 0),
  R.over(R.lensIndex(0), R.dec)
)
const right = o(
  R.set(R.lensIndex(1), 0),
  R.over(R.lensIndex(0), R.inc)
)


export default (props) => {
  const {
    slides = [],
    slidePos = [0,0],
    settings = {},
    dispatch
  } = props

  const moveToSlide = o(
    dispatch,
    R.flip(R.assoc('value'))({ type: 'MOVE_TO_SLIDE' })
  )

  const changeSetting = (setting, value) => {
    dispatch({ type: 'CHANGE_SETTING', value: [setting, value] })
  }
  const slidesLoaded = !!(slides && slides.length)

  const buttons  = [
    [left(slidePos), 'left'],
    [right(slidePos), 'right'],
    [' - '],
    [up(slidePos), 'up'],
    [down(slidePos), 'down'],
  ]

  return (
    <aside className='slide-controls'>

      <SlideMap slides={ slides } />

      {
        buttons.map(([btnFn, dir], index) => R.is(String, btnFn) ? <span>{ btnFn }</span> : (
          <button
            className='btn btn-lg btn-info btn-outline'
            onclick={ () => moveToSlide(btnFn) }
            disabled={ R.not(existsObjAt(btnFn)(slides)) }
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
        <i className={ `fa fa-${
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
