import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SubscriptionScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is Subscriptions screen</Text>
        </View>
    );
}

export default SubscriptionScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
