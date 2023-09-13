import { StyleSheet, Text, View, Image, TextInput, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import background from '../assets/background3.png'
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useSelector } from 'react-redux';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';



export default function Reg4({navigation}) {

    const dispatch = useDispatch()

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [users, setUsers] = useState([])

    const cities = [
        {label: 'Москва 🇷🇺', value: 'Москва'},
        {label: 'Тбилиси 🇬🇪', value: 'Тбилиси'},
    ]

    const {profile} = useSelector(state => state.userReducer)

    useEffect(() => {
        const url = 'http://salut.test.na4u.ru/api/users';

        axios.get(url)
        .then(res => {
        setUsers(res['data'])})
        }, [])

    function submitSignIn() {
        axios.post('http://salut.test.na4u.ru/api/users', {
            login: profile['login'],
            password: profile['password'],
            tag: profile['tag'],
            liked: [],
            likedPlaylists: [],
            likedRoutes: [],
            avatar: null,
            date: profile['date'],
            city: value,
            algorithms: []
        })

        const url = 'http://salut.test.na4u.ru/api/users';

        axios.get(url)
        .then(res => {
            for (let i = 0; i < res['data'].length; i++){
                console.log(res['data'][i])
                if (res['data'][i]['login'] == profile['login']){
                AsyncStorage.set('user', users[i], 600); // Expires in 10 minutes
                dispatch(setProfile({
                    'id': res['data'][i],
                    'login': res['data'][i]['login'],
                    'password': res['data'][i]['password'],
                    'tag': res['data'][i]['tag'],
                    'avatar': res['data'][i]['avatar'],
                    'liked': res['data'][i]['liked'],
                    'likedplaylists': res['data'][i]['likedplaylists'],
                    'likedroutes': res['data'][i]['likedroutes'],
                    'date': res['data'][i]['date'],
                    'city': res['data'][i]['city'],
                    'algorithms': res['data'][i]['algorithms']
                    }))
                }
            }
            navigation.navigate('Home')
        }
        )
    }

    return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#3751AE'}}>
            <Image style={{opacity: 1, position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />

            <View style={{flexDirection: 'row', top: 40, width: '100%'}}>
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: '#FFF'}} />
            </View>

            <Text style={{color: '#FFF', fontSize: 40, fontWeight: '600', left: '5%', width: '90%', marginTop: 180}}>Выберите ваш город</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0}, {backgroundColor: 'rgba(217, 217, 217, 0.45)'}]}
            containerStyle={{backgroundColor: 'rgba(217, 217, 217, 0.45)', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderWidth: 0, top: -2, marginLeft: 1}}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            activeColor='rgba(70, 70, 70, 0.45)'
            itemTextStyle={{color: '#FFF', fontSize: 18, textAlign: 'center', right: 8}}
            data={cities}
            maxHeight={300}
            showsVerticalScrollIndicator={false}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Город мечты' : '...'}
            value={value}
            // statusBarIsTranslucent={true}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                if (item.value == value) setValue(null)
                else setValue(item.value);
                setIsFocus(false);
            }}
            />
            <View style={{flexDirection: 'row', marginTop: isFocus ? 120 : 0 , justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><View style={{ backgroundColor: '#333', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 30}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Назад</Text></View></TouchableOpacity>
                    <TouchableOpacity disabled={(value == null) ? true : false} onPress={() => submitSignIn()}><View style={{ backgroundColor: '#0014C9', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 30}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Поехали!</Text></View></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 8,
    marginTop: 40,
    width: "90%",
    left: '5%',
    position: 'relative',
    },
    icon: {
    marginRight: 5,
    },
    selectedTextStyle: {
    fontSize: 18,
    paddingLeft: 'auto',
    paddingRight: 'auto',
    textAlign: 'center',
    color: '#FFF'
    },
    placeholderStyle: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
    },
    iconStyle: {
    width: 20,
    height: 20,
    },
    inputSearchStyle: {
    height: 40,
    fontSize: 16,
    },
});