import React, {FC, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import IconLogoPinkSnail from '../icons/IconLogoPinkSnail';
import IconUser from '../icons/IconUser';
import IconLock from '../icons/IconLock';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  HEIGHT_INPUT_AND_BUTTON,
  PADDING_HORIZONTAL,
} from '../theme/theme';

const LoginScreen: FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCreateAccount = () => {
    navigation.navigate('Register', {});
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
          <IconLock fill={COLORS.primaryWhiteHex} />

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
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
