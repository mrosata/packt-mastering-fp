"use strict";
/**
 *  Volume 1:
 *     section 4, video 1:
 *         Mutable and Immutable API
 */
import {filter} from 'ramda';


let state = {
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


export default {};
