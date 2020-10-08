import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FMBS from './FMBS';

ReactDOM.render(
  <React.StrictMode>
    <FMBS />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
