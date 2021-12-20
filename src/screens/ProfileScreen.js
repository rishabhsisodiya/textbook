import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
    Avatar,
    Title,
    Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { ApiEndpoints } from '../constants';

function ProfileScreen({ navigation }) {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const url = ApiEndpoints.BASE_URL + '/users/profile';
            const token = await AsyncStorage.getItem('authToken');
            const header = {
                'Authorization': `Bearer ${token}`
            };
            axios.get(url, { headers: header })
                .then(res => {
                    console.log(res.data);
                    setUserProfile(res.data);
                })
                .catch(err => {
                    console.log('Error: ' + err);
                });
        }
        catch (e) {
            console.log(e)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
                        }}
                        size={64}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={styles.title}>{userProfile.name}</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={styles.contactInfo}>Jaipur, India</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={styles.contactInfo}>+91-{userProfile.mobile}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={styles.contactInfo}>{userProfile.email}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5
    },
    contactInfo: {
        color: "#777777",
        marginLeft: 20
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});