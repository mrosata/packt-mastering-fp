"use strict";
/**
 *  Volume 1:
 *     section 2, video 4:
 *         Reasoning With Reduce
 */
import {sum, divide} from './1.1.2.code';
import {map, filter} from './1.2.3.code';

const ten = () => sum(5, 5);
const subtract = (a, b) => a - b;
const sortAsc = list => list.sort(subtract);

const students = [
  {name: 'Alice', grades: [89, 93, null, 100, 66]},
  {name: 'Bob', grades: [70, 71, 100, 82, 90]},
  {name: 'Martin', grades: [89, 93, 45, 62, null]},
  {name: 'Storm', grades: [80, 70, 100, 82, 94]},
  {name: 'Corrina', grades: [86, null, 100, 34, 79]},
  {name: 'Alexa', grades: [95, 85, 100, null, 64]},
  {name: 'Susan', grades: [82, 91, 84, 94, 90]},
  {name: 'Jake', grades: [92, null, 84, null, 90]}
];


const total = [1, 2, 3, 4, 5];


//debugger;

// After finishing, export these for use in next lesson
//export {reduce, map, getBestStats, studentStats};
