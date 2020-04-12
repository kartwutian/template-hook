import React from 'react';
import ReactDom from 'react-dom';
// import { Button } from 'antd';
import Root from './layouts/Root/index';

// const Test = () => {
//   return <Button>123</Button>;
// };

ReactDom.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
