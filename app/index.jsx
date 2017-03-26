"use strict";
/**
 *  app/index.js
 */

import './styles/main.scss';
import html, {renderDOM} from './video-code/1.4.3.code';


const ui = ({greeting = 'oi!', whom = 'you'}) => {
  return (
    <section className="container">
      <div className="jumbotron">
        <h1>
          {`${greeting} ${whom}`}
        </h1>
        <p>This is rendered using JSX without Virtual-DOM</p>
        <p>
          <a className="btn btn-primary btn-lg">
            Functional Programming
          </a>
        </p>
      </div>
    </section>
  );
}


const defaultState = {greeting: 'Hello', whom: 'World'};


const update = renderDOM(
  ui,
  document.getElementById('packtPubApp'),
  defaultState
);
