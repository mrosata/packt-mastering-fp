
export default (text = '', color = '') => logMessage =>
  console.log(
    `%c${ text }`,
    `font-weight:bold;color:${ color }`,
    logMessage
  )
