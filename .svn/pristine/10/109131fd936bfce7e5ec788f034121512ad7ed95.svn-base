// // Navigate Between Screens using React Navigation in React Native //
// // https://aboutreact.com/react-native-stack-navigation //

// import * as React from 'react';
// import {Button, View, Text} from 'react-native';

// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import FirstPage from './pages/FirstPage';
// import SecondPage from './pages/SecondPage';
// import ThirdPage from './pages/ThirdPage';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="FirstPage">
//         <Stack.Screen
//           name="FirstPage"
//           component={FirstPage}
//           options={{
//             title: 'First Page', //Set Header Title
//             headerStyle: {
//               backgroundColor: '#f4511e', //Set Header color
//             },
//             headerTintColor: '#fff', //Set Header text color
//             headerTitleStyle: {
//               fontWeight: 'bold', //Set Header text style
//             },
//           }}
//         />
//         <Stack.Screen
//           name="SecondPage"
//           component={SecondPage}
//           options={{
//             title: 'Second Page', //Set Header Title
//             headerStyle: {
//               backgroundColor: '#f4511e', //Set Header color
//             },
//             headerTintColor: '#fff', //Set Header text color
//             headerTitleStyle: {
//               fontWeight: 'bold', //Set Header text style
//             },
//           }}
//         />
//         <Stack.Screen
//           name="ThirdPage"
//           component={ThirdPage}
//           options={{
//             title: 'Third Page', //Set Header Title
//             headerStyle: {
//               backgroundColor: '#f4511e', //Set Header color
//             },
//             headerTintColor: '#fff', //Set Header text color
//             headerTitleStyle: {
//               fontWeight: 'bold', //Set Header text style
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';

import 'react-native-gesture-handler';
import {
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import MainStack from './src/navigators/mainStack3';
import MainStack from './pages/navigators/mainStack';

import store, {persistor} from './pages/store';
import appTheme from './pages/theme/Index';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

const theme = {
  ...MD3LightTheme,
  ...appTheme,
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

function App() {
  const nav = useRef(null);
  const [token, setToken] = useState<String | null | undefined>(undefined);

  useEffect(() => {
    const fun = async () => {
      let getToken = await AsyncStorage.getItem('token');
      setToken(getToken);
    };
    SplashScreen.hide();
    fun();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={nav}>
              <MainStack token={token} />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
