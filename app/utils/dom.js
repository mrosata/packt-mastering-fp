"use strict";
/**
 *  Volume 1:
 *     section 4, video 3:
 *         Stateless JavaScript DOM and DOM Renderer
 */
import {map, is, mapObjIndexed} from 'ramda';

/**
 * Take a function that passes state from our object
 * to our HTML Component.
 * Render that Element into root
 * @param {function} stateToUI
 * @param  root
 * @param defState
 */
export function renderDOM(stateToUI, root, defState={}) {

  const initUI = stateToUI(defState);
  root.appendChild(initUI);

  return (state) => {
    if (root.hasChildNodes()) {
      root.removeChild(root.firstElementChild);
    }
    root.appendChild(stateToUI(state));
  }
}


function makeElem(elementType, props, children) {
  const elem = document.createElement(elementType);

  if (is(Object, props)) {
    mapObjIndexed((val, key) => {
      elem[key] = val;
    }, props);
  }

  map((child) => is(HTMLElement, child) ?
      elem.appendChild(child) :
      elem.appendChild(document.createTextNode(child)), children);

  return elem;
}


/**
 * Create HTML structures in JavaScript
 * @param elementType
 * @param props
 * @param children
 */
export default function html(elementType, props, ...children) {
  // Create an element for ui
  return makeElem(elementType, props, children);
};

