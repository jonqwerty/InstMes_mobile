import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

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
import {RootState, useAppDispatch} from '../store/store';
import {LoadingStatus, RootStackParamList} from '../common/enums';

const RegisterScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const {validationError, loading} = useSelector(
    (state: RootState) => state.app,
  );

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (validationError) {
      Alert.alert('Alert', `${validationError?.message || validationError}`, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(appActionCreator.clearValidationError());
          },
        },
      ]);
    }
  }, [validationError]);

  const handleSignUp = async () => {
    await dispatch(
      appActionCreator.register({
        name: name,
        email: email,
        password: password,
      }),
    );
    if (loading === LoadingStatus.SUCCEEDED) {
      Alert.alert('Alert', `You successfully registered`, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(appActionCreator.resetLoadingState());
          },
        },
      ]);
    }
  };

  const handleSignIn = async () => {
    navigation.navigate('Login', {});
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
        {loading === LoadingStatus.LOADING && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
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

          <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>

          <Text style={styles.haveAccountText} onPress={handleSignIn}>
            Already have an account?{' '}
            <Text style={styles.signInText}> Sign in</Text>
          </Text>
        </ScrollView>
      </LinearGradient>
    </>
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

  signInText: {
    fontFamily: FONT_FAMILY.lato_bold,
    color: COLORS.primaryBlackHex,
    lineHeight: 18,
    fontSize: FONT_SIZE.size_16,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
