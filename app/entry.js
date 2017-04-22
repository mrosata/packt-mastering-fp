"use-strict"
/***
 *  ENTRY POINT FOR WEBPACK.
 *    A library might export values from here. Exports in a web-app are
 *    typically consumed by the same app so we won't make any exports
 *    here. We might export from './index.jsx' which is why it is not
 *    the entry file as Webpack will complain about importing from entry.
 */

import './styles/main.scss';
import './index';
