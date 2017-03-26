"use strict";
/**
 * 1.4.4.code.js
 */
import {map, is, mapObjIndexed} from 'ramda';
import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import buildHTML from 'virtual-dom/create-element';


/**
 * Take a function that passes state from our object
 * to our HTML Component.
 * Render that Element into root
 * @param {function} stateToUI
 * @param  root
 * @param defState
 */
export function renderDOM(stateToUI, root, defState = {}) {

  let currentUI = stateToUI(defState);
  const rootNode = buildHTML(currentUI);

  root.appendChild(rootNode);

  function diffAndPatch (nextUI) {
    const updatedDOM = diff(currentUI, nextUI);
    patch(rootNode, updatedDOM);
    currentUI = nextUI;
  }

  return nextState => diffAndPatch(stateToUI(nextState));
}



/**
 * Create HTML structures in JavaScript
 * @param elementType
 * @param props
 * @param children
 */
export default function html(elementType, props, ...children) {
  // Create an element for ui
  return h(elementType, props, children);
};

