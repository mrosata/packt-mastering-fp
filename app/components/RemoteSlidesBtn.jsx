import R from 'ramda'
import dom from 'utils/dom'
import Future, { tryP, of, reject } from 'fluture'
import { setupSlides } from 'utils/slide-utils'
import { encaseEither } from 'utils/either'


// fromEither :: Either a b -> Future a b
const fromEither = e => e.isLeft ? reject(e.value) : of(e.value)

function fetchSlides() {
  const url = 'http://beta.json-generator.com/api/json/get/VJihcRLIQ'
  return tryP(async function() {
    const res = await fetch(url)
    return res.json()
  })
}

function loadRemoteSlides(dispatch) {
  return () => {
    dispatch({ type: 'REMOTE_SLIDES_START' })
    fetchSlides()
      .map(slides => ({ slides }))
      .map(encaseEither('Could not parse slides', setupSlides))
      .chain(fromEither)
      .fork(
        error => dispatch({ type: 'REMOTE_SLIDES_ERROR', error }),
        value => dispatch({ type: 'REMOTE_SLIDES_SUCCESS', value })
      )
  }
}

export default ({ dispatch, className, loading }, children) => {

  return (
    <button
      className={ className }
      onclick={ loadRemoteSlides(dispatch) }
      disabled={ loading }
    >
      { children }
    </button>
  )
}


