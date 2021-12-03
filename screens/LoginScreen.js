import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title="Go back" onPress={()=> navigation.navigate("Home")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });

export default LoginScreen
