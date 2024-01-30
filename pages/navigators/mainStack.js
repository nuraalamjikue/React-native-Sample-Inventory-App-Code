import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Login from '../Login/Login';
import Sidebar from './Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import QrScanner from '../QRScanner/QrScanner';
import Logout from '../Login/Logout';
import Operator_daily_info from '../Oparetor/Operator_daily_info';
import CustomMaterialMenu from '../Login/SideMenu/CustomMaterialMenu';
import DeviceInfoPage from '../Device_Info/Device_Info';
import TabsPage from '../Test/Tabs';
import responsiveWiseOpDaily_info from '../Oparetor/ResponsiveWiseOpDaily_info';
import BackGroundForground from '../Oparetor/BackGroundForground';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
  Dimensions,
  Linking,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStack = ({token}) => {
  const {getEmployeeCode, getPassword, getRoleID, EveryDeviceMacAddress} =
    useSelector(state => state.userInfo);
  //console.log('token...... ' + token?.length);
  return (
    <Navigator
      initialRouteName={getEmployeeCode?.length > 3 ? 'Dashboard' : 'TabsPage'}
      screenOptions={({route, navigation}) => ({
        headerRight: () => (
          <CustomMaterialMenu
            menuText="Menu"
            textStyle={{color: 'white'}}
            navigation={navigation}
            route={route}
            isIcon={true}
          />
        ),
      })}>
      <Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login', //Set Header Title
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },

          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          tabBarStyle: {
            display: 'none',
          },

          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Screen
        name="Sidebar"
        component={Sidebar}
        options={{
          title: 'Third Page', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Screen
        name="QrScanner"
        component={QrScanner}
        options={{
          title: 'QrScanner', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logout', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Screen
        name="Operator_daily_info"
        component={Operator_daily_info}
        options={{
          title: 'Operator Entry Panel', //Set Header Title
          headerShown: false, // Hide the header
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          headerBackVisible: false,
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Screen
        name="DeviceInfoPage"
        component={DeviceInfoPage}
        options={{
          title: 'Device Info Page', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Screen
        name="responsiveWiseOpDaily_info"
        component={responsiveWiseOpDaily_info}
        options={{
          title: 'responsive WiseOp Daily info', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Screen
        name="TabsPage"
        component={TabsPage}
        options={{
          title: 'Login', //Set Header Title
          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          tabBarStyle: {
            display: 'none',
          },

          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Screen
        name="BackGroundForground"
        component={BackGroundForground}
        options={{
          title: 'BackGround Forground', //Set Header Title

          headerStyle: {
            backgroundColor: '#2C76E3', //Set Header color
          },
          tabBarStyle: {
            display: 'none',
          },

          navigationBar: {
            display: 'none',
          },

          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});