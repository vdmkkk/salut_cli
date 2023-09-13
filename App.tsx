/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

import { Provider } from 'react-redux'
import { Store } from './redux/store';


import Home from './screens/Home';
import Registration from './screens/Registration';

import Reg1 from './regScreens/Reg1';
import Reg2 from './regScreens/Reg2';
import Reg3 from './regScreens/Reg3';
import Reg4 from './regScreens/Reg4';
import Reg5 from './regScreens/Reg5';


const Stack = createStackNavigator();


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#333" : "999",
  };  

  // return (
  //   <View style={backgroundStyle}>
  //     <Text>meow</Text>
  //     <TouchableOpacity onPress={() => storeData("kek")}>
  //       <View style={{width: 50, height: 50, backgroundColor: '#F00', marginTop: 300}}>
  //         <Text> задать </Text>
  //       </View>
  //     </TouchableOpacity>
  //     <TouchableOpacity onPress={() => getData()}>
  //       <View style={{width: 50, height: 50, backgroundColor: '#F00', marginLeft: 100}}>
  //         <Text> прочитать </Text>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
  <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, gestureDirection: 'horizontal', gestureEnabled: true }}>
        <Stack.Screen
            name="Home"
            component={Home}
          />
        <Stack.Screen
            name="Registration"
            component={Registration}
          />
          <Stack.Screen
                        name='Reg1'
                        component={Reg1}
                        options={{
                          gestureEnabled: true,
                          gestureDirection: 'horizontal',
                          animationEnabled: true,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                      />
                      <Stack.Screen
                        name='Reg2'
                        component={Reg2}
                        options={{
                          gestureEnabled: true,
                          gestureDirection: 'horizontal',
                          animationEnabled: true,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                      />
                      <Stack.Screen
                        name='Reg3'
                        component={Reg3}
                        options={{
                          gestureEnabled: true,
                          gestureDirection: 'horizontal',
                          animationEnabled: true,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                      />
                      <Stack.Screen
                        name='Reg4'
                        component={Reg4}
                        options={{
                          gestureEnabled: true,
                          gestureDirection: 'horizontal',
                          animationEnabled: true,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                      />
                      <Stack.Screen
                        name='Reg5'
                        component={Reg5}
                        options={{
                          gestureEnabled: true,
                          gestureDirection: 'horizontal',
                          animationEnabled: true,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                      />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;
