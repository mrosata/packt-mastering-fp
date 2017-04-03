"use strict";
/**
 *  Volume 1:
 *     section 3, video 2:
 *        Further Improve Higher-Order Functions
 */
const {log}  = console;
import {styles} from './1.2.1.code'
//import {partial, __} from './1.3.3.code';
import R from 'ramda';
const {partial, curry} = R;

function logger(useCss, styles, logger, logMethod, color, message, value) {

  let entry;
  const log = logger[logMethod],
      style = styles[color];

  // Create entry message (true = browser / false = server)
  if (useCss)
    entry = [`%c${message}`, style[0]]
  else
    entry = [`${style[1]}${message}${styles['reset'][1]}`];

  // log message
  log.apply(logger, [...entry, value]);
  return value;
}


const consoleLog = partial( logger, [true, styles, console]);

const infoLog    = consoleLog( ['info', 'lightGreen', 'INFO']);

infoLog({value: 'some info'})
