const R = require('ramda')
const compose = require('../utils/compose')
const { S, B, T, I, K, C } = require('../utils/combinators')

// or :: (a -> b,  a -> c) -> a -> b|c
const or = (f, g) => (x) => f(x) || g(x)


const slides = [
  {
    id: 1, title: 'Learn You Well',
    content: 'A slideshow in functional programming'
  },
  {
    id: 2, title: 'Combinators',
    content: `
      Pure functions with no free variables`
  },
  {
    id: 3, title: 'Combinators',
    content: `
      Pure functions with no free variables;
      All variables are passed in by parameters`
  },
]

// trace :: x -> x (with side effect)
const trace = S(K)(console.log)

// getSlide :: Int -> Slide
const getSlide = C(R.nth)(slides)

// displayTitle :: Slide -> String
const displayTitle = B(trace)(R.prop('title'))

// emptySlide :: * -> Slide
const emptySlide = K({ title: 'Empty', content: '' })

// decorateFirst :: Slide -> Slide
const decorateFirst = R.when(
  R.propEq('id', 1),
  R.over(
    R.lensProp('title'), R.concat('** FIRST SLIDE ** \n')
  )
)

// otherwise :: * -> Bool
const otherwise = R.T

const swizzle = R.cond([
  [x => x === 1, () => 'it was one'],
  [x => x === 2, () => 'it was two'],
  [otherwise, () => 'it was some other number']
])

// showSlide :: Int -> Slide
const showSlide = compose.log(
  swizzle,
  R.prop('id'),
  decorateFirst,
  R.either(getSlide, emptySlide)
)

showSlide(0)


