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
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootState, useAppDispatch} from '../store/store';
import storageMMKV from '../mmkv/storageMMKV';
import {RootStackParamList, StorageKey} from '../common/enums';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  PADDING_HORIZONTAL,
} from '../theme/theme';
import IconExit from '../icons/IconExit';
import {appActionCreator} from '../store/actions';
import UserChat from '../components/UserChat';

const ChatScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const {authUser, validationError, loading, userChats} = useSelector(
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

  useEffect(() => {
    if (authUser?._id) {
      dispatch(appActionCreator.getUserChats(authUser?._id));
    }
  }, []);

  // console.log(
  //   '-->>',
  //   JSON.parse(
  //     storageMMKV.getString(StorageKey.AUTH_USER)
  //       ? storageMMKV.getString(StorageKey.AUTH_USER)
  //       : null,
  //   ),
  // );

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
        <Text style={styles.logged}>Logged as {authUser?.name}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <IconExit fill={COLORS.primaryWhiteHex} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainPart}>
        <Text>List</Text>
        {userChats?.map((chat, index) => {
          return <UserChat key={index} chat={chat} authUser={authUser} />;
        })}
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: COLORS.primaryBlueHex,
  },

  logged: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,
  },
  mainPart: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});
