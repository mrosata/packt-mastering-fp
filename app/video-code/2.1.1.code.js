const { log } = console;

const R = require('ramda');
const { compose, concat } = R;

function HayStack(needle) {
  this.needle = R.toUpper(needle);
}

// haystack :: String -> HayStack
const haystack = R.construct(HayStack);
// getNeedle :: HayStack -> String
const getNeedle = R.prop('needle');
// concatTo :: String -> String
const concatTo = R.flip(concat);
// whatWeFound :: String -> String
const whatWeFound = compose(
  concat('Hay Hey, we found a '), concatTo(' in a haystack!'));
// needleFromHaystack :: HayStack -> String
const needleFromHaystack = compose(whatWeFound, getNeedle);
// tediousWork :: String -> String
const tediousWork = compose(needleFromHaystack, haystack);

// filter :: Filterable f => (a → Boolean) → f a → f aD


// map :: Functor f => (a -> b) -> f a -> f b
const map = R.map;

// map :: Functor f => (a → b) → f a → f b


