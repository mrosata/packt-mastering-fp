require('./reset.js')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { log } = console
const { join, resolve } = path
const COLS = 40
const BRAND = 'Packt Pub'

// Don't let program close instantly (for exit handlers)
process.stdin.resume()
console.log(process.argv[1])
const mainFilename = process.argv[2] || 'index.js'
const mainFile = join(resolve('.', mainFilename))
const colorsFile = join(resolve('.'), '~colors.tmp')

// fillSpaces :: (Int, a) -> [a]
const fillSpaces = (count, value) => new Array(count).fill(value).join('')

// colors for console
let colors = ['green', 'red', 'cyan', 'magenta']
fs.readFile(colorsFile, 'utf8', (err, body) => {
  if (err) {
    console.log('read error', err) 
  }
  else {
    colors = body.split(',')
  }
  const mainColor = typeof chalk[colors[0]] === "function" ?
    chalk[colors[0]] : chalk.green
  const secColor = typeof chalk[colors[3]] === "function" ?
    chalk[colors[3]] : chalk.magenta

  console.reset()
  const emptySpace = (COLS-1) - (BRAND.length) - 8
  const quarter = Math.floor(emptySpace / 4)
  const extra = emptySpace - (quarter*4)
  log(chalk.bold(`${
      secColor(fillSpaces((COLS-1), '-')) +
      secColor(`${ fillSpaces(quarter + Math.floor(extra/2), '*') }  ${ fillSpaces(quarter, '-') }`) }  `
    + `${ mainColor(BRAND) }  ${ secColor(fillSpaces(quarter, '-')) }  `
    + `${ secColor(fillSpaces(quarter + Math.ceil(extra/2), '*')) }\n\n`
  ))
  fs.writeFileSync(colorsFile, rotate(colors).join(','), 'utf8')
  require(mainFile)
})

// Rotate array items
const rotate = list => {
  const copy = [].concat(list)
  const item = copy.pop()
  copy.unshift(item)
  return copy
}

function exitHandler(options, err) {
  if (options.cleanup)
    console.log('clean')
  if (err)
    console.log(err.stack)
  if (options.exit) {
    fs.unlink(colorsFile)
    process.exit()
  }
}

// closing
process.on('exit', exitHandler.bind(null,{ cleanup:true }));

// ctrl+c
process.on('SIGINT', exitHandler.bind(null, { exit:true }));

// uncaught exceptions
//process.on('uncaughtException', exitHandler.bind(null, { exit:true }));
