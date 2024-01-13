//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, BackHandler} from 'react-native';
import Buttononpaper from 'react-native-button-paper';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
import instance from '../Axiosinstance';
import {useSelector} from 'react-redux';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
// create a component
const DeviceInfoPage = () => {
  const {getEmployeeCode, getPassword, getRoleID, EveryDeviceMacAddress} =
    useSelector(state => state.userInfo);
  const [deviceCount, setDeviceCount] = useState('');
  const [MacCount, setMacCount] = useState(0);
  const isFocused = useIsFocused();

  const [animateToNumber, setAnimateToNumber] = React.useState(7979);
  const increase = () => {
    setAnimateToNumber(animateToNumber + 1999);
  };

  const success = () => {
    Toast.show({
      type: 'success',
      text1: 'Device Address Save',
      text2: 'Device Address Save on Database',
    });
  };
  const errormsg = () => {
    Toast.show({
      type: 'error',
      text1: 'Device Address Not Save',
      text2: 'please contact with developer team',
    });
  };

  useEffect(() => {
    if (isFocused) {
      Device_Count();
      Mac_address_Count();

      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to Exit Apps?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);

  const Device_Count = () => {
    instance
      .get('Op_Production_Calc/Mobile_device_Count')
      .then(response => {
        var result = response.data[0];
        setDeviceCount(result.DeviceNo);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const Mac_address_Count = () => {
    console.log(EveryDeviceMacAddress);
    instance
      .get(`Op_Production_Calc/Mac_address_Count/${EveryDeviceMacAddress}`)
      .then(response => {
        var result = response.data[0];
        setMacCount(result.Countmac);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const device_Mca_Submithendel = () => {
    var data = {
      mac: EveryDeviceMacAddress,
      deviceNo: deviceCount,
      createBy: getEmployeeCode,
    };

    instance.post('/DeviceInfo', JSON.stringify(data)).then(res => {
      {
        res.data > 0 ? success() : errormsg();
        Device_Count();
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            width: '90%',
            height: '30%',
            borderWidth: 1,
            borderTopColor: 'green',
            backgroundColor: '#219EBC',
          }}>
          <Text
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Device Info
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            {MacCount != 0 ? (
              <Text
                style={{marginLeft: '10%', fontSize: 12, fontWeight: '600'}}>
                Allredy Exit Mac Address :{EveryDeviceMacAddress}
              </Text>
            ) : (
              <Text
                style={{marginLeft: '10%', fontSize: 20, fontWeight: '600'}}>
                Mac Address :{EveryDeviceMacAddress}
              </Text>
            )}

            <Text style={{marginLeft: '10%', fontSize: 20, fontWeight: '600'}}>
              {' '}
              Device Address : {deviceCount}
            </Text>
            <Toast />
            <View
              style={{
                alignSelf: 'center',
                width: '50%',
                marginTop: 10,
              }}>
              {MacCount == 0 ? (
                <Buttononpaper
                  title={'Submit'}
                  bgcolor={'#4285F4'}
                  borderRadius={8}
                  buttonicon={'check-circle'}
                  buttonmode={'text'}
                  labelcolor={'#fff'}
                  titleColor={'#fff'}
                  titleFronsize={15}
                  onPress={() => {
                    device_Mca_Submithendel();
                  }}
                />
              ) : (
                <Buttononpaper
                  title={'Allredy Exit Mac Address'}
                  bgcolor={'#D62828'}
                  borderRadius={8}
                  buttonicon={'check-circle'}
                  buttonmode={'text'}
                  labelcolor={'#fff'}
                  titleColor={'#fff'}
                  titleFronsize={10}
                  onPress={() => {
                    errormsg();
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default DeviceInfoPage;

// import React, {useState} from 'react';
// import {View, Text, Image} from 'react-native';
// import {TabView, SceneMap} from 'react-native-tab-view';
// import Operator_daily_info from '../Oparetor/Operator_daily_info';
// import Logout from '../Login/Logout';
// import Login from '../Login/Login';

// const WarningRoute = () => (
//   <View
//     style={{
//       // height: 100,
//       // borderBottomLeftRadius: -40,
//       // borderBottomRightRadius: -40,
//       //borderTopLeftRadius: 105,
//       //borderTopRightRadius: 250,
//       // backgroundColor: 'blue',
//       // width: 440,
//       // height: 100,

//       // Apply borderRadius to the Image
//       // borderTopLeftRadius: 10,
//       // borderTopRightRadius: 10,
//       // borderBottomLeftRadius: 25,
//       // borderBottomRightRadius: 305,

//       // justifyContent: 'center',
//       // alignItems: 'center',
//       // height: 100,
//       // width: '100%',
//       // borderBottomWidth: 120,
//       // borderBottomColor: 'blue',
//       // borderBottomRightRadius: 20,
//       // borderBottomLeftRadius: 800,

//       backgroundColor: 'blue',
//       borderBottomLeftRadius: 300,
//       borderBottomRightRadius: 300,
//       height: 120,
//     }}>
//     <Text style={{color: '#fff', textAlign: 'center', marginTop: 40}}>
//       Approved Tab
//     </Text>
//   </View>
// );

// const AlertRoute = () => (
//   <View
//     style={
//       {
//         // flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         // backgroundColor: '#FFFFFF',
//       }
//     }>
//     <Login />
//   </View>
// );
// const DangerRoute = () => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//     }}>
//     <Logout />
//   </View>
// );
// const CustomRoute = () => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//     }}>
//     <Operator_daily_info />
//   </View>
// );

// const initialRoutes = [
//   {key: 'Alert', title: 'Alert'},
//   {key: 'Warning', title: 'Warning'},
//   {key: 'Danger', title: 'Danger'},
//   {key: 'Custom', title: 'Custom'},
// ];

// const DeviceInfoPage = () => {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState(initialRoutes);

//   const renderScene = SceneMap({
//     Alert: AlertRoute,
//     Warning: WarningRoute,
//     Danger: DangerRoute,
//     Custom: CustomRoute,
//   });

//   return (
//     <TabView
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//     />
//   );
// };

// export default DeviceInfoPage;
