import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'ui/components/App';
import Profile from 'ui/components/users/Profile';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Switch } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'store/reducer/rootReducer';
import { Provider } from 'react-redux';

const history = createBrowserHistory();

const store = applyMiddleware(thunk, routerMiddleware(history))(createStore)(rootReducer);

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Switch>
                <Route exact path="/" component={ App }/>
                <Route path="/profile/:id" component={ Profile }/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement);
