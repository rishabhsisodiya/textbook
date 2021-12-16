import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import MobilePhoneInput from '../components/MobilePhoneInput';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [value, setValue] = useState('');
  const [mobile, setMobile] = useState('');
  const phoneInput = useRef(null);

  const register = async () => {
    const url = 'https://testbook-backend.herokuapp.com/api/v1/users/register';
    const body = {
      name,
      email,
      mobile: value
    };
    console.log(body);

    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then(res => {
    //     console.log('Success: ');
    //     console.log(res.json());
    //     navigation.navigate('Verification', {phoneNumber: mobile});
    //   })
    //   .catch(err => console.log('Error: ' + err));

    axios.post(url, body)
      .then(res => {
        console.log('Success: ' + res);
        navigation.navigate('Verification', { phoneNumber: mobile });
      })
      .catch(err => console.log('Error: ' + err.response.data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={name}
        onChangeText={userName => setName(userName)}
        placeholderText="Enter your full name"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <MobilePhoneInput
        ref={phoneInput}
        defaultValue={value}
        changeText={text => {
          setValue(text);
        }}
        changeFormattedText={text => {
          setMobile(text);
        }}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          if (checkValid) {
            register();
          } else {
            alert('Please enter valid Mobile No.');
          }
        }}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
          Privacy Policy
        </Text>
      </View>

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {
              alert('Google Signup');
            }}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
