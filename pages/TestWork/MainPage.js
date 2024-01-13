// MainPage.js
import React, {useState} from 'react';
import {View, Text, Button, Modal} from 'react-native';
import ChildPage from './ChildPage';

const MainPage = () => {
  const [soundInstance, setSoundInstance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    console.log('hit');
  };

  return (
    <View>
      <Text>Main Page Content</Text>
      <Button title="Open Modal" onPress={openModal} />

      <ChildPage onClose={closeModal} data={'jikue'} />

      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <ChildPage onClose={closeModal} />
      </Modal> */}
    </View>
  );
};

export default MainPage;
