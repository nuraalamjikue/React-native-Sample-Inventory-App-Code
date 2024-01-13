import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

const ChildPage = ({onClose, date}) => {
  const handleBackToMain = () => {
    onClose(); // Call the onClose prop to close the modal
  };

  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Main Page</Text>
      <Text style={styles.dateText}>Nura Alam {date}</Text>

      <Button
        mode="text"
        onPress={() => {
          // stopSound(); // Assuming stopSound is a function defined elsewhere
          handleBackToMain();
        }}
        style={styles.button}>
        OK
      </Button>
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
  },
  dateText: {
    fontSize: 16,
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

export default ChildPage;
