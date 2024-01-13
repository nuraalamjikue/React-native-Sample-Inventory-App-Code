import {StyleSheet} from 'react-native';

const buttonStyles = StyleSheet.create({
  //   buttonBlue: {
  //     backgroundColor: '#0391CE',
  //     padding: 10,
  //     borderRadius: 5,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     margin: 5,
  //   },
  //   buttonRed: {
  //     backgroundColor: '#FF5733',
  //     padding: 15,
  //     borderRadius: 8,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     margin: 5,
  //   },

  blueButton: (width = '50%', height = 0) => ({
    backgroundColor: '#0391CE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: width,
    height: height,
    flexDirection: 'row', // Allow items to be placed horizontally
    justifyContent: 'center', // Center items horizontally
  }),
  redButton: (width = 120, height = 50) => ({
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: width,
    height: height,
  }),
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    marginRight: 8, // Adjust as needed
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    iconSize: 6,
  },
});

export default buttonStyles;

// import React from 'react';
// import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// const ButtonStyle = ({onPress, width, height, text, bgColor}) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.button,
//         {width: width, height: height, backgroundColor: bgColor},
//       ]}>
//       <Text style={styles.buttonText}>{text}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default ButtonStyle;
