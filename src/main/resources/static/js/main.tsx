import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './ui/components/App';
import { createBrowserHistory}  from 'history';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './middleware/reducer/rootReducer';
import { Provider } from 'react-redux';

const history = createBrowserHistory();

const store = applyMiddleware(thunk, routerMiddleware(history))(createStore)(rootReducer);

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ App }/>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement);
