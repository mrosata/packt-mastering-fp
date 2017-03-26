"use strict"
/**
 *  Volume 1:
 *     section 1, video 3:
 *         Thinking of Functions in Terms of Return Value
 */

import document from './stub/document.js';

// circle area = πr ^2
// radius      = diam / 2
// rect area   = w * len
// total area  = (topCircleArea * 2) + sideRectArea
// Final Surface Should Be Approx: 1256.64 square units.
const pi = () => Math.PI;

const multiply = (n, m) => n * m;
const sum = (a, b) => a + b;
const divide = (n, d) => n / d;
const squared = (n) => n ** 2;
const doubled = (n) => multiply(n, 2);

const diamToRadius = (diam) => divide(diam, 2);
const toPerimeter = (diam) => multiply(diam, pi());

const areaCircle = (radius) => multiply(pi(), squared(radius));
const areaRect = (w, h) => multiply(w, h);


function surfaceAreaCylinder(diameter, height) {

  const radius     = diamToRadius(diameter);
  const areaSide = areaRect(toPerimeter(doubled(radius)), height);
  const topArea = areaCircle(radius);
  const topAndBottomArea = doubled(topArea);

  return sum(topAndBottom, areaSide);
}


const totalArea = surfaceAreaCylinder(diameter, height);
const totalArea2 = surfaceAreaCylinder(diameter, height);


