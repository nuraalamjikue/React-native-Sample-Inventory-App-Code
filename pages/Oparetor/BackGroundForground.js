// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Text, AppState} from 'react-native';

// const BackGroundForground = () => {
//   const [aState, setAppState] = useState(AppState.currentState);
//   useEffect(() => {
//     const appStateListener = AppState.addEventListener(
//       'change',
//       nextAppState => {
//         console.log('Next AppState is: ', nextAppState);
//         setAppState(nextAppState);
//       },
//     );
//     return () => {
//       appStateListener?.remove();
//     };
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.txt}>
//         Current App State is: <Text style={styles.aState}>{aState}</Text>
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//   },
//   txt: {
//     color: '#d9d9d9',
//     fontSize: 18,
//   },
//   aState: {
//     color: '#fff',
//   },
// });
// // // export default BackGroundForground;

// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Text, AppState, Alert, Button} from 'react-native';
// import Modal from 'react-native-modal';
// import {useNavigation} from '@react-navigation/native';

// const BackGroundForground = () => {
//   const [appState, setAppState] = useState(AppState.currentState);
//   const [isExitModalVisible, setExitModalVisible] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const handleAppStateChange = nextAppState => {
//       if (nextAppState === 'background') {
//         setAppState(nextAppState);
//         //  navigation.navigate('Operator_daily_info');
//         // Do something to keep the app in the foreground, e.g., show a modal
//         console.log('Preventing app from going to background', AppState);
//         // setExitModalVisible(true);
//       }
//       setAppState(nextAppState);
//     };

//     const appStateListener = AppState.addEventListener(
//       'change',
//       handleAppStateChange,
//     );

//     return () => {
//       appStateListener.remove(); // Correct way to remove the event listener
//     };
//   }, [appState]); // Add appState as a dependency to useEffect

//   const handleConfirmExit = () => {
//     console.log('Exiting the app');
//   };

//   const handleCancelExit = () => {
//     // User canceled exit, hide the modal
//     setExitModalVisible(false);
//   };

//   // useEffect(() => {
//   //   const handleAppStateChange = nextAppState => {
//   //     if (appState === 'active' && nextAppState === 'background') {
//   //       <Opareto_Qr_scanner />;
//   //       //  alert('Alert Title', 'My Alert Msg');
//   //       // The app is transitioning from the active state to the background state
//   //       // You can implement your logic here to keep the app in the foreground
//   //       console.log('Preventing app from going to background');
//   //       // For example, you can open a modal, show an alert, or perform any action to keep the app in the foreground
//   //       // In this example, we are showing an alert
//   //       setExitModalVisible(true);
//   //     }

//   //     setAppState(nextAppState);
//   //   };

//   //   AppState.addEventListener('change', handleAppStateChange);

//   //   return () => {
//   //     appStateListener?.remove();
//   //   };
//   // }, []);

//   // const handleConfirmExit = () => {
//   //   // Implement any additional logic if needed before exiting
//   //   // For example, saving user data, etc.
//   //   // Then exit the app
//   //   // Note: This is a basic example; you might want to enhance it.
//   //   console.log('Exiting the app');
//   //   // Uncomment the next line to actually exit the app (not recommended on all platforms)
//   //   // android.os.Process.killProcess(android.os.Process.myPid());
//   // };

//   // const handleCancelExit = () => {
//   //   // User canceled exit, hide the modal
//   //   setExitModalVisible(false);
//   // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.txt}>
//         Current App State is: <Text style={styles.aState}>{appState}</Text>
//       </Text>

//       <Modal isVisible={isExitModalVisible}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>Do you want to exit?</Text>
//           <View style={styles.modalButtons}>
//             <Button title="Yes" onPress={handleConfirmExit} />
//             <Button title="No" onPress={handleCancelExit} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//   },
//   txt: {
//     color: '#d9d9d9',
//     fontSize: 18,
//   },
//   aState: {
//     color: '#fff',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default BackGroundForground;

// import React, {useEffect, useState} from 'react';
// import {View, Text, AppState, Alert} from 'react-native';

// const BackGroundForground = () => {
//   const [appState, setAppState] = useState(AppState.currentState);

//   useEffect(() => {
//     const handleAppStateChange = nextAppState => {
//       if (appState === 'active' && nextAppState === 'background') {
//         Alert.alert(
//           'Warning',
//           'Please use the app or dismiss this alert to continue.',
//           [
//             {
//               text: 'Dismiss',
//               onPress: () => {
//                 // User dismissed the alert, do nothing
//               },
//             },
//           ],
//           {cancelable: false},
//         );
//       }

//       setAppState(nextAppState);
//     };

//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, [appState]);

//   return (
//     <View>
//       {/* Your app content goes here */}
//       <Text>App Content</Text>
//     </View>
//   );
// };

// export default BackGroundForground;

// // React Native AppState – Active | Background | Inactive
// // https://aboutreact.com/react-native-appstate/
// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   AppState,
//   Text,
//   Alert,
//   Modal,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import {IconButton} from 'react-native-paper';
// import buttonStyles from '../Button/ButtonStyle';
// import CustomButton from '../Button/CustomButton';
// import CustomDropdown from '../Button/CustomDropdown';
// const BackGroundForground = () => {
//   // const [appState, setAppState] = useState(AppState.currentState);
//   // const [isModalVisible, setModalVisible] = useState(false);

