//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  setCurrentPassword,
  setEmployeeCodetoolkit,
  setRoleID,
  setEveryDeviceMacAddress,
} from '../store/reducers/userInfoSlice';
import {Avatar, List, Button} from 'react-native-paper';

// create a component
const Logout = () => {
  const {getEmployeeCode, getPassword, getRoleID} = useSelector(
    state => state.userInfo,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const RemoveAllData = async () => {
    dispatch(setEmployeeCodetoolkit(''));
    dispatch(setCurrentPassword(''));
    dispatch(setRoleID(''));
    dispatch(setEveryDeviceMacAddress(''));
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#2C76E3" />
      <View style={styles.container}>
        <Text>MyComponent</Text>
        <Button
          icon="lightbulb-on-outline"
          mode="text"
          style={{
            backgroundColor: '#1566E0',
            borderRadius: 8,
            marginTop: 50,
            marginLeft: 35,
            width: '100%',
          }}
          labelStyle={{color: '#fff'}}
          onPress={() => {
            RemoveAllData();
          }}>
          <Text> Logout </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Logout;
