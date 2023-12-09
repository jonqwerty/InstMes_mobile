import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootState, useAppDispatch} from '../store/store';
import {useSelector} from 'react-redux';

const ChatScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {authUser, validationError, loading} = useSelector(
    (state: RootState) => state.app,
  );

  const disableBackButton = useCallback(() => {
    if (navigation.isFocused()) {
      Alert.alert('Alert', `Are you sure you want to leave the app?`, [
        {
          text: 'NO',
          onPress: () => {
            // () => BackHandler.exitApp();
          },
        },
        {
          text: 'YES',
          onPress: () => {
            // () => BackHandler.exitApp();
          },
        },
      ]);

      return true;
    }
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, [disableBackButton]);

  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
