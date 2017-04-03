"use strict";
/**
 *  app/index.js
 */
//import code from './video-code/1.#.#.code';

/**
 * IF YOU SEE THIS HTML AFTER STARTING DEV SERVER
 * THEN YOU CAN DELETE THIS FUNCTION
 */
showWelcome();
function showWelcome() {
  const appElem = document.querySelector('#packtPubApp');

  if (!appElem) {
    alert(`There's a problem, can't find <div id="packtPubApp"></div>`);
    throw new Error("There should be a div with id='packtPubApp' above script tag in build/index.html");
    return;
  }

  appElem.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="lead"><strong>HELLO DEV! </strong>
            <small>Welcome to Mastering Functional Programming with JavaScript</small>
          </h1>
          <h4>You should delete the function that renders all this HTML in app/index.js</h4>
        </div>
      </div>
      <hr><br>
    </div>
    <blockquote class="blockquote blockquote-reverse">
      <p>
        “Let us step into the night and pursue that flighty temptress, adventure.”
      </p>
      <footer class="blockquote-footer">
        J.K. Rowling
        <cite title="Source Title">
          Harry Potter and the Half-Blood Prince
        </cite>
      </footer>
    </blockquote>
  `;
}
