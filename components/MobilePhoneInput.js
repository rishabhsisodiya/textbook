import React, { forwardRef } from 'react';
import {StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { windowHeight } from '../utils/Dimentions';

const MobilePhoneInput = (props, ref) => {
  return (
    <PhoneInput
      ref={ref}
      defaultValue={props.defaultValue}
      defaultCode="IN"
      layout="second"
      onChangeText={props.changeText}
      onChangeFormattedText={props.changeFormattedText}
      containerStyle={styles.inputContainer}
      textInputStyle={styles.inputField}
      withShadow
      autoFocus
    />
  );
};

export default forwardRef(MobilePhoneInput);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: windowHeight / 12,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputField: {
    padding: '-10%',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
