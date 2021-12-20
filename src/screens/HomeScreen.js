import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function ScreenOne({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function ScreenTwo({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.goBack()}
                title="Go back home"
            />
        </View>
    );
}

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <Drawer.Navigator initialRouteName="ScreenOne">
            <Drawer.Screen name="ScreenOne" component={ScreenOne} />
            <Drawer.Screen name="ScreenTwo" component={ScreenTwo} />
        </Drawer.Navigator>
    );
};

export default HomeScreen;