/**
 * @info !! THIS FILE IS MEANT FOR NODE !!
 *       !! Do not import it into files !!
 *       !! that you intend to use in   !!
 *       !! webpack.                    !!
 *
 * @file stub/document
 */


/**
 * STUB: HTMLElement
 */
class HTMLElement {
  constructor({selector = '', innerText, innerHTML=''}) {
    this.selector = selector;
    this.innerText = innerText;
    this.innerHTML = innerHTML;
  }
}

/**
 * STUB: HTMLInputElement
 */
class HTMLInputElement extends HTMLElement {
  constructor({selector = '', value}) {
    super({selector});
    this.generatorFn = value;
  }
  get value() {
    return typeof this.generatorFn === "function" ? this.generatorFn() : this.generatorFn;
  }
  set value(value) {
    this.generatorFn = value;
  }
}


/**
 * STUB: document.querySelector
 */
function querySelector(selector) {
  querySelector.DOM = querySelector.DOM || {};
  const cachedElem = (elemArgs, ElementType) => {
    const {selector: cacheSelector} = elemArgs;
    querySelector.DOM[cacheSelector] = typeof querySelector.DOM[cacheSelector] === "undefined" ? new ElementType(elemArgs) : querySelector.DOM[cacheSelector];
    return querySelector.DOM[cacheSelector];
  }

  switch (selector) {
    case '.height':
    case '.diameter':
      return cachedElem({selector, value: () => Math.ceil(Math.random() * 100)}, HTMLInputElement);
    case '.output':
      return cachedElem({selector}, HTMLElement);
    default:
      return null;
  }
}

/**
 * In order to run code as if we're in the browser but get the debugging in IDE I stubbed document to
 * mock the DOM (since we were not actually using the DOM in video, we just needed impure code)
 *
 * @type {{querySelector: function, HTMLElement: HTMLElement, HTMLInputElement: HTMLInputElement}}
 */
module.exports = {
  querySelector,
  HTMLElement,
  HTMLInputElement
}
