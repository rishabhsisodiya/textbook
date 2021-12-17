import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';

import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import MobilePhoneInput from '../components/MobilePhoneInput';
import { Colors } from '../constants';

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [formattedMobileValue, setFormattedMobileValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput = useRef(null);

  const login = async () => {
    setIsLoading(true);
    const url = 'https://testbook-backend.herokuapp.com/api/v1/users/login';
    const body = {
      mobile,
    };
    console.log(body);

    axios
      .post(url, body)
      .then(res => {
        console.log(res.data);
        navigation.navigate('Verification', { phoneNumber: mobile });
        setIsLoading(false);
      })
      .catch(err => {
        console.log('Error: ' + err);
        setIsLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/rn-social-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>App Name</Text>

      <MobilePhoneInput
        ref={phoneInput}
        defaultValue={mobile}
        changeText={text => {
          setMobile(text);
        }}
        changeFormattedText={text => {
          setFormattedMobileValue(text);
        }}
      />

      <FormButton
        buttonTitle="Sign In"
        loading={isLoading}
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(mobile);
          if (checkValid) {
            login();
          } else {
            alert('Please enter valid Mobile No.');
          }
        }}
      />

      {/* <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      {Platform.OS === 'android' ? (
        <View style={{ marginTop: 100 }}>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={
              () => alert('google login')
              // googleLogin()
            }
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  message: {
    color: Colors.LIGHT_RED,
  },
});
