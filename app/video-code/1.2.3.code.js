/**
 *  Volume 1:
 *     section 2, video 3:
 *         A Better Way to Map and Filter
 */
// REMOVE NEXT 2 LINES MICHAEL
import {map, filter} from 'ramda';
export {map, filter};
// THE ABOVE IS FOR SCREENSHOT NOT FOR GIT

import {sum} from './1.1.2.code';
const gt10   = n => n > 10;
const addTen = n => sum(10, n);
const itemsOverTen  = [1, 4, 12, 14, 6, 29].filter(gt10);
const itemsAddTen   = [1, 4, 12, 14, 6, 29].filter(addTen);
const mapThenFilter = [1, 4, 12, 14, 6, 29].filter(gt10).map(addTen);
