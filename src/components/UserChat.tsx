import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {IAuthUser, IUser, IUserChatsResponse} from '../store/app/appReducer';
import {useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import {COLORS, FONT_FAMILY, FONT_SIZE} from '../theme/theme';
import {RootStackParamList, Screen} from '../common/enums';
import {SocketContext} from '../context/SocketContext';
import {unreadedNotificationsFunc} from '../utils/utils';
import {useFetchLatestMessage} from '../hooks/useFetchLatestMessage';

interface IUserChatProps {
  chat: IUserChatsResponse;
  authUser: IAuthUser | null;
}

const UserChat: FC<IUserChatProps> = ({chat, authUser}) => {
  const dispatch = useAppDispatch();
  const {onlineUsers, notifications, markThisUserNotificationAsRead} =
    useContext(SocketContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {latestMessage} = useFetchLatestMessage(chat);

  const [recipientUser, setRecipientUser] = useState<IUser | null>(null);

  const recipientId = chat?.members?.find(id => id !== authUser?._id);

  const isOnline = onlineUsers?.some(user => user.userId === recipientId);

  const unreadNotifications = unreadedNotificationsFunc(notifications);

  const thisUserNotifications = unreadNotifications.filter(
    n => n.senderId === recipientUser?._id,
  );

  useEffect(() => {
    (async () => {
      if (recipientId) {
        const data = await dispatch(appActionCreator.getUser(recipientId));
        if (appActionCreator.getUser.fulfilled.match(data)) {
          setRecipientUser(data.payload);
        }
      }
    })();
  }, []);

  const handleClickChat = () => {
    if (thisUserNotifications.length !== 0) {
      markThisUserNotificationAsRead(thisUserNotifications, notifications);
    }
    dispatch(appActionCreator.setCurrentChat(chat));
    navigation.navigate(Screen.UserChat, {});
  };

  const truncateText = (text: string) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + '...';
    }
    return shortText;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClickChat}>
      <View style={styles.block}>
        <View style={styles.row}>
          <View style={isOnline ? styles.dot : null} />
          <View style={styles.avatarContainer}>
            <Image
              style={styles.img}
              source={require('../assets/images/avatar.png')}
            />
          </View>
          <View>
            <Text style={styles.name}>{recipientUser?.name}</Text>
            {latestMessage && <Text>{truncateText(latestMessage?.text)}</Text>}
          </View>
        </View>

        <View>
          <Text>{latestMessage?.createdAt}</Text>

          <View
            style={thisUserNotifications.length > 0 ? styles.quantity : null}>
            <Text style={styles.text}>
              {thisUserNotifications?.length > 0
                ? thisUserNotifications?.length
                : null}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.primaryBlackHex,
    padding: 5,
  },
  row: {flexDirection: 'row'},
  block: {flexDirection: 'row', justifyContent: 'space-between'},
  name: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryBlackHex,
    lineHeight: 22,
    fontSize: FONT_SIZE.size_20,
  },
  img: {
    height: 45,
    width: 45,
  },
  dot: {
    position: 'absolute',
    top: 0,
    left: 35,
    width: 12,
    height: 12,
    backgroundColor: COLORS.primaryGreenHex,
    borderRadius: 6,
    zIndex: 2,
  },
  quantity: {
    width: 20,

    backgroundColor: COLORS.primaryGreenHex,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: COLORS.primaryWhiteHex},
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryWhiteHex,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
