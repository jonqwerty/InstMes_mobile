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

interface IUserChatProps {
  chat: IUserChatsResponse;
  authUser: IAuthUser | null;
}

const UserChat: FC<IUserChatProps> = ({chat, authUser}) => {
  const dispatch = useAppDispatch();
  const {onlineUsers} = useContext(SocketContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [recipientUser, setRecipientUser] = useState<IUser | null>(null);

  const recipientId = chat?.members?.find(id => id !== authUser?._id);

  const isOnline = onlineUsers?.some(user => user.userId === recipientId);

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
    dispatch(appActionCreator.setCurrentChat(chat));
    navigation.navigate(Screen.UserChat, {});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClickChat}>
      <View style={styles.block}>
        <View style={styles.row}>
          <View style={isOnline ? styles.dot : null} />
          <Image
            style={styles.img}
            source={require('../assets/images/avatar.png')}
          />
          <View>
            <Text style={styles.name}>{recipientUser?.name}</Text>
            <Text>text message</Text>
          </View>
        </View>

        <View>
          <Text>12/12/1212</Text>
          <Text style={styles.name}>2</Text>
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
    color: COLORS.primaryWhiteHex,
    lineHeight: 20,
    fontSize: FONT_SIZE.size_18,
  },
  img: {
    height: 45,
    width: 45,
    marginRight: 16,
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
});
