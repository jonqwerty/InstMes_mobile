import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';

import {IAuthUser, IUser, IUserChatsResponse} from '../store/app/appReducer';
import {useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import {COLORS, FONT_FAMILY, FONT_SIZE} from '../theme/theme';

interface IUserChatProps {
  chat: IUserChatsResponse;
  authUser: IAuthUser | null;
}

const UserChat: FC<IUserChatProps> = ({chat, authUser}) => {
  const dispatch = useAppDispatch();

  const [recipientUser, setRecipientUser] = useState<IUser | null>(null);

  const recipientId = chat?.members?.find(id => id !== authUser?._id);

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

  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={styles.block}>
        <View style={styles.row}>
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
    borderWidth: 1,
    borderColor: COLORS.primaryBlackHex,
    padding: 5,
  },
  row: {flexDirection: 'row'},
  block: {flexDirection: 'row', justifyContent: 'space-between'},
  name: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,
  },
  img: {
    height: 35,
    width: 35,
    marginRight:10
  },
});
