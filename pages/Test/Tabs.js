//import liraries

import * as React from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Login_N from '../Login/Login_N';
import Opareto_Qr_scanner from '../Login/Opareto_Qr_scanner';
//https://reactnavigation.org/docs/tab-view/

const LoginRoute = () => <Login_N />;

const OparetoQrscannerRoute = () => <Opareto_Qr_scanner />;

const renderScene = SceneMap({
  Login: LoginRoute,
  OparetoQrscanner: OparetoQrscannerRoute,
});

// create a component
const TabsPage = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'OparetoQrscanner', title: 'QR scanner'},
    {key: 'Login', title: 'Login'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default TabsPage;

// //import liraries

// import React, {useEffect, useState} from 'react';
// import {View, useWindowDimensions, StyleSheet, Text} from 'react-native';
// import MQTT from 'sp-react-native-mqtt';
// import {useIsFocused} from '@react-navigation/native';
// import {Button} from 'react-native-paper';
// // create a component
// const TabsPage = () => {
//   const isFocused = useIsFocused();
//   const [mqttdata, setMqttdata] = useState(0);
//   const [counter, setCounter] = useState(0);
//   const incrementCounter = () => {
//     setCounter(counter + 1);
//   };

//   const decrementCounter = () => {
//     if (counter !== 0) {
//       setCounter(counter - 1);
//     }
//   };
//   useEffect(() => {
//     if ((counter, isFocused)) {
//       /* create mqtt client */
//       MQTT.createClient({
//         uri: 'mqtt://172.16.16.4:1883',

//         //uri: 'mqtt://' + Url==1,
//         clientId: '123456666',
//       })
//         .then(function (client) {
//           client.on('closed', function () {
//             console.log('mqtt.event.closed');
//           });

//           client.on('error', function (msg) {
//             console.log('mqtt.event.error', msg);
//           });

//           client.on('message', function (msg) {
//             console.log('mqtt.event.message', msg);
//             var v = JSON.stringify(msg.data);
//             console.log('mqtt.event.message Test', v);
//             setMqttdata(v);
//           });

//           client.on('connect', function () {
//             // console.log('connected');
//             // client.subscribe('weight/scale/' + getsubscribeAddress, 0);
//             client.subscribe('MobilePhone/01', 0);
//             client.publish('MobilePhone/01', counter.toString(), 0, true);
//             mqttClient = client;
//           });

//           client.connect();
//         })
//         .catch(function (err) {
//           console.log(err);
//         });
//     }
//   }, [counter, isFocused]);
//   return (
//     <View>
//       <Text>MQTT Data No : {mqttdata}</Text>

//       <Button
//         style={{justifyContent: 'center', paddingTop: 5}}
//         labelStyle={{fontSize: 55, color: '#fff'}}
//         icon="minus-circle"
//         mode="text"
//         onPress={() => {
//           incrementCounter();
//         }}>
//         <Text style={{fontSize: 40, paddingTop: 25}}>increment</Text>
//       </Button>
//       <Button
//         style={{justifyContent: 'center', paddingTop: 5}}
//         labelStyle={{fontSize: 55, color: '#fff'}}
//         icon="minus-circle"
//         mode="text"
//         onPress={() => {
//           decrementCounter();
//         }}>
//         <Text style={{fontSize: 40, paddingTop: 25}}>Deincrement</Text>
//       </Button>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2c3e50',
//   },
// });

// //make this component available to the app
// export default TabsPage;
