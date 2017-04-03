"use strict"
/**
 *  Volume 1:
 *     section 2, video 1:
 *         Promoting Reusable Higher-Order Functions
 */


/**
 * A Fake Remote Logger to use in our example
 *
 * @example
 *    const rl = new RemoteLogger();
 *    rl.sendMessage("Anything at all", {is:324})
 */
class RemoteLogger {
  constructor() {}

  sendMessage(message, value) {
    console.log(
      '\nLogging Remote Message -->> ',
      [new Date().getTime(), message, value]);
  }

}



/**
 * Mapping of colors to an array with their css and command line (bash) equivalents.
 *
 * {
 *   colorName: [ <css-style>, <shell-style> ]
 * }
 *
 */
export const styles =  {
  red:          ['color: red',          '\x1b[31m'],
  blue:         ['color: blue',         '\x1b[34m'],
  magenta:      ['color: magenta',      '\x1b[35m'],
  green:        ['color: green',        '\x1b[32m'],
  yellow:       ['color: yellow',       '\x1b[33m'],
  blue:         ['color: blue',         '\x1b[34m'],
  magenta:      ['color: magenta',      '\x1b[35m'],
  cyan:         ['color: cyan',         '\x1b[36m'],
  lightGray:    ['color: lightgray',    '\x1b[37m'],
  darkGray:     ['color: darkgray',     '\x1b[90m'],
  lightRed:     ['color: pink',         '\x1b[91m'],
  lightGreen:   ['color: lightgreen',   '\x1b[92m'],
  lightYellow:  ['color: lightyellow',  '\x1b[93m'],
  lightBlue:    ['color: lightblue',    '\x1b[94m'],
  lightMagenta: ['color: lightcoral',   '\x1b[95m'],
  lightCyan:    ['color: lightcyan',    '\x1b[96m'],
  white:        ['color: white',        '\x1b[97m'],
  reset:        ['color:unset',          '\x1b[0m']
}



export function logger(useCss, logger, logMethod, color, message, value = null) {

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

