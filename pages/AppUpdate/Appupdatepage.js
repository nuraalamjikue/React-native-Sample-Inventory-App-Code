//import liraries
import React, {useState} from 'react';
import {Button, Avatar} from 'react-native-paper';

import {Alert, Modal, StyleSheet, Text, View, Linking} from 'react-native';

// create a component
const Appupdatepage = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const downloadApk = () => {
    const apkUrl = 'http://192.168.1.232:84/SampleApp/app-release.apk'; // Replace with your APK URL

    console.log('http://192.168.1.232:84/SampleApp/app-release.apk');

    Linking.openURL(apkUrl)
      .then(() => console.log('APK download started'))
      .catch(error => console.error('Error opening URL:', error));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Avatar.Icon
              size={50}
              icon="download-circle-outline"
              style={{
                marginTop: -80,
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: '#FFFFFF',
                borderWidth: 8,
                backgroundColor: '#DC3544',
              }}
            />

            <View style={{marginTop: 50, height: '100%', width: '100%'}}>
              <Text style={styles.modalText}>App Version Updated </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  marginTop: -15,
                }}>
                Please Download New Version App{' '}
              </Text>
              <Button
                style={{
                  backgroundColor: '#DC3544',
                  height: 50,
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: 8,
                  marginTop: 70,
                }}
                icon="download-circle"
                mode="contained"
                onPress={() => downloadApk()}>
                Download
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '50%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default Appupdatepage;
