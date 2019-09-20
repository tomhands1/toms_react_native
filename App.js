import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import createSagaMiddleware from 'redux-saga';

import OrderForm from './components/OrderForm';
import PrivateOrderbook from './components/PrivateOrderbook';
import TradeHistory from './components/TradeHistory';
import HomeScreen from './components/HomeScreen';

import rootReducer from './reducers/rootReducer';
import { createAppContainer } from 'react-navigation';
import rootSaga from './sagas/Orders';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const RootStack = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Mobile Bitcoin Trader'
        })
    },
    OrderForm: {
        screen: OrderForm,
        navigationOptions: ({ navigation }) => ({
            title: 'Place Order Here'
        })
    },
    PrivateOrderbook: {
        screen: PrivateOrderbook,
        navigationOptions: ({ navigation }) => ({
            title: 'My Orderbook'
        })
    },
    TradeHistory: {
        screen: TradeHistory,
        navigationOptions: ({ navigation }) => ({
            title: 'Trade History'
        })
    },
});

const Navigation = createAppContainer(RootStack);

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};

export default App;
