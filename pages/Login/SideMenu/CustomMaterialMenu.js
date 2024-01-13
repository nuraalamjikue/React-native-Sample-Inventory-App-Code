// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import React, {useState, memo} from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
//import menu and menu item
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurrentPassword,
  setEmployeeCodetoolkit,
  setEveryDeviceMacAddress,
  setRoleID,
} from '../../store/reducers/userInfoSlice';

const CustomMaterialMenu = ({
  isIcon,
  menuText,
  textStyle,
  route,
  navigation,
}) => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const [headphone, setHeadphone] = useState(false);
  const dispatch = useDispatch();
  const {getEmployeeCode, getPassword, getRoleID} = useSelector(
    state => state.userInfo,
  );
  DeviceInfo.isHeadphonesConnected().then(enabled => {
    if (enabled) {
      setHeadphone(enabled);
    } else {
      setHeadphone(enabled);
    }
  });
  const logouthendel = () => {
    dispatch(setEmployeeCodetoolkit(''));
    dispatch(setCurrentPassword(''));
    dispatch(setRoleID(''));
    dispatch(setEveryDeviceMacAddress(''));
    navigation.navigate('TabsPage');
  };

  return (
    <View>
      <Menu
        visible={visible}
        anchor={
          isIcon ? (
            <TouchableOpacity onPress={showMenu}>
              <Image
                source={require('../SideMenu/View_more2.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 20,
                  tintColor: !headphone ? '#fff' : '#fff',
                }}
              />
            </TouchableOpacity>
          ) : (
            <Text onPress={showMenu} style={textStyle}>
              {menuText}
            </Text>
          )
        }
        onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            logouthendel();
            // navigation.navigate('Profile');
            hideMenu();
          }}>
          <Text>Logout</Text>
        </MenuItem>

        <MenuItem
          onPress={() => {
            var ColorName = {
              getColorName: 0,
            };
            navigation.navigate('Operator_daily_info', ColorName);
            hideMenu();
          }}>
          Red
        </MenuItem>
        <MenuItem
          onPress={() => {
            var ColorName = {
              getColorName: 1,
            };
            navigation.navigate('Operator_daily_info', ColorName);
            hideMenu();
          }}>
          Yellow
        </MenuItem>
        <MenuItem
          onPress={() => {
            var ColorName = {
              getColorName: 2,
            };
            navigation.navigate('Operator_daily_info', ColorName);
            hideMenu();
          }}>
          Default
        </MenuItem>
        <MenuItem
          onPress={() => {
            // onPress={() => {
            //   var ColorName = {
            //     getColorName: 2,
            //   };
            //  navigation.navigate('Operator_daily_info', ColorName);
            // hideMenu();
          }}>
          Production Complite
        </MenuItem>
        <MenuItem
          onPress={() => {
            var DayendValue = {
              getDayendValue: 1,
            };
            navigation.navigate('Operator_daily_info', DayendValue);
            hideMenu();
          }}>
          Day End
        </MenuItem>
      </Menu>
    </View>
  );
};

export default memo(CustomMaterialMenu);
