import {StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const navigation = useNavigation();
  const {authUser} = useSelector((state: RootState) => state.app);

  useLayoutEffect(() => {
    if (authUser) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Chat'}],
        });
      }, 0);
    }
  }, [authUser]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
