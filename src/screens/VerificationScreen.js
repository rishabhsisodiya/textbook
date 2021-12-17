import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Colors, Fonts } from '../constants';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const VerificationScreen = ({
  route: {
    params: { phoneNumber },
  }, navigation
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });

  const verify_otp = async () => {
    const url = 'https://testbook-backend.herokuapp.com/api/v1/users/verify-otp';
    let code = otp['1'] + otp['2'] + otp['3'] + otp['4'];
    const body = {
      mobile: phoneNumber,
      otp: code,
    };
    console.log(body);

    axios.post(url, body)
      .then(res => {
        console.log(res.data);
        // alert('Login Successfully');
        const token = res.data.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.navigate('SelectCategory');
      })
      .catch(err => console.log('Error: ' + err));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <View style={{ height: StatusBar.currentHeight }} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.content}>
        Enter the OTP number just sent you at{' '}
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({ ...otp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({ ...otp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({ ...otp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({ ...otp, 4: text });
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => verify_otp()}>
        <Text style={styles.signinButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: windowWidth / 0.8,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_BLUE,
    borderRadius: 8,
    marginHorizontal: 20,
    height: windowHeight / 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default VerificationScreen;
