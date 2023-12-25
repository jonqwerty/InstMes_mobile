import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useSelector} from 'react-redux';

import IconNotification from '../icons/IconNotification';
import {COLORS} from '../theme/theme';
import {SocketContext} from '../context/SocketContext';
import {RootState} from '../store/store';
import {unreadedNotificationsFunc} from '../utils/utils';

const Notification = () => {
  const {authUser, validationError, loading, userChats, users} = useSelector(
    (state: RootState) => state.app,
  );

  const {socket, onlineUsers, notifications} = useContext(SocketContext);

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

  console.log('un', authUser?.name, unreadedNotifications);
  console.log('mn', authUser?.name, modifiedNotifications);

  return (
    <View>
      <TouchableOpacity onPress={handleOpen}>
        <IconNotification fill={COLORS.primaryWhiteHex} />
      </TouchableOpacity>
      {isOpen ? (
        <View style={styles.notifications}>
          <Text style={{color: COLORS.primaryWhiteHex}}>Notifications</Text>
          <Text style={{color: COLORS.primaryWhiteHex}}>Mark all as read</Text>
        </View>
      ) : null}
    </View>
  );
};
export default Notification;

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    width: 100,
    top: 30,
    backgroundColor: COLORS.primaryGreyHex,
  },
});
