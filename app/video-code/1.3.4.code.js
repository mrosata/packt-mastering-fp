"use strict";
/**
 *  Volume 1:
 *     section 3, video 4:
 *        Combine Map, Filter and Reduce with Curried Functions
 */
import sources from '../data/calendar-events';
import {map, filter, reduce} from './1.2.4.code';
import {partial, __} from './1.3.3.code';

const isDefined = o => typeof o !== "undefined";
const isObj = o => o && typeof o === "object";

const {log} = console;

