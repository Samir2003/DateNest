import React, { Container } from 'react';
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import api from '../../src/calls.js'
import * as Application from 'expo-application';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({ navigation }) => {
    const deviceId = Application.androidId

    useEffect(() => {
        api.getUser(deviceId).then((user) => {
            if (!user) {
                api.addUser({ deviceId, dates: [] })
                    .then(() => {
                        navigation.navigate('MainScreen')
                    }).catch((e) => {
                        console.log('Error', e)
                    })
            }
            navigation.navigate('MainScreen')
        })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../../assets/heart.json')}
                autoPlay
                loop = {true}
            />
        </View>
    );
};

export default LoadingScreen