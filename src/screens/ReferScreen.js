import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ReferScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is Refer and Earn screen</Text>
        </View>
    );
}

export default ReferScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
