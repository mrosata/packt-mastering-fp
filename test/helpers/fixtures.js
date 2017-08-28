import clone from 'ramda/src/clone'

/**
 *
 * @type {{slides: (function()), slidesWithActive: (function())}}
 */
const FIXTURES = {

  /**
   * @function slides
   * @returns {{slides: array<SlidesFixture>}}
   */
  slides: () => clone({
    slides: [
      { id: 2, html: '', order: 1 },
      { id: 0, html: '', order: 1 },
      { id: 3, html: '', order: 0 },
      { id: 0, html: '', order: 2 },
      { id: 1, html: '', order: 6 },
      { id: 1, html: '', order: 4 },
      { id: 2, html: '', order: 4 },
      { id: 3, html: '', order: 1 },
      { id: 1, html: '', order: 9 },
    ],
  }),

  /**
   * @function slidesWithActive
   * @returns {{slides: array<SlidesFixture>}}
   */
  slidesWithActive: () => clone({
    slides: [
      { id: 2, html: '', order: 1 },
      { id: 0, html: '', order: 1 },
      { id: 3, html: '', order: 0 },
      { id: 0, html: '', order: 2 },
      { id: 1, html: '', order: 6 },
      { id: 1, html: '', order: 4 },
      { id: 2, html: '', order: 4, active: true },
      { id: 3, html: '', order: 1 },
      { id: 1, html: '', order: 9 },
    ],
  }),
}

export default FIXTURES

/**
 * @typedef {object} SlidesFixture
 * @property {number} id
 * @property {number} order
 * @property {string} html
 */
