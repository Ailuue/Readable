import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Form from './components/Form';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const middleware = [thunk];
middleware.push(createLogger());

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container text-center">
        <Switch>
          <Route path="/form" component={Form} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
