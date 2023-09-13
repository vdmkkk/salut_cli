import { StyleSheet, Text, View, Image, TextInput, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import background from '../assets/background3.png'
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useSelector } from 'react-redux';


export default function Reg5() {
    return(
        <View>
            <Image style={{opacity: 1, position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />
            <TextInput
                style={{fontSize: 18, color: '#FFF', backgroundColor: 'rgba(217, 217, 217, 0.45)', width: '90%', borderRadius: 20, padding: 15, paddingLeft: 15, marginTop: 25, alignSelf: 'center'}}
                onChangeText={setLogin}
                value={login}
                placeholder="Эл. почта / тэг"
                keyboardType="default"
                placeholderTextColor='#606060'
                autoCorrect={false}
                autoFocus={false}
                />
                <TextInput
                style={{fontSize: 18, color: '#FFF', backgroundColor: 'rgba(217, 217, 217, 0.45)', width: '90%', borderRadius: 20, padding: 15, paddingLeft: 15, marginTop: 15, alignSelf: 'center'}}
                onChangeText={setPassword}
                value={password}
                placeholder="Пароль"
                keyboardType="default"
                placeholderTextColor='#606060'
                autoCorrect={false}
                autoFocus={false}
                />
        </View>
    )
}