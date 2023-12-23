import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useKeyboard} from '@react-native-community/hooks';

import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  PADDING_HORIZONTAL,
} from '../theme/theme';
import {RootState, useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import {IUser} from '../store/app/appReducer';
import IconLeftArrow from '../icons/IconLeftArrow';
import {RootStackParamList} from '../common/enums';
import SendTextBlock from '../components/SendTextBlock';

const UserChatScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const keyboard = useKeyboard();
  const scrollRef = useRef<ScrollView | null>(null);

  const {authUser, currentChat, messages} = useSelector(
    (state: RootState) => state.app,
  );

  const [recipientUser, setRecipientUser] = useState<IUser | null>(null);

  const recipientId = currentChat?.members?.find(id => id !== authUser?._id);

  useEffect(() => {
    scrollRef?.current?.scrollToEnd();
  }, [messages]);

  useEffect(() => {
    if (keyboard.keyboardShown) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [keyboard.keyboardShown]);

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

  useEffect(() => {
    if (currentChat) {
      dispatch(appActionCreator.getMessages(currentChat?._id));
    }
  }, [currentChat]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
            <IconLeftArrow fill={COLORS.primaryWhiteHex} />
          </TouchableOpacity>

          <Image
            style={styles.img}
            source={require('../assets/images/avatar.png')}
          />

          <Text style={styles.name}>{recipientUser?.name}</Text>
        </View>
      </View>
      <ScrollView style={styles.mainPart} ref={scrollRef}>
        {messages?.map((message, index) => {
          return (
            <View
              key={index}
              style={
                message.senderId === authUser?._id
                  ? styles.recipient
                  : styles.authUser
              }>
              <Text style={styles.text}> {message.text}</Text>
              <View style={styles.gap}>
                <Text style={styles.date}>
                  {new Date(message.createdAt).toLocaleDateString('en-GB')}
                </Text>
                <Text style={styles.date}>
                  {message.createdAt.split('T')[1].slice(0, 5)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <SendTextBlock scrollRef={scrollRef} />
    </View>
  );
};

export default UserChatScreen;

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
  row: {flexDirection: 'row', alignItems: 'center'},
  arrow: {marginRight: 15},
  img: {
    height: 35,
    width: 35,
    marginRight: 10,
  },

  name: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,
  },
  mainPart: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 10,
  },
  authUser: {
    padding: 12,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryPurpleHex,
    marginTop: 7,
  },

  recipient: {
    padding: 12,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primaryBlueHex,
    marginTop: 7,
  },

  text: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,
  },
  date: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_10,
  },

  gap: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: COLORS.primaryWhiteHex,
    alignSelf: 'flex-end',
  },
});
