import React from 'react';
import ReactDom from 'react-dom';
import Root from './layouts/Root/index';

ReactDom.render(<Root />, document.getElementById('root'));

if(module.hot){
  module.hot.accept();
}
