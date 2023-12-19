import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Navigation from './src/navigation/Navigation';
import {store, persistor} from './src/store/store';
import {SocketContextProvider} from './src/context/SocketContext';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketContextProvider>
          <View style={styles.container}>
            <Navigation />
          </View>
        </SocketContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
