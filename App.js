import React from 'react';
import { Provider } from 'react-redux';

import HomeScreen from './components/HomeScreen';
import configureStore from './configureStore';

const App = () => (
    <Provider store={configureStore}>
        <HomeScreen />
    </Provider>
);

export default App;
