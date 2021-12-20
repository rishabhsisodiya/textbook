import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function StoreScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is Store screen</Text>
        </View>
    );
}

export default StoreScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
