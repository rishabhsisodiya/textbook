import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is Profile screen</Text>
        </View>
    );
}

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
