import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {useState} from 'react'

const Home = ({navigation}) => {

    const [cacheValue, setCacheValue] = useState(null)

    const handleLogOut = async () => {
        try {
          // Clear the username from async storage
          await AsyncStorage.removeItem('user');
          setCacheValue('');
        } catch (error) {
          console.error('Error clearing username from async storage:', error);
        }
      };

      const getData = async () => {
              try {
                    const storedUsername = await AsyncStorage.getItem('user');
                    console.log("username", storedUsername)
                    if (storedUsername) {
                      setCacheValue(storedUsername);
                    } else {
                      // No username found, navigate to Registration screen
                      navigation.navigate('Registration');
                    }
                  } catch (error) {
                    console.error('Error loading username from async storage:', error);
                  }
      }

      useEffect(() => {
        getData();
      }, [cacheValue])

    return(
        <View style={{backgroundColor: "#000000", height: "100%"}}>
            <Text>
                {cacheValue}
            </Text>
            <TouchableOpacity onPress={handleLogOut}>
                <View>
                    <Text>log out</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Home;