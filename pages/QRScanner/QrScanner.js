import React, {useState} from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';

const QrScanner = () => {
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [cameraType, setcameraType] = useState('front');
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [tableData, setTableData] = useState([]);
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  const handleOnRead = e => {
    if (e.data) {
      setScannedData(e.data);
      setIsOpenCamera(false);
    }
  };

  return (
    <SafeAreaView>
      {/* <StatusBar backgroundColor={COLORS.primary} /> */}
      <StatusBar hidden />

      <View>
        {isOpenCamera && (
          <QRCodeScanner
            cameraStyle={{
              height: deviceHeight,
              width: deviceWidth,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            onRead={data => {
              handleOnRead(data);
              // GetBarCodeDataByLavelWise(data);
            }}
            flashMode={
              !flashlightEnabled
                ? RNCamera.Constants.FlashMode.off
                : RNCamera.Constants.FlashMode.torch
            }
            reactivate={true}
            reactivateTimeout={3000}
            showMarker={true}
            cameraType={cameraType}
            ref={node => {
              scanner = node;
            }}
          />
        )}

        <Text>{scannedData}</Text>

        <View style={{flexDirection: 'row', marginLeft: 5}}>
          <View style={{width: '30%'}}>
            <Button
              //icon="barcode-scan"
              mode="text"
              style={{
                backgroundColor: '#1566E0',
                borderRadius: 8,
                marginTop: 50,
                marginBottom: 10,

                width: '100%',
              }}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                {
                  console.log('hi' + cameraType);
                  cameraType == 'front'
                    ? setcameraType('back')
                    : setcameraType('front');
                }

                //setTableData([]);
              }}>
              {cameraType == 'front' ? <Text>Front </Text> : <Text>Back </Text>}
            </Button>
          </View>
          <View style={{width: '30%'}}>
            <Button
              icon="barcode-scan"
              mode="text"
              style={{
                backgroundColor: '#1566E0',
                borderRadius: 8,
                marginTop: 50,
                marginBottom: 10,
                marginLeft: 20,
                width: '100%',
              }}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                setIsOpenCamera(!isOpenCamera);
                //setTableData([]);
              }}>
              {!isOpenCamera ? (
                <Text>Scanner </Text>
              ) : (
                <Text>Scanner Off </Text>
              )}
            </Button>
          </View>

          <View style={{width: '25%'}}>
            {!isOpenCamera ? null : (
              <Button
                icon="lightbulb-on-outline"
                mode="text"
                style={{
                  backgroundColor: '#1566E0',
                  borderRadius: 8,
                  marginTop: 50,
                  marginLeft: 35,
                  width: '100%',
                }}
                labelStyle={{color: '#fff'}}
                onPress={() => {
                  setFlashlightEnabled(!flashlightEnabled);
                }}>
                {!flashlightEnabled ? (
                  <Text>Light Off </Text>
                ) : (
                  <Text>Light on </Text>
                )}
              </Button>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {height: 40, backgroundColor: '#4990E2'},
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  text: {textAlign: 'center', justifyContent: 'center'},
});

export default QrScanner;
