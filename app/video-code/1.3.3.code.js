"use strict";
/**
 *  Volume 1:
 *     section 3, video 3:
 *        Write a Utility to Curry Functions
 */
import {map, filter} from './1.2.3.code';

export const __          = Symbol('some empty thing here...');
const isPlaceholder      = a => a === __;
const notPlaceholder     = a => !(isPlaceholder(a));
const removePlaceholders = a => filter(notPlaceholder, a);

const {log} = console;


/**
 * Custom Utility to partially apply arguments to functions
 * @param func
 * @param args
 */
export function partial(func, ...args) {

}


export {partial};
