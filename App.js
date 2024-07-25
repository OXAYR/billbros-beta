import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/index';
import React, {useEffect} from 'react';
import firebase from './firebase';
import {PersistGate} from 'redux-persist/integration/react';
import {Store} from './src/Redux/store';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {StripeProvider} from '@stripe/stripe-react-native';

let persistor = persistStore(Store);

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <StripeProvider publishableKey="pk_test_51Oh79uLHaE9JSchrZN6M3Im6tS7jPvj7tV463VSvOiSUuN3ZajNrn6hqB7a0UdWjJOLhCd2DnYWkAPBibUdznV9r00c1IhiJcx">
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </StripeProvider>
      </PersistGate>
    </Provider>

    // <NavigationContainer>
    // </NavigationContainer>
  );
};
export default App;
