import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function JobAlertsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is Job Alerts screen</Text>
        </View>
    );
}

export default JobAlertsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
