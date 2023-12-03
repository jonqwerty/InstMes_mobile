import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  HEIGHT_INPUT_AND_BUTTON,
  PADDING_HORIZONTAL,
} from '../theme/theme';
import IconLogoPinkSnail from '../icons/IconLogoPinkSnail';
import IconUser from '../icons/IconUser';
import IconEnvelope from '../icons/IconEnvelope';
import IconLock from '../icons/IconLock';
import {appActionCreator} from '../store/actions';
import {useAppDispatch} from '../store/store';

const RegisterScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {}, []);

  const handleSignIn = async () => {
    // await dispatch(
    //   appActionCreator.register({
    //     name: 'roko',
    //     email: 'aaa@gmail.com',
    //     password: 'Qa111111!',
    //   }),
    // );
    // navigation.navigate('Chat', {});
  };

  return (
    <LinearGradient
      colors={[COLORS.primaryPurpleHex, COLORS.primaryPinkHex]}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}>
        <IconLogoPinkSnail
          stroke={COLORS.primaryBlackHex}
          fill={COLORS.primaryPinkHex}
        />

        <Text style={styles.titleText}>PinkSnail</Text>

        <View style={styles.inputContainer}>
          <IconUser fill={COLORS.primaryWhiteHex} />

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <IconEnvelope fill={COLORS.primaryWhiteHex} />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <IconLock fill={COLORS.primaryWhiteHex} />

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.haveAccountText}>
          Already have an account?{' '}
          <Text style={styles.signInText}>Sign in</Text>
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {flexGrow: 1, alignItems: 'center'},
  wrapper: {padding: PADDING_HORIZONTAL},
  titleText: {
    fontFamily: FONT_FAMILY.lato_black,
    color: COLORS.primaryWhiteHex,
    lineHeight: 32,
    fontSize: FONT_SIZE.size_30,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    height: HEIGHT_INPUT_AND_BUTTON,
    borderWidth: 2,
    borderColor: COLORS.primaryWhiteHex,
    borderRadius: 10,

    alignItems: 'center',

    marginTop: 30,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: FONT_FAMILY.lato_regular,
    color: COLORS.primaryWhiteHex,
    lineHeight: 26,
    fontSize: FONT_SIZE.size_24,
  },
  forgotPasswordText: {
    fontFamily: FONT_FAMILY.lato_regular,
    color: COLORS.primaryWhiteHex,
    lineHeight: 24,
    fontSize: FONT_SIZE.size_14,

    alignSelf: 'flex-end',
    marginTop: 60,
  },

  btn: {
    width: '100%',
    height: HEIGHT_INPUT_AND_BUTTON,
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: 10,
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryPurpleHex,
    lineHeight: 26,
    fontSize: FONT_SIZE.size_24,
  },

  haveAccountText: {
    fontFamily: FONT_FAMILY.lato_regular,
    color: COLORS.primaryWhiteHex,
    lineHeight: 16,
    fontSize: FONT_SIZE.size_14,

    marginTop: 'auto',
  },

  signInText: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryPurpleHex,
    lineHeight: 18,
    fontSize: FONT_SIZE.size_16,
  },
});
