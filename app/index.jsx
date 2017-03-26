"use strict";
/**
 *  app/index.js
 */


import html, {renderDOM} from './video-code/1.4.3.code';


const ui = ({greeting='oi!', whom='you'}) => {

  return (
    html('div', {className: 'container'},
      html('p', null,
        `${greeting} ${whom}`
      ),
      html('p', {id: 'test'},
        html('strong', null,
          `${greeting}`,
          '...  ...',
          ' '
        ),
        html('em', null,
          'How are you?'
        )
      ),
      html('br'),
      html('hr'),
      html('ul', {className: 'list-group list-group-items'},
        html('li', {className: 'list-group-item'},
          html('h1', null, 'Hi again')
        ),
        html('li', {className: 'list-group-item'},
          html('h1', null, 'Hi again')
        ),
        html('li', {className: 'list-group-item'},
          html('h1', null, 'Hi again')
        )
      )
    )
  );
}


const defaultState = {greeting: 'Hello', whom: 'World'};


const update = renderDOM(
  ui,
  document.getElementById('packtPubApp'),
  defaultState
);
