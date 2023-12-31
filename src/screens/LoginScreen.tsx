import React, {FC, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import IconLogoPinkSnail from '../icons/IconLogoPinkSnail';
import IconLock from '../icons/IconLock';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  HEIGHT_INPUT_AND_BUTTON,
  PADDING_HORIZONTAL,
} from '../theme/theme';
import {useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import IconEnvelope from '../icons/IconEnvelope';
import {RootStackParamList} from '../common/enums';

const LoginScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCreateAccount = () => {
    navigation.navigate('Register', {});
  };

  const handleLogin = async () => {
    await dispatch(
      appActionCreator.login({
        email: email,
        password: password,
      }),
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.mainGreyHex}
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'}
        translucent={Platform.OS === 'ios'}
      />
      <LinearGradient
        colors={[COLORS.mainGreyHex, COLORS.mainCrimson]}
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

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.haveAccountText}>Not a member?</Text>

          <TouchableOpacity
            style={styles.createAccountBtn}
            onPress={handleCreateAccount}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default LoginScreen;

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

  loginBtn: {
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
    color: COLORS.primaryBlackHex,
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

  createAccountText: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryWhiteHex,
    lineHeight: 18,
    fontSize: FONT_SIZE.size_16,
  },

  createAccountBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryWhiteHex,
    borderRadius: 50,

    marginTop: 10,
  },
});
