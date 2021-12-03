import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const AppStack = createNativeStackNavigator();
const App = () => {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect( async() => {
   const value= await AsyncStorage.getItem("alreadylaunched");
   console.log(value)
  
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. 
    // Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    return (<NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown:false}}>
        <AppStack.Screen name="Home" component={OnboardingScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
      </AppStack.Navigator>
    </NavigationContainer>)
  } else {
    return <LoginScreen />
  }
};

export default App;