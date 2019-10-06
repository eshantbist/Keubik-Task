import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import AppStack from './AppStackNavigator';
console.disableYellowBox = true;
const createStoreWithMiddleWare=applyMiddleware(thunk)(createStore);

export default class App extends Component {
  render() {
    return(
      <Provider store={createStoreWithMiddleWare(reducers)}>
          <AppStack/>
      </Provider>
    );
  }
}
