import dom from 'utils/dom'
import R from 'ramda'


export default ({ slides }) => {
  return (
    <div>
      <items className='slide-map'>
        {
          slides.map((column, i) =>
            <span className='column' >
              {
                column.map(
                  (slide, j) => <span className={ `slide-item ${ slide.active ? 'active' : '' }` } />
                )
              }
            </span>
          )
        }
      </items>

      <div className='clearfix'></div>

    </div>
  )
}
