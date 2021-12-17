import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SelectNavigation = ({ navigation }) => {
    const [examCategories, setExamCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

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
        <FlatGrid
            itemDimension={130}
            data={examCategories}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
                <View style={[styles.itemContainer, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
            )}
        />
    );
};

export default SelectNavigation;

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemDescription: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});