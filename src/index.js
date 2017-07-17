import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import App from './app';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

var loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('body')[0].appendChild(tag);
}

loadScript('//code.responsivevoice.org/responsivevoice.js');
