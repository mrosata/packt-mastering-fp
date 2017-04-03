"use strict";
/**
 *  Volume 1:
 *     section 4, video 4:
 *         Using JSX and Virtual DOM
 */
import html, {renderDOM} from './video-code/1.4.3.code';
import {lensProp, view, set, sum} from 'ramda';


const ui = ({counter = 0, greeting = '', whom = ''}) => {

  return (
    html('div', {className: 'container'},
      html('p', null,
        html('strong', {className: 'lead'},
          // Children text nodes
          `${greeting} ${whom}`,
          (greeting && whom ? '!' : '')
        )
      )
    )
  );
};


const defaultState = {counter: 0, greeting: 'Hello', whom: 'World'};


const update = renderDOM(
  ui,
  document.getElementById('packtPubApp'),
  defaultState
);
