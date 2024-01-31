//import liraries

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {Button, Checkbox} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {Table, Row} from 'react-native-table-component';
import instance from '../Axiosinstance';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// create a component
const Opareto_Qr_scanner = () => {
  //QR Scanner
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [cameraType, setcameraType] = useState('front');
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  var textFontSize = deviceHeight * 0.012;
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [Dialog, setDialog] = useState(false);
  const navigation = useNavigation();
  const [tableData, setTableData] = useState(['']);
  const [checked, setChecked] = React.useState(false);

  const handleOnRead = e => {
    if (e.data) {
      setScannedData(e.data);
      setIsOpenCamera(false);
      setDialog(true);
      console.log('eee' + e.data);
      instance
        .get(`/Op_Production_Calc/Sample_Planning_Data/${e.data}`)
        .then(response => {
          // console.log('data scan', JSON.stringify(response.data));

          setTableData(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      // var viewDetails = {
      //   EmployeeCordNo: e.data,
      // };
      //navigation.navigate('Operator_daily_info', viewDetails);
    }
  };

  const handlechecksendData = rowData => {
    //console.log('rowData', rowData);

    //const checkedItem = tableData[checked];

    var viewDetails = {
      EmployeeName: rowData.Names,
      EmployeeCordNo: rowData.value,
      BuyerName: rowData.BuyerName,
      LineName: rowData.LineName,
      SampleStyle: rowData.Style,
      SampleQty: rowData.SampleQty,
      EndDate: rowData.EndDate,
      StartDate: rowData.StartDate,
      SeasonName: rowData.SeasonName,
      NumberOfSampleMan: rowData.NumberOfSampleMan,
      CheckedIndex: checked, // Add CheckedIndex to viewDetails
      SampleType: rowData.SampleType,
    };

    // Do something with the checked item or navigate with the updated viewDetails
    //console.log('Checked Item:', checked);
    //console.log('Updated viewDetails:', viewDetails);
    navigation.navigate('Operator_daily_info', viewDetails);

    setDialog(false);
  };

  //   console.log('rowData', rowData);

  //   var viewDetails = {
  //     EmployeeCordNo: rowData.value,
  //     BuyerName: rowData.BuyerName,
  //     LineName: rowData.LineName,
  //     SampleStyle: rowData.StyleNo,
  //     SampleQty: rowData.SampleQty,
  //     EndDate: rowData.EndDate,
  //     StartDate: rowData.StartDate,
  //     SeasonName: rowData.SeasonName,
  //     NumberOfSampleMan: rowData.NumberOfSampleMan,
  //   };
  //   //navigation.navigate('Operator_daily_info', viewDetails);

  //   setDialog(false);

  //   if (checkedIndex !== null) {
  //     // Do something with the checked item (e.g., navigate or perform an action)
  //     const checkedItem = tableData[checkedIndex];
  //     console.log('Checked Item:', checkedItem);

  //     setCheckedIndex(null); // Reset checked state after handling the item
  //   }

  // };
  const labelText = checked ? (
    <Text style={styles.labelTextpcs}>Pcs</Text>
  ) : (
    <Text style={styles.labelText}>Part</Text>
  );

  const tableHead = [
    <Text
      style={{
        color: '#fff',
        fontSize: textFontSize,
        marginLeft: 5,
        fontWeight: 'bold',
      }}>
      Sl
    </Text>,
    <Text
      style={{
        color: '#fff',
        fontSize: textFontSize,
        marginLeft: 5,
        fontWeight: 'bold',
      }}>
      Line
    </Text>,
    <Text style={{color: '#fff', fontSize: textFontSize, fontWeight: 'bold'}}>
      Buyer
    </Text>,
    <Text style={{color: '#fff', fontSize: textFontSize, fontWeight: 'bold'}}>
      Style
    </Text>,

    <View style={styles.checkboxContainer}>
      <Checkbox.Item
        status={checked ? 'unchecked' : 'checked'}
        onPress={() => {
          setChecked(!checked);
        }}
        color="red"
      />
      {labelText}
    </View>,
  ];

  const tableDataRows = tableData.map((rowData, index) => (
    <Row
      key={index}
      data={[
        <Text style={{color: '#fff', fontSize: textFontSize, marginLeft: 5}}>
          {index + 1}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize, marginLeft: 5}}>
          {rowData.LineName}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize}}>
          {rowData.BuyerName}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize}}>
          {rowData.Style}
        </Text>,
        ,
        <Pressable
          style={{
            width: '80%',
            height: '70%',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#E9C46B',
            borderRadius: 5,
            elevation: 8,
          }}
          onPress={() => {
            handlechecksendData(rowData);
            //addToList(item)
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: textFontSize,
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            select
          </Text>
        </Pressable>,
      ]}
      widthArr={[20, 50, 100, 100, 100]}
      style={[styles.row, index % 2 && {backgroundColor: '#10A1C5'}]}
      textStyle={styles.text}
    />
  ));

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={{flexDirection: 'row', marginLeft: 5, margin: 5}}>
        <View style={{width: '25%'}}>
          {!isOpenCamera ? null : (
            <Button
              icon={cameraType == 'front' ? 'camera-front' : 'backup-restore'}
              mode="text"
              style={{
                backgroundColor: '#1566E0',
                borderRadius: 8,
                marginTop: 50,
                marginLeft: 5,
                width: '100%',
              }}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                cameraType == 'front'
                  ? setcameraType('back')
                  : setcameraType('front');
              }}>
              {cameraType == 'front' ? (
                <Text style={{fontSize: 10}}>Front </Text>
              ) : (
                <Text style={{fontSize: 10}}>Back </Text>
              )}
            </Button>
          )}
        </View>

        <View style={{width: '48%'}}>
          {!isOpenCamera ? null : (
            <Button
              icon="qrcode-scan"
              mode="text"
              style={{
                backgroundColor: '#1566E0',
                borderRadius: 8,
                marginTop: 50,
                marginLeft: 10,
                width: '100%',
              }}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                setIsOpenCamera(!isOpenCamera);
              }}>
              <Text style={{fontSize: 10}}>QR Seanner Off </Text>
            </Button>
          )}
        </View>

        <View style={{width: '25%'}}>
          {!isOpenCamera ? null : (
            <Button
              icon={
                !flashlightEnabled
                  ? 'lightbulb-on-outline'
                  : 'lightbulb-off-outline'
              }
              mode="text"
              style={{
                backgroundColor: '#1566E0',
                borderRadius: 8,
                marginTop: 50,
                marginLeft: 15,
                width: '90%',
              }}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                setFlashlightEnabled(!flashlightEnabled);
              }}>
              {!flashlightEnabled ? (
                <Text style={{fontSize: 12}}>Light Off </Text>
              ) : (
                <Text style={{fontSize: 12}}>Light on </Text>
              )}
            </Button>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!isOpenCamera ? (
          <Button
            style={{
              backgroundColor: '#4285F4',
              borderRadius: 8,
              height: 100,
              width: 150,
            }}
            icon="qrcode-scan"
            mode="text"
            labelStyle={{
              color: '#fff',
              fontSize: 80,
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 10,
            }}
            onPress={() => {
              setIsOpenCamera(!isOpenCamera);
            }}></Button>
        ) : null}
      </View>

      {/* <View style={{width: '37%', alignSelf: 'center', marginTop: 20}}>
        <Button
          mode="contained"
          style={{backgroundColor: '#1566E0', borderRadius: 8}}
          contentStyle={{height: 44, width: '100%'}}
          labelStyle={{color: 'white', fontSize: 12}}
          onPress={() => {
            navigation.navigate('BackGroundForground');
          }}>
          Operator
        </Button>
      </View> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={Dialog}
        onRequestClose={() => {
          setDialog(!Dialog);
        }}>
        {tableData?.length > 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.centeredView2}>
              <ScrollView horizontal={true}>
                <View style={{width: '100%'}}>
                  <Table borderStyle={{borderColor: 'black'}}>
                    <Row
                      data={tableHead}
                      widthArr={[20, 50, 100, 100, 100]}
                      style={styles.header}
                      textStyle={styles.headertext}
                    />
                  </Table>
                  <ScrollView style={{height: 300}}>
                    <Table borderStyle={{borderColor: 'black'}}>
                      {tableDataRows}
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>

              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                }}>
                <View style={{width: '100%'}}>
                  <Button
                    mode="text"
                    onPress={() => setDialog(!Dialog)}
                    style={{
                      backgroundColor: '#fff',
                      width: '100%',
                      borderRadius: 8,
                      height: 35,
                    }}>
                    Cancel
                  </Button>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.centeredView3}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                }}>
                <View style={{width: '100%'}}>
                  <Button
                    mode="text"
                    onPress={() => setDialog(!Dialog)}
                    style={{
                      backgroundColor: '#D61487',
                      width: '100%',
                      borderRadius: 8,
                      height: 40,
                    }}>
                    <Text style={{color: '#fff'}}>
                      No Data Found Scan Again
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {height: 40, backgroundColor: '#108AF7'},
  row: {
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: '#C1C0B9',
    flexDirection: 'row',
  },
  text: {textAlign: 'center', justifyContent: 'center'},
  headertext: {textAlign: 'center', justifyContent: 'center', color: '#fff'},
  centeredView2: {
    width: '100%',
    height: '70%',
    backgroundColor: '#123FAC',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10%',
    marginTop: '30%',
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  centeredView3: {
    width: '100%',
    height: '60%',
    backgroundColor: '#11A2D7',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10%',
    marginTop: '55%',
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: -15,
  },
  labelText: {
    color: '#ffffff',
    marginLeft: -20,
    fontWeight: 'bold',
  },
  labelTextpcs: {
    color: '#fff',
    marginLeft: -20,
  },
});

//make this component available to the app
export default Opareto_Qr_scanner;
