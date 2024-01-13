// //import liraries

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   ToastAndroid,
//   SafeAreaView,
//   TouchableOpacity,
//   Text,
//   Image,
//   ImageBackground,
//   Dimensions,
//   StatusBar,
// } from 'react-native';
// import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
// import instance from '../Axiosinstance';
// import DeviceInfo from 'react-native-device-info';
// import {useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {TextInput, Button} from 'react-native-paper';
// import {useNetInfo} from '@react-native-community/netinfo';
// import {useIsFocused} from '@react-navigation/native';
// import {
//   setCreateByID,
//   setCurrentPassword,
//   setEmployeeCodetoolkit,
//   setEveryDeviceMacAddress,
//   setRoleID,
// } from '../store/reducers/userInfoSlice';

// // create a component
// const Login_N = () => {
//   const [EmployeeID, setEmployeeID] = useState('');
//   const [pass, setpass] = useState('');
//   const [UserID, setUserID] = useState('');
//   const deviceHeight = Dimensions.get('window').height;
//   const deviceWidth = Dimensions.get('window').width;
//   const netInfo = useNetInfo();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();

//   //QR Scanner
//   const [macaddress, setMacaddress] = useState('');

//   useEffect(() => {
//     if (isFocused) {
//       DeviceInfo.getUniqueId().then(uniqueId => {
//         if (uniqueId.length > 0) {
//           setMacaddress(uniqueId);
//         }
//       });
//     }
//   }, [isFocused]);

//   const No_internet = () => {
//     Toast.show({
//       text1: 'No internet connection',
//       text2: 'Please add internet connection',
//       type: 'error',
//       time: 5000,
//     });
//   };

//   const LoginHendelar = () => {
//     //Check for the Name TextInput

//     if (EmployeeID == '') {
//       alert('Please Enter Email');
//       return;
//     }
//     if (EmployeeID === 'null') {
//       alert('Please Enter Email');
//       return;
//     }
//     //Check for the Email TextInput
//     if (pass == '') {
//       alert('Please Enter Password');
//       return;
//     }

//     var data = {
//       userName: EmployeeID,
//       password: pass,
//     };

//     instance.post('/Login', JSON.stringify(data)).then(res => {
//       if (res.data == 'Login Successfully.') {
//         instance
//           .get('/Menu_Permission/EmployeDetalies/' + EmployeeID)
//           .then(response => {
//             var result = response.data[0];

//             dispatch(setEmployeeCodetoolkit(EmployeeID));
//             dispatch(setCurrentPassword(pass));
//             dispatch(setRoleID(result.RoleId));
//             dispatch(setCreateByID(result.ReqID));
//             dispatch(setEveryDeviceMacAddress(macaddress));

//             navigation.navigate('Dashboard');

//             setEmployeeID('');
//             setpass('');
//             ToastAndroid.showWithGravityAndOffset(
//               'Login Successfully',
//               ToastAndroid.LONG,
//               ToastAndroid.BOTTOM,
//               25,
//               50,
//             );
//           })
//           .catch(e => {
//             console.log(e);
//           });
//       } else {
//         alert(res.data);
//       }
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <StatusBar barStyle="light-content" backgroundColor="#2C76E3" />
//         <Image
//           source={require('../Img/app_header.png')}
//           style={{width: '100%', height: '35%'}}
//         />
//         <View
//           style={{
//             width: '100%',
//             height: 50,
//             alignItems: 'center',
//             marginTop: '10%',
//           }}>
//           <TextInput
//             label={<Text style={{color: '#000'}}>Employee Code</Text>}
//             style={{backgroundColor: '#F2F2F2', width: '80%'}}
//             left={<TextInput.Icon icon="email" />}
//             theme={{colors: {primary: '#F23E3E'}}}
//             value={EmployeeID}
//             defaultValue={EmployeeID}
//             onChangeText={text => setEmployeeID(text)}
//           />
//         </View>
//         <View
//           style={{
//             width: '100%',
//             height: 50,
//             alignItems: 'center',
//             marginTop: '3%',
//           }}>
//           <TextInput
//             mode="flat"
//             label={<Text style={{color: '#000'}}>Password</Text>}
//             secureTextEntry
//             style={{backgroundColor: '#F2F2F2', width: '80%'}}
//             left={<TextInput.Icon icon="eye" />}
//             theme={{colors: {primary: '#F23E3E'}}}
//             value={pass}
//             defaultValue={pass}
//             onChangeText={text => setpass(text)}
//           />
//         </View>
//         <View
//           style={{
//             width: '80%',
//             height: 50,
//             marginLeft: '10%',
//             marginTop: '5%',
//           }}>
//           <Button
//             mode="contained"
//             style={{backgroundColor: '#1566E0', borderRadius: 8}}
//             contentStyle={{height: 44, width: '100%'}}
//             labelStyle={{color: 'white', fontSize: 18}}
//             onPress={() => {
//               if (netInfo.isConnected) {
//                 LoginHendelar();
//                 //getFcmToken();
//                 //requestUserPermission();
//               } else {
//                 No_internet();
//               }
//             }}>
//             Login
//           </Button>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: '#2c3e50',
//   },
// });

// //make this component available to the app
// export default Login_N;
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

const Login_N = () => {
  const [checked, setChecked] = React.useState(false);
  const labelText = checked ? (
    <Text style={styles.labelText}>hi</Text>
  ) : (
    <Text style={styles.labelText}>Hello</Text>
  );

  return (
    <View style={styles.background}>
      <View style={styles.containeronline}>
        <Text style={[styles.text, styles.bottom]}>3</Text>
        <Text style={[styles.text, styles.top]}>7</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          status={checked ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked(!checked);
          }}
          color="red"
        />
        {labelText}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: 200,
    height: 50,
    padding: 0,
    margin: 0,
  },
  containeronline: {
    position: 'relative',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
  line: {
    width: 112,
    height: 47,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    transform: [{translateY: -20}, {translateX: 5}, {rotate: '27deg'}],
    position: 'absolute',
    zIndex: -1,
  },
  text: {
    position: 'absolute',
    fontSize: 12,
  },
  bottom: {
    bottom: 1,
    left: 1,
  },
  top: {
    top: 1,
    right: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: 'red',
    marginLeft: -20,
  },
});

export default Login_N;
