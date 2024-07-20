import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/index';
import React, {useEffect} from 'react';
import firebase from './firebase';
import {PersistGate} from 'redux-persist/integration/react';
import {Store} from './src/Redux/store';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';

let persistor = persistStore(Store);

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>

    // <NavigationContainer>
    // </NavigationContainer>
  );
};
export default App;
