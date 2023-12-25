import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
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
import PotentialChat from '../components/PotentialChat';
import {IUser} from '../store/app/appReducer';
import Notification from '../components/Notification';

const ChatScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const {authUser, validationError, loading, userChats, users} = useSelector(
    (state: RootState) => state.app,
  );

  const [potentialUsers, setPotentialUsers] = useState<IUser[] | null>(null);

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
      dispatch(appActionCreator.getUsers({}));
    }
  }, []);

  useEffect(() => {
    if (users) {
      if (userChats?.length === 0 || !userChats) {
        setPotentialUsers(users?.filter(item => item._id !== authUser?._id));
        return;
      }
      const firstIdsInChats = userChats?.map(item => item.members[0]);
      const secondIdsInChats = userChats?.map(item => item.members[1]);
      const unicIdsinChats = [
        ...new Set([...firstIdsInChats, ...secondIdsInChats]),
      ];

      const filteredUsers = users.filter(u => !unicIdsinChats.includes(u._id));

      setPotentialUsers(filteredUsers);
    }
  }, [users, userChats]);

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
        <View style={styles.row}>
          <Notification />
          <TouchableOpacity onPress={handleLogout}>
            <IconExit fill={COLORS.primaryWhiteHex} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainPart}>
        <Text>List of potential users </Text>

        <ScrollView
          style={styles.containerOfPotentials}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          {potentialUsers?.map((u, index) => {
            return <PotentialChat key={index} user={u} />;
          })}
        </ScrollView>

        <Text>List of chats</Text>
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
    zIndex: 2,
  },

  logged: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,
  },
  mainPart: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  containerOfPotentials: {
    maxHeight: 100,
    width: '100%',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
});
