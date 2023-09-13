import { StyleSheet, Text, View, Image, TextInput, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import background from '../assets/background3.png'
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


export default function Reg2({navigation}) {
    const sourceMoment = moment.unix(1636797600);
    const sourceDate = new Date

    console.log(typeof sourceDate)

    const dispatch = useDispatch()

    const [fadeAnim] = useState(new Animated.Value(0));
    const {profile} = useSelector(state => state.userReducer)


    const [users, setUsers] = useState([])

    const [date, setDate] = useState(sourceDate);
    const [carretIndex, setCarretIndex] = useState(0)
    const [loginError, setLoginError] = useState(false)
    const [show, setShow] = useState(false)
    const [registerErrorText, setRegisterErrorText] = useState(null)




    const onChange = (event, selectedDate) => {
        setShow(false)
        if (event.type === 'dismissed') {
            Alert.alert(
            'picker was dismissed',
            undefined,
            [
                {
                text: 'great',
                },
            ],
            {cancelable: true},
        );
        return;
    }
    if (event.type === 'neutralButtonPressed') {
        setDate(new Date(0));
        } else {
        setDate(new Date(selectedDate));
    }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        }).start();
        const url = 'http://salut.test.na4u.ru/api/users';

        axios.get(url)
        .then(res => {
        setUsers(res['data'])})
        }, [])

        var dateFormat = date.getDate() + '.'
        if (date.getDate().toString().length == 1) dateFormat = '0' + dateFormat
        if ((date.getUTCMonth() + 1).toString().length == 1) dateFormat+= '0'
        dateFormat +=  date.getUTCMonth() + 1 + '.' + date.getUTCFullYear()
        console.log(dateFormat)

        function submitSignIn() {
            var flag = true
            for (let i = 0; i < users.length; i++){
                console.log(flag)
            }
            if (flag) {
                dispatch(setProfile({
                    'id': null,
                    'login': profile['login'],
                    'password': profile['password'],
                    'tag': null,
                    'avatar': null,
                    'liked': [],
                    'likedplaylists': [],
                    'likedroutes': [],
                    'date': dateFormat,
                    'city': null,
                    'algorithms': null
                }))
                navigation.navigate('Reg3')
                setRegisterErrorText(null)
            }
        }

    return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#3751AE'}}>
            <Image style={{opacity: 1, position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />

            <View style={{flexDirection: 'row', top: 40, width: '100%'}}>
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: '#FFF'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
                <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
            </View>

            <Text style={{color: '#FFF', fontSize: 40, fontWeight: '600', left: '5%', marginTop: 180}}>Дата рождения</Text>
            {show && <DateTimePicker
                style={{flex: 1,
                    paddingTop: 10,
                    width: 350, backgroundColor: '#444', zIndex: 2}}
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display={'default'}
                onChange={onChange}
                textColor={'#FFF'}
                accentColor={'#F00'}
                neutralButton={{label: 'meow'}}
                negativeButton={{label: 'Cancel', textColor: 'red'}}
                placeholderText='meooow'
            />}
            <TouchableOpacity onPress={() => setShow(true)}><View style={{backgroundColor: 'rgba(217, 217, 217, 0.45)', padding: 18, width: '90%', marginTop: 70, left: '5%', alignSelf: 'flex-start', borderRadius: 20}}><Text style={{color: '#FFF', fontSize: 18}}>{date.getDate().toString().length == 1 ? '0' : ''}{date.getDate()}.{(date.getUTCMonth() + 1).toString().length == 1 ? '0' : ''}{date.getUTCMonth() + 1}.{date.getUTCFullYear()}</Text></View></TouchableOpacity>
            {registerErrorText != null ? <Text style={{color: '#D00', fontSize: 18, left: '5%', fontWeight: '500', marginTop: 5}}>{registerErrorText}</Text> : <View></View>}

                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><View style={{ backgroundColor: '#333', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 30}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Назад</Text></View></TouchableOpacity>
                    <TouchableOpacity disabled={(date == null) ? true : false} onPress={() => submitSignIn()}><View style={{ backgroundColor: '#0014C9', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 30}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Дальше</Text></View></TouchableOpacity>
                </View>

        </View>
    )
}