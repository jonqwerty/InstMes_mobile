import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import IconNotification from '../icons/IconNotification';
import {COLORS} from '../theme/theme';
import {SocketContext} from '../context/SocketContext';
import {RootState} from '../store/store';
import {unreadedNotificationsFunc} from '../utils/utils';
import {RootStackParamList, Screen} from '../common/enums';
import {IAuthUser, IUserChatsResponse} from '../store/app/appReducer';

const Notification = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {authUser, validationError, loading, userChats, users} = useSelector(
    (state: RootState) => state.app,
  );

  const {markAllNotificationsAsRead, markNotificationAsRead, notifications} =
    useContext(SocketContext);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const unreadedNotifications = unreadedNotificationsFunc(notifications);

  const modifiedNotifications = notifications.map(n => {
    const sender = users?.find(user => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  const handleMarkAll = () => {
    markAllNotificationsAsRead(notifications);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpen}>
        <IconNotification fill={COLORS.primaryWhiteHex} />

        {unreadedNotifications?.length === 0 ? null : (
          <View style={styles.quantity}>
            <Text style={styles.text}>{unreadedNotifications?.length}</Text>
          </View>
        )}
      </TouchableOpacity>
      {isOpen ? (
        <View style={styles.notificationsBox}>
          <View style={styles.notifications}>
            {/* <Text style={styles.text}>Notifications</Text> */}
            <Text style={[styles.text, styles.btn]} onPress={handleMarkAll}>
              Mark all as read
            </Text>
          </View>
          {modifiedNotifications.length === 0 ? (
            <Text style={styles.text}>No notification yet...</Text>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    markNotificationAsRead(
                      n,
                      userChats as IUserChatsResponse[],
                      authUser as IAuthUser,
                      notifications,
                    );
                    setIsOpen(false);
                    navigation.navigate(Screen.UserChat, {});
                  }}
                  key={index}
                  style={n.isRead ? styles.readed : styles.notReaded}>
                  <Text
                    style={
                      styles.text
                    }>{`${n.senderName} sent you a new message`}</Text>
                  <Text style={styles.text}>
                    {' '}
                    {n.date.toString().split('T')[1].slice(0, 5)}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      ) : null}
    </View>
  );
};
export default Notification;

const styles = StyleSheet.create({
  container: {marginRight: 30},
  notificationsBox: {
    position: 'absolute',
    width: 200,
    top: 30,
    right: -50,
    backgroundColor: COLORS.primaryGreyHex,
    padding: 4,
  },
  notifications: {},
  quantity: {
    position: 'absolute',
    width: 20,
    top: -10,
    left: 10,
    backgroundColor: COLORS.primaryGreenHex,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: COLORS.primaryWhiteHex},
  btn: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: COLORS.primaryWhiteHex,
    paddingHorizontal: 4,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  notReaded: {backgroundColor: COLORS.secondaryLightGreyHex, marginBottom: 5},
  readed: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryLightGreyHex,
  },
});
