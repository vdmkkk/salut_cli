import { StyleSheet, Text, View, Image, TextInput, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import background from '../assets/background3.png'
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useSelector } from 'react-redux';


export default function Reg3({navigation}) {

    const dispatch = useDispatch()

    const [tag, setTag] = useState(null)
    const [registerErrorText, setRegisterErrorText] = useState(null)
    const [users, setUsers] = useState([])
    const {profile} = useSelector(state => state.userReducer)

    useEffect(() => {
        const url = 'http://salut.test.na4u.ru/api/users';

        axios.get(url)
        .then(res => {
        setUsers(res['data'])})
        }, [])


    function submitSignIn() {
        var flag = true
        for (let i = 0; i < users.length; i++){
            if ((users[i]['tag'] == tag)) {
                setRegisterErrorText('Данный никнейм уже занят!')
                flag = false
            }
        }
        if (flag) {
            dispatch(setProfile({
                'id': null,
                'login': profile['login'],
                'password': profile['password'],
                'tag': tag,
                'avatar': null,
                'liked': [],
                'likedplaylists': [],
                'likedroutes': [],
                'date': profile['date'],
                'city': null,
                'algorithms': null
            }))
            navigation.navigate('Reg4')
            setRegisterErrorText(null)
        }
    }

    return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#3751AE'}}>
            <Image style={{opacity: 1, position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />

            <View style={{flexDirection: 'row', top: 40, width: '100%'}}>
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: '#FFF'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
            </View>

            <Text style={{color: '#FFF', fontSize: 40, fontWeight: '600', left: '5%', marginTop: 180}}>Придумайте никнейм</Text>
            <TextInput
                style={{fontSize: 18, color: '#FFF', backgroundColor: 'rgba(217, 217, 217, 0.45)', width: '90%', borderRadius: 20, padding: 15, paddingLeft: 15, marginTop: 25, alignSelf: 'center'}}
                onChangeText={setTag}
                value={tag}
                keyboardType="default"
                placeholderTextColor='#606060'
                autoCorrect={false}
                autoFocus={false}
                />
            {registerErrorText != null ? <Text style={{color: '#D00', fontSize: 18, left: '5%', fontWeight: '500', marginTop: 5}}>{registerErrorText}</Text> : <View></View>}

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><View style={{ backgroundColor: '#333', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 30}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Назад</Text></View></TouchableOpacity>
                    <TouchableOpacity disabled={(tag == null) ? true : false} onPress={() => submitSignIn()}><View style={{ backgroundColor: '#0014C9', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 30}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Дальше</Text></View></TouchableOpacity>
            </View>
        </View>
    )
}