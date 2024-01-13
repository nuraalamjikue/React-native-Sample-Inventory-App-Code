//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

// create a component
const ChildPage = ({onClose, date}) => {
  const handleBackToMain = () => {
    onClose(); // Call the onClose prop to close the modal
  };
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Nura Alam {date}</Text>
      <Button
        mode="text"
        onPress={() => {
          // stopSound(); // Assuming stopSound is a function defined elsewhere
          handleBackToMain();
        }}
        style={styles.button}>
        secound Page
      </Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 20,
    // backgroundColor: '#F0F0F0',
  },
  button: {
    backgroundColor: '#3498db',
    width: '54%',
    borderRadius: 8,
    height: 35,
    marginBottom: 10,
    marginTop: 50,
  },
  dateText: {
    fontSize: 10,
    marginBottom: 20,
    color: '#000',
  },
});

//make this component available to the app
export default ChildPage;
