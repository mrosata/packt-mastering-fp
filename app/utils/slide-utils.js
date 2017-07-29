import R from 'ramda'

export const {
  groupWith, sortBy, prop, over, lensProp, compose,
  lensPath, o, set, pathSatisfies, omit, is, when,
  map, sort, ascend, all, propEq, complement, unnest,
} = R

// sortByOrder :: [{k:v}] -> [{k:v}]
const sortByOrder = sort(
  ascend(R.prop('order'))
)

// groupByProp :: Str -> [Obj] -> [[Obj]]
export const groupByProp = (key) => compose(
  groupWith(R.eqProps(key)),
  sortBy(R.prop(key))
)


const noneAreActive = o(all(complement(propEq('active', true))), unnest)

// setupSlides :: Obj -> [[Object]]
export const setupSlides = compose(
  when(noneAreActive, set(lensPath([0, 0, 'active']), true)),
  prop('slides'),
  o(
    over(lensProp('slides'), map(sortByOrder)),
    over(lensProp('slides'), groupByProp('id'))
  )
)

// wipeActiveStatus :: [[{k: v}]] -> [[{k: v}]]
export const wipeActiveStatus = map(map(omit(['active'])))

// existsObjAt :: [Int, Int] -> ([[{k:v}]] -> Bool)
export const existsObjAt = pathSatisfies(is(Object))

// setActiveAt :: [Int, Int] -> ([[{k: v}]] -> [[{k: v}]])
export const setActiveAt = pos2dPath => set(lensPath([...pos2dPath, 'active']), true)

// activeSlide :: [Int, Int] -> ([[{k: v}]] -> [[{k: v}]])
export const activeSlide = (pos2dPath) => o(
 when(
    existsObjAt(pos2dPath),
    setActiveAt(pos2dPath)
  ),
  wipeActiveStatus
)


