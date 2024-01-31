// import React, {useState, useEffect} from 'react';
// import {Text, View} from 'react-native';

// const SampleProblemList = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Increment the count state every second
//       setCount(prevCount => prevCount + 1);
//     }, 1000); // 1000 milliseconds = 1 second

//     // Clear the interval when the component is unmounted
//     return () => clearInterval(intervalId);
//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <View>
//       <Text>Count: {count}</Text>
//       {/* Your component JSX here */}
//     </View>
//   );
// };

// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Button} from 'react-native-paper';
// import {useIsFocused} from '@react-navigation/native';

// const SampleProblemList = ({onClose, dataArray, Data, onDataFromChild}) => {
//   const isFocused = useIsFocused();
//   const [count, setCount] = useState(0);

//   const formatTime = seconds => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes} : ${remainingSeconds} sec`;
//   };

//   const handleBackToMain = () => {
//     onClose(); // Call the onClose prop to close the modal
//     setCount(0);
//     onDataFromChild(count); // Pass count data to the parent component
//   };
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCount(prevCount => prevCount + 1);
//     }, 1000); // 1000 milliseconds = 1 second
//     return () => clearInterval(intervalId);
//   }, []); // Empty dependency array to run the effect only once

//   const flexD = 'column';
//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: flexD,
//         backgroundColor: '#fff',
//         width: '100%',
//       }}>
//       <View style={{flex: 1, width: '100%'}}>
//         <Text style={styles.heading}>{Data}</Text>
//         <Text
//           style={{
//             backgroundColor: 'red',
//             color: '#fff',
//             textAlign: 'center',
//             fontSize: 15,
//             fontWeight: 'bold',
//             width: '100%',
//           }}>
//           Down Time : {formatTime(count)}
//         </Text>
//       </View>
//       <View
//         style={{
//           flex: 6,
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: -40,
//         }}>
//         {dataArray.map((item, index) => (
//           <Text style={{fontSize: 18, fontWeight: 'bold'}} key={index}>
//             {item}
//           </Text>
//         ))}
//       </View>
//       <View style={{flex: 1}}>
//         <Button
//           mode="text"
//           onPress={() => {
//             handleBackToMain();
//           }}
//           style={{
//             backgroundColor: '#0061E0',
//             width: '90%',
//             borderRadius: 8,
//             height: 40,
//             alignSelf: 'center',
//           }}>
//           <Text
//             style={{
//               color: 'white',
//             }}>
//             Stop
//           </Text>
//         </Button>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // marginTop: 20,
//     // backgroundColor: '#F0F0F0',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     paddingTop: 20,
//   },
// });

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

const SampleProblemList = ({onClose, dataArray, Data, onDataFromChild}) => {
  const isFocused = useIsFocused();
  const [count, setCount] = useState(0);
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} : ${remainingSeconds} sec`;
  };
  const handleBackToMain = () => {
    onClose(); // Call the onClose prop to close the modal
    setCount(0);
    onDataFromChild(count); // Pass count data to the parent component
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000); // 1000 milliseconds = 1 second
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once
  const flexD = 'column';

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View
        style={{
          flex: 1,
          flexDirection: flexD,
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>{Data}</Text>
        </View>
        <View style={{flex: 6}}>
          <Text
            style={{
              backgroundColor: 'red',
              color: '#fff',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              width: '100%',
            }}>
            Down Time : {formatTime(count)}
          </Text>

          <View
            style={{
              flex: 6,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -40,
            }}>
            {dataArray.map((item, index) => (
              <Text style={{fontSize: 18, fontWeight: 'bold'}} key={index}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={{flex: 1}}>
          <Button
            mode="text"
            onPress={() => {
              handleBackToMain();
            }}
            style={{
              backgroundColor: '#0061E0',
              width: '98%',
              borderRadius: 8,
              height: 40,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Stop
            </Text>
          </Button>
          <View styles={{color: '#fff', display: 'none'}}>
            <Text styles={{color: '#fff', fontWeight: 'bold', display: 'none'}}>
              Employee Data : {dataArray}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 20,
    // backgroundColor: '#F0F0F0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 20,
    width: '100%',
    height: '100%',
  },
});
export default SampleProblemList;
