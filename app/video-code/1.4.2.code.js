"use strict";
import {
  set, map, when, is, curry, mapObjIndexed, lens, assoc, prop, view, lensPath, lensProp, lensIndex
} from 'ramda';

const {assert} = console;

// The same object from last example.
const state = pokerTable();



logOut(state, 'initial object');


const getter = prop;
const setter = assoc;


const thirdElem = lensIndex(2);


const arr = ['hi', 'there', 'good', 'friend'];

console.log(
  view(thirdElem, arr)
);

const newArr = set(thirdElem, 'old', arr);


console.log(newArr.join(' '));















function lenses(...props) {
  return map(propName => {
    return lens(prop(propName), assoc(propName));
  }, props);
}



















/**
 * Deep freeze an object
 *
 * @param obj
 * @returns {Object}
 */
function freezer(obj) {
  map(
    when(is(Object), freezer)
  )(obj);
  return Object.freeze(obj);
}







/**
 * The initial pokerTable object
 *
 * @returns {{}}
 */
function pokerTable() {
  return {
    players: [
      {folded: false, chips: 205, name: 'Thomas', cards: []},
      {folded: false, chips: 110, name: 'Graham', cards: []},
      {folded: false, chips: 450, name: 'Wendy', cards: []}
    ],

    phase: 0,  // 'pre-flop'

    ante: 10,

    community: [
      [10, '♠'], [5, '♥'], [12, '♥']
    ],

    chipValues: {
      white: 1, blue: 5, green: 10, yellow: 25, red: 50, black: 100
    }
  };
}









/**
 * Log a poker table
 * @param state
 * @param label
 */
function logOut(state, label) {
  console.log(`\n\n${label}\n
  Ante: ${state.ante}
  Phase: ${state.phase}
  Community:
    ${state.community.join('\n    ')}
  Green: ${state.chipValues.green}`
  );
}

