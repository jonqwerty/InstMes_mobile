import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootState, useAppDispatch} from '../store/store';
import {useSelector} from 'react-redux';
import storageMMKV from '../mmkv/storageMMKV';
import {StorageKey} from '../common/enums';
import {COLORS, PADDING_HORIZONTAL} from '../theme/theme';
import IconExit from '../icons/IconExit';
import {appActionCreator} from '../store/actions';

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
          onPress: () => {},
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
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
  console.log(
    '-->>',
    JSON.parse(
      storageMMKV.getString(StorageKey.AUTH_USER)
        ? storageMMKV.getString(StorageKey.AUTH_USER)
        : null,
    ),
  );

  const handleLogout = () => {
    Alert.alert('Alert', `Are you sure you want to logout?`, [
      {
        text: 'NO',
        onPress: () => {},
      },
      {
        text: 'YES',
        onPress: () => {
          dispatch(appActionCreator.logout({}));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={handleLogout}>
          <IconExit fill={COLORS.primaryWhiteHex} />
        </TouchableOpacity>
      </View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.secondPinkHex,
  },
  top: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: COLORS.primaryBlueHex,
  },
});