//   // useEffect(() => {
//   //   AppState.addEventListener('change', handleAppStateChange);
//   //   return () => {
//   //     AppState.removeEventListener('change', handleAppStateChange);
//   //   };
//   // }, []);

//   // const handleAppStateChange = nextAppState => {
//   //   console.log('App State: ' + nextAppState);

//   //   if (nextAppState !== 'background') {
//   //     console.warn('Background');
//   //     // Show the modal when the app goes to the background
//   //     setModalVisible(true);
//   //   }

//   //   if (appState !== nextAppState) {
//   //     if (appState.match(/inactive|background/) && nextAppState === 'active') {
//   //       console.log('App State: ' + 'App has come to the foreground!');
//   //       Alert.alert('App State', 'App has come to the foreground!');
//   //     }
//   //     setAppState(nextAppState);
//   //   }
//   // };

//   // const closeModal = () => {
//   //   // Close the modal
//   //   setModalVisible(false);
//   // };
//   const handleButtonPress = () => {
//     // Handle button press
//     console.log('Button Pressed!');
//   };

//   const [companyValue, setCompanyValue] = useState(null);
//   const [companyValue1, setCompanyValue1] = useState(null);

//   const handleCompanyChange = item => {
//     setCompanyValue(item.value);
//     // Handle dropdown value change logic here
//   };
//   const handleCompanyChange1 = item => {
//     setCompanyValue1(item.value);
//     // Handle dropdown value change logic here
//   };

//   const companyOptions = [
//     {label: 'Company 1', value: '1'},
//     {label: 'Company 2', value: '2'},
//     {label: 'Company 2', value: '3'},
//     {label: 'Company 2', value: '4'},
//     {label: 'Company 2', value: '5'},
//     {label: 'Company 2', value: '6'},
//     {label: 'Company 2', value: '7'},
//     {label: 'Company 2', value: '8'},
//     // Add more options as needed
//   ];

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <View style={{flexDirection: 'row', flex: 1}}>
//           <View style={{width: '50%'}}>
//             <CustomDropdown
//               data={companyOptions}
//               label="Select Company"
//               placeholder="Search for a company"
//               onSelect={handleCompanyChange}
//             />
//           </View>
//           <View style={{width: '50%'}}>
//             <CustomDropdown
//               data={companyOptions}
//               label="Select Company"
//               placeholder="Search for a company"
//               onSelect={handleCompanyChange1}
//             />
//           </View>
//         </View>

//         <Text style={styles.header}>
//           Application Status
//           {'\n'}
//           Active | Background | Inactive
//         </Text>
//         <Text style={styles.textStyle}>Current state is: </Text>

//         <TouchableOpacity
//           style={buttonStyles.blueButton('40%', 40)}
//           onPress={() => console.log('Blue button pressed')}>
//           <IconButton icon="camera" color="white" style={buttonStyles.icon} />
//           <Text style={buttonStyles.buttonText}>Blue Button</Text>
//         </TouchableOpacity>

//         <CustomButton
//           onPress={handleButtonPress}
//           LabelText="SUBMIT"
//           customWidth={'30%'} // Specify custom width if needed
//           customHeight={40} // Specify custom height if needed
//           IconName="delete-circle" // Specify icon name if needed
//           Bgcolor="#C9302C" // Specify background color if needed
//         />
//         <Text style={styles.textStyle}>Current state is:{companyValue} </Text>
//         <Text style={styles.textStyle}>Current state is:{companyValue1} </Text>

//         {/* Modal */}
//         {/* <Modal
//           animationType="slide"
//           transparent={true}
//           visible={isModalVisible}
//           onRequestClose={() => {
//             setModalVisible(!isModalVisible);
//           }}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>App is in the background!</Text>
//             <Button title="Close Modal" onPress={closeModal} />
//           </View>
//         </Modal> */}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: 'black',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   textStyle: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'black',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'black',
//   },
// });
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import ChildPage from '../TestWork/ChildPage';
import ChildPage2 from '../TestWork/ChildPage2';

const BackGroundForground = () => {
  const [soundInstance, setSoundInstance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    console.log('Data Save Successfully');
  };
  const HitSecoundPage = () => {
    console.log('Data Save Successfully on SecoundPage');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <Text>Main Page Content</Text>
      <Button title="Open Modal" onPress={openModal} /> */}
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <ChildPage onClose={closeModal} date={'jikue'} />
          </View>
          <View style={{width: '45%'}}>
            <ChildPage2 onClose={HitSecoundPage} date={'SecoundPage'} />
          </View>
        </View>

        {/* Corrected prop name 'date' instead of 'data' */}
        {/* <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <ChildPage onClose={closeModal} />
      </Modal> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#F0F0F0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 50,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#3498db',
    width: '54%',
    borderRadius: 8,
    height: 35,
    marginBottom: 10,
    marginTop: 50,
  },
});

export default BackGroundForground;
