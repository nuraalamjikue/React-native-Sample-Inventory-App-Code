// CustomButton.js
import React from 'react';
import {Button} from 'react-native-paper';
import {Dimensions, StyleSheet, Text} from 'react-native';

const {width, height} = Dimensions.get('window');
const backgroundColor = '#0391CE';
const textFontSize = height * 0.018;
const IconFontSize = height * 0.032;

const CustomButton = ({
  onPress,
  LabelText,
  customWidth,
  customHeight,
  IconName,
  Bgcolor,
}) => {
  return (
    <Button
      mode="contained"
      icon={IconName}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: customWidth || width,
          height: customHeight || height,
          backgroundColor: Bgcolor || backgroundColor,
        },
      ]}
      labelStyle={styles.buttonText}>
      <Text style={{fontSize: textFontSize, color: '#fff'}}>{LabelText}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: IconFontSize,
    color: '#fff',
  },
});

export default CustomButton;
