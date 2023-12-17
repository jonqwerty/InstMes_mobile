import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';

import {COLORS, PADDING_HORIZONTAL} from '../theme/theme';
import IconEmoji from '../icons/IconEmoji';
import IconSendMessage from '../icons/IconSendMessage';
import {RootState, useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';

const SendTextBlock: FC = () => {
  const dispatch = useAppDispatch();

  const {authUser, currentChat} = useSelector((state: RootState) => state.app);

  const [text, setText] = useState<string>('');

  const handleSendMessage = () => {
    if (text) {
      if (currentChat && authUser) {
        const body = {
          chatId: currentChat?._id,
          senderId: authUser?._id,
          text: text,
        };
        dispatch(appActionCreator.sendMessage(body));
        setText('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.emoji}>
          <IconEmoji fill={COLORS.secondaryGreyHex} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
      <TouchableOpacity onPress={handleSendMessage}>
        <IconSendMessage fill={COLORS.secondaryGreyHex} />
      </TouchableOpacity>
    </View>
  );
};

export default SendTextBlock;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  row: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  emoji: {marginRight: 10},
  input: {width: '85%'},
});
