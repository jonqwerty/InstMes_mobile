import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import Navigation from './src/navigation/Navigation';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
