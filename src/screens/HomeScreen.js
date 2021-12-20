import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from './ProfileScreen';
import SubscriptionScreen from './SubscriptionScreen';
import JobAlertsScreen from './JobAlertsScreen';
import StoreScreen from './StoreScreen';
import ReferScreen from './ReferScreen';
import SettingsScreen from './SettingsScreen';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <Drawer.Navigator initialRouteName="ScreenOne">
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Subscription" component={SubscriptionScreen} />
            <Drawer.Screen name="Job Alerts" component={JobAlertsScreen} />
            <Drawer.Screen name="Store" component={StoreScreen} />
            <Drawer.Screen name="Refer and Earn" component={ReferScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
};

export default HomeScreen;