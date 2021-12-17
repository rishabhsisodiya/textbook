import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Colors } from '../constants';

const SelectNavigation = ({ navigation }) => {
    const [examCategories, setExamCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const url = 'https://testbook-backend.herokuapp.com/api/v1/exam/category';
            const token = await AsyncStorage.getItem('authToken');
            const header = {
                'Authorization': `Bearer ${token}`
            };
            axios.get(url, { headers: header })
                .then(res => {
                    console.log(res.data);
                    setExamCategories(res.data);
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
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.mainContainer}>
                <Card.Title>Select a exam category</Card.Title>
                <Card.Divider />
                {
                    examCategories.map((category, i) => {
                        return (
                            <View key={i} style={styles.mainCardView}>
                                {/* <Image
                                    style={styles.image}
                                    resizeMode="cover"
                                    source={{ uri: category.avatar }}
                                /> */}
                                <Text style={styles.title}>{category.title}</Text>
                            </View>
                        );
                    })
                }
            </Card>
        </ScrollView>
    );
};

export default SelectNavigation;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    message: {
        color: Colors.LIGHT_RED,
    },
    cardsContainer: {
        padding: 16,
    },
    mainCardView: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    title: {
        fontSize: 18,
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    containerStyle: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 0,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#808080',
        marginTop: 50,
        elevation: 10
    }
});
