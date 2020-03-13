import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import "../public/index.css";
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
ReactDOM.render(<App history={history}/>, document.getElementById('root'));