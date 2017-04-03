"use strict";
/**
 *  Volume 1:
 *     section 1, video 3:
 *         Encapsulating Impure
 *
 * circle area = πr^2
 * rect area   = w * len
 * radius      = diam / 2
 * total area  = (topCircleArea * 2) + sideArea
 * Final surface area ~ 1256.64 square units
 */
const document = require('./stub/document.js');

const pi = () => Math.PI;

const multiply = (n, m) => n * m;
const sum      = (a, b) => a + b;
const divide   = (n, d) => n / d;
const squared  = (n) => n ** 2;
const doubled  = (n) => multiply(n, 2);


const diamToRadius = (diam) => divide(diam, 2);
const toPerimeter  = (diam) => multiply(diam, pi());

const areaCircle = (radius) => multiply(pi(), squared(radius));
const areaRect   = multiply;


function surfaceAreaCylinder(diameter, height) {

  const radius    = diamToRadius(diameter);
  const areaSide  = areaRect(toPerimeter(doubled(radius)), height);
  const topArea   = areaCircle(radius);
  const topBottom = doubled(topArea);

  return sum(topBottom, areaSide);
}



//debugger;
