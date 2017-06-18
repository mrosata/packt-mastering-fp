import R from 'ramda'

export const {
  groupBy, groupWith, sortBy, eqProps, o, map, prop, over, set, lensPath, lensProp, omit, when, pathSatisfies, is
} = R


// groupByProp :: Str -> [Obj] -> [[Obj]]
export const groupByProp = (key) => o(
  groupWith(eqProps(key)),
  sortBy(prop(key))
)

// setupSlides :: Obj -> [[Object]]
export const setupSlides = o(
  set(lensPath([0, 0, 'active']), true),
  o(
    prop('slides'),
    over(lensProp('slides'), groupByProp('id'))
  )
)


// existsObjAt :: [Int] -> Bool
export const existsObjAt = pos2dPath => pathSatisfies(is(Object), pos2dPath)

// wipeActiveStatus :: [[{k: v}]] -> [[{k: v}]]
export const wipeActiveStatus = map(map(omit(['active'])))

// setActiveAt :: [Int] -> [[{k: v}]] -> [[{k: v}]]
export const setActiveAt = pos2dPath => set(lensPath([...pos2dPath, 'active']), true)

// activeSlide :: [[{k: v}]] -> [[{k: v}]]
export const activeSlide = (pos2dPath) => o(
  when(
    existsObjAt(pos2dPath),
    setActiveAt(pos2dPath)
  ),
  wipeActiveStatus
)
