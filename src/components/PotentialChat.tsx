import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useContext} from 'react';
import {useSelector} from 'react-redux';

import {COLORS, FONT_FAMILY, FONT_SIZE} from '../theme/theme';
import {IUser} from '../store/app/appReducer';
import {RootState, useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import {SocketContext} from '../context/SocketContext';

interface IPotentialChatProps {
  user: IUser;
}

const PotentialChat: FC<IPotentialChatProps> = ({user}) => {
  const dispatch = useAppDispatch();
  const {onlineUsers} = useContext(SocketContext);
  const {authUser} = useSelector((state: RootState) => state.app);

  const handleCreateChat = async () => {
    if (authUser) {
      await dispatch(
        appActionCreator.createChat({
          firstId: authUser?._id,
          secondId: user?._id,
        }),
      );
      await dispatch(appActionCreator.getUserChats(authUser?._id));
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCreateChat}>
      <View
        style={onlineUsers.some(u => u.userId === user._id) ? styles.dot : null}
      />
      <Text style={styles.text}>{user.name}</Text>
    </TouchableOpacity>
  );
};

export default PotentialChat;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: COLORS.mainCrimson,
    borderRadius: 4,
    padding: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryBlackHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,
  },
  dot: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 12,
    height: 12,
    backgroundColor: COLORS.primaryGreenHex,
    borderRadius: 6,
  },
});
