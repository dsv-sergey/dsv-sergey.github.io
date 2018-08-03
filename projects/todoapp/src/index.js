import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import  './semantic/dist/semantic.min.css';
import './style.css';


import App from './App';
import store from './store';

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);