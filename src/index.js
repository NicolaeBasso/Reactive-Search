import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.css';
import App from './components/App';

console.log = console.warn = console.error = () => {};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
