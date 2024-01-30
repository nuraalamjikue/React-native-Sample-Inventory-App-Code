//import liraries
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import {Button, Appbar, Menu, Card} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import MusicControl, {Command} from 'react-native-music-control';
import Sound from 'react-native-sound';
import instance from '../Axiosinstance';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {useIsFocused} from '@react-navigation/native';
import MQTT from 'sp-react-native-mqtt';
import Immersive from 'react-native-immersive';
import {Table, Row} from 'react-native-table-component';
import moment from 'moment';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const requirestop = require('../Img/stop.mp3');
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const Operator_daily_info = ({navigation, route}) => {
  const employeeID = route.params?.EmployeeCordNo;
  const getstyleNo = route.params?.SampleStyle;
  const getBuyerName = route.params?.BuyerName;
  const getLineName = route.params?.LineName;
  const getSampleQty = route.params?.SampleQty;
  const getEndDate = route.params?.EndDate;
  const getStartDate = route.params?.StartDate;
  const getSeasonName = route.params?.SeasonName;
  const getNumberOfSampleMan = route.params?.NumberOfSampleMan;
  const getcheckData = route.params?.CheckedIndex;
  const getSampleType = route.params?.SampleType;
  const getEmployeeName = route.params?.EmployeeName;

  //console.log('date: ' + NewDate);
  //const ColorsCode = route.params?.getColorName;
  // const DayendValue = route.params?.getDayendValue;

  const [lineName, setlineName] = useState('');
  const [totalProduction, setTotalProduction] = useState(0);
  const [headphone, setHeadphone] = useState(false);
  const [ipaddress, setIpaddress] = useState('');
  const [macaddress, setMacaddress] = useState('');
  const [ProductionStart, setProductionStarts] = useState(0);
  const [ProductionStartwithBundle, setProductionStartwithBundle] = useState(0);
  const [machineNo, setMachineNo] = useState('');
  const [styleNo, setStyleNo] = useState('');
  const [operation, setoperation] = useState('');
  const [mqttdata, setMqttdata] = useState('');
  const isFocused = useIsFocused();
  const [Dialog, setDialog] = useState(false);
  const [Dialogpart, setDialogpart] = useState(false);
  const [partComplete, setPartComplete] = useState(false);
  const [resetData, setResetData] = useState(0);
  const [ColorsCode, setColorsCode] = useState(0);
  const [totaluseTime, setTotaluseTime] = useState(0);
  const [Achived_Efficency, setAchived_Efficency] = useState(0);

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [tableData, setTableData] = useState(['']);
  const [lowestTotalPartEntry, setLowestTotalPartEntry] = useState(0);
  const [totalSMV, setTotalSMV] = useState(null);
  const [totalpartList, setTotalpartList] = useState(0);
  const [totalpartDone, setTotalpartDone] = useState(0);

  const deviceHeight = Dimensions.get('window').height;
  var textFontSize20 = deviceHeight * 0.022;
  var textFontSize15 = deviceHeight * 0.015;
  var headerFontside = deviceHeight * 0.018;
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  //   ----------------------per pcs Product Time---------------
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setRunning(running);
  };

  const handleStartStop = () => {
    setRunning(!running);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const [times, setTimes] = useState(0);
  const [runnings, setRunnings] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  // Function to start the stopwatch
  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTimes(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    console.log('hiding');
  };

  // -----------------------------------------------------------

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const _handleMore = () => {
    openMenu();
  };
  const setColorvalueRed = () => {
    setColorsCode(1);
    closeMenu();
  };
  const setColorvalueYellow = () => {
    setColorsCode(2);
    closeMenu();
  };
  const setColorvalueDefault = () => {
    setColorsCode(0);
    closeMenu();
  };
  const handleResetall = () => {
    setResetData(1);
    setDialog(true);
  };

  const handleDayend = () => {
    var data_new = {
      lineName: getLineName,
      styleName: getstyleNo,
      buyer: getBuyerName,
      season: getSeasonName,
      macAddress: macaddress,
      ipaddress: ipaddress,
      dayEndTime: new Date(),
      employeeId: employeeID,
    };

    instance.post('/DayEnd', JSON.stringify(data_new)).then(res => {
      {
        res.data > 0 ? soundStart() : errormsg();
      }
    });
    closeMenu();
    //console.log('Menu item pressed--1');
  };

  const handleMenuPress = () => {
    // Handle menu item press
    closeMenu();
    console.log('Menu item pressed');
  };
  const logouthendel = () => {
    navigation.navigate('TabsPage');
  };

  const handlechecksendData = rowData => {
    resetStopwatch();
    var data_new = {
      lineId: getLineName,
      styleName: getstyleNo,
      season: getSeasonName,
      buyer: getBuyerName,
      machineNo: 10,
      operation: 'zip join',
      partId: parseInt(rowData.PartId),
      useTime: parseInt(time),
      processSMV: parseFloat(rowData.SMV),
      production: parseInt(1),
      sampleType: getSampleType,
      garmentsType: 'Jkt',
      macAddress: macaddress,
      ipAddress: ipaddress,
      createby: employeeID,
      createDate: new Date(),
      productionType: parseInt(1),
    };

    instance
      .post('/ProductionEntryByOp', JSON.stringify(data_new))
      .then(res => {
        {
          if (parseInt(res.data) > 0) {
            soundStart();
            getTotalWorkingMin();
            getAllPartData();
            SubmitData();
          } else {
            errormsg();
          }
          // res.data > 0 ? soundStart() : errormsg();
        }
      });

    setDialogpart(false);
    startStopwatch();
  };

  const getTotalWorkingMin = () => {
    instance
      .get(
        `/Op_Production_Calc/getTotalWorkingMin/${getBuyerName}/${getstyleNo}/${getSeasonName}/${getLineName}/${employeeID}`,
      )
      .then(response => {
        console.log('data_____', JSON.stringify(response.data));
        var result = response.data[0];

        setTotaluseTime(result.workSMV);
        setAchived_Efficency(result.Achived_Efficence);

        if (result.Achived_Efficence > 0 && result.Achived_Efficence < 20) {
          setColorsCode(1);
        } else if (
          result.Achived_Efficence > 20 &&
          result.Achived_Efficence < 50
        ) {
          setColorsCode(3);
        } else {
          setColorsCode(3);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getAllPartData = () => {
    instance
      .get(
        `/Op_Production_Calc/getPartName/${getBuyerName}/${getstyleNo}/${getSeasonName}/${getLineName}/${employeeID}`,
      )
      .then(response => {
        console.log('data', JSON.stringify(response.data));
        setTableData(response.data);
        var result = response.data[0];

        setTotalpartDone(result.TotalPartDone);

        // Find the minimum TotalPartEntry value
        const minTotalPartEntry = Math.min(
          ...response.data.map(part => part.TotalPartEntry),
        );
        setLowestTotalPartEntry(minTotalPartEntry);

        const totalSMV = response.data.reduce((acc, item) => acc + item.SMV, 0);
        setTotalSMV(totalSMV.toFixed(2));

        // Filter items where TotalPartEntry > 0
        // const filteredData = response.data.filter(
        //   item => item.TotalPartEntry > 0,
        // );

        // // Calculate total SMV for the filtered items
        // const totalworkpart = filteredData.length;

        // setTotalpartDone(totalworkpart);

        const totalElements = response.data.length;
        setTotalpartList(totalElements);

        // const totalPartEntryData = response.data.reduce((acc, item) => {
        //   // Check if TotalPartEntry is greater than 0 before adding to the accumulator
        //   if (item.TotalPartEntry > 0 && item.TotalPartEntry < 1) {
        //     return acc + item.TotalPartEntry;
        //   } else if (item.TotalPartEntry > 1) {
        //     return 1 - item.TotalPartEntry;
        //   }
        //   return acc;
        // }, 0);

        // setTotalpartDone(totalPartEntryData);
        // console.log('TotalPartEntry:', totalPartEntryData);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getAllPartDataFristload = () => {
    instance
      .get(
        `/Op_Production_Calc/getPartName/${getBuyerName}/${getstyleNo}/${getSeasonName}/${getLineName}/${employeeID}`,
      )
      .then(response => {
        console.log('data', JSON.stringify(response.data));
        const totalElements = response.data.length;
        console.log('Total elements in the array:', totalElements);

        setTotalpartList(totalElements);

        const totalSMV = response.data.reduce((acc, item) => acc + item.SMV, 0);
        setTotalSMV(totalSMV.toFixed(2));
      })
      .catch(e => {
        console.log(e);
      });
  };
  const soundStartforheadphone = () => {
    const requireAudioheadphone = require('../Img/start.mp3');
    // Enable playback in silence mode

    Sound.setCategory('Playback');
    console.log('requireAudio' + requireAudioheadphone);
    const s = new Sound(requireAudioheadphone, e => {
      if (requireAudioheadphone > 0) {
        s.play(() => s.release());
        s.setSpeakerphoneOn(true);
      }
    });
  };

  useEffect(() => {
    getTotalWorkingMin();
    getAllPartDataFristload();
    if ((totalProduction, isFocused)) {
      MQTT.createClient({
        uri: 'mqtt://172.16.16.4:1883',
        clientId: '12345664',
      })
        .then(function (client) {
          client.on('closed', function () {
            //console.log('mqtt.event.closed');
          });

          client.on('error', function (msg) {
            //console.log('mqtt.event.error', msg);
          });

          client.on('message', function (msg) {
            // console.log('mqtt.event.message', msg);
            var v = JSON.stringify(msg.data);
            var numericValue = v.split('"')[1];
            soundStartforheadphone();
            // console.log('Numeric Value:', numericValue);
            setMqttdata(numericValue);
          });

          client.on('connect', function () {
            //console.log('connected');
            client.subscribe('/data', 0);
            // client.publish('/data', 'test', 0, false);
          });

          client.on('connect', function () {
            // console.log('connected');
            // client.subscribe('weight/scale/' + getsubscribeAddress, 0);
            client.subscribe('MobilePhone/01', 0);
            client.publish(
              'MobilePhone/01',
              totalProduction.toString(),
              0,
              false,
            );
            mqttClient = client;
          });

          client.connect();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [totalProduction, isFocused]);
  useEffect(() => {
    // Hide navigation bar
    Immersive.on();
    // Prevent back button from opening navigation
    const handleBackButton = () => true;
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      // Show navigation bar when the component is unmounted
      Immersive.off();
      // Remove the event listener when the component is unmounted
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    setStatusBarStyle(STYLES[ColorsCode]);
  }, [ColorsCode]);

  const STYLES = ['#016FC4', '#FF3B30', '#FEFF1A'];
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  const ProductionStartNow = () => {
    setProductionStarts(1);

    soundStart();

    handleStartStop();
  };

  const soundStart = () => {
    // var whoosh = new Sound(requireAudio, error => {
    //   whoosh.play(success => {
    //     if (success) {
    //       whoosh.setSpeakerphoneOn(true);
    //       whoosh.play(f => whoosh.release());
    //     } else {
    //       // console.log('playback failed due to audio decoding errors');
    //     }
    //   });
    // });
    const requireAudio = require('../Img/start.mp3');
    const s = new Sound(requireAudio, e => {
      console.log('requireAudio' + requireAudio);
      if (requireAudio > 0) {
        s.setSpeakerphoneOn(true);
        s.play(f => s.release());
        s.getCurrentTime(seconds => console.log('at ' + seconds));
      }
    });
  };

  const errormsg = () => {
    Toast.show({
      type: 'error',
      text1: 'Production Not Save',
      text2: 'please contact with developer team',
    });
  };
  const SubmitData = () => {
    Toast.show({
      type: 'success',
      text1: 'Part Data Successfully Added',
    });
  };

  const Op_Prouduction_Calc_Data = () => {
    instance
      .get(`/Op_Production_Calc/Op_Prouduction_Calc_Data/${employeeID}`)
      .then(response => {
        var result = response.data[0];
        setTotalProduction(result.totalProduction);
        setMachineNo(result.MachineNo);
        setStyleNo(result.StyleName);
        setoperation(result.Operation);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
      headerStyle: {
        backgroundColor:
          statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
      },
    });
  }, [navigation, statusBarStyle]);

  // ---------------------Time-----------------------------
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    Op_Prouduction_Calc_Data();
    DeviceInfo?.getIpAddress().then(ip => {
      setIpaddress(ip);
    });

    DeviceInfo.getUniqueId().then(uniqueId => {
      setMacaddress(uniqueId);
    });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const CurrentVersion = DeviceInfo.isHeadphonesConnected().then(enabled => {
    if (enabled) {
      setHeadphone(enabled);

      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);

      MusicControl.on('play', () => {
        console.log('play');
        soundStartforheadphone();
        setTotalProduction(parseInt(totalProduction) + 1);
        var data_new = {
          lineId: getLineName,
          styleName: getstyleNo,
          season: getSeasonName,
          buyer: getBuyerName,
          machineNo: 10,
          operation: 'zip join',
          useTime: parseInt(time),
          production: parseInt(totalProduction + 1),
          garmentsType: 'Jkt',
          macAddress: macaddress,
          ipAddress: ipaddress,
          createby: employeeID,
          createDate: new Date(),
        };

        instance
          .post('/ProductionEntryByOp', JSON.stringify(data_new))
          .then(res => {
            {
              res.data > 0 ? null : errormsg();
            }
            {
              time === 0 ? handleStartStop() : handleReset();
            }
          });

        // var whoosh = new Sound(requireAudio, error => {
        //   whoosh.play(success => {
        //     if (success) {
        //       whoosh.setSpeakerphoneOn(true);
        //       whoosh.play(f => whoosh.release());
        //     } else {
        //       // console.log('playback failed due to audio decoding errors');
        //     }
        //   });
        // });

        //     //incrementCountercounterBundle();
        //setBundleProduction(f => bundleproduction + 1);
      });

      MusicControl.on('pause', () => {
        console.log('pause');
        setBundleProduction(f => bundleproduction - 1);
        soundStart();
      });
    } else {
      setHeadphone(enabled);
    }
  });

  useEffect(() => {
    if (isFocused) {
      MusicControl.setNowPlaying({});

      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);

      // Listen for control events
      MusicControl.on('play', () => {
        console.log('hi');
      });

      MusicControl.on('pause', () => {
        // Handle pause event
      });

      // Check audio jack status when the component mounts
      const checkAudioJackStatus = async () => {
        const headphonesConnected = await DeviceInfo.isHeadphonesConnected();
        // Do something based on headphone connection status
      };

      checkAudioJackStatus();

      // Clear media controls and remove listeners when the component is unmounted
      // return () => {
      //   MusicControl.resetNowPlaying();
      //   MusicControl.resetBindings();
      // };
    }
  }, [isFocused]);

  //   // Set media controls
  //   MusicControl.setNowPlaying({
  //     //   title: 'Song Title',
  //     //   artist: 'Artist Name',
  //     //   album: 'Album Name',
  //     //   artwork: 'https://example.com/album-artwork.jpg',
  //   });

  //   MusicControl.enableControl('play', true);
  //   MusicControl.enableControl('pause', true);

  //   // Listen for control events
  //   MusicControl.on('play', () => {
  //     // Handle play event
  //     console.log('hi');
  //     incrementCountercounterBundle();
  //     setCounterBundle(f => counterBundle + 1);
  //   });

  //   MusicControl.on('pause', () => {
  //     // Handle pause event
  //   });

  //   // Check audio jack status when the component mounts
  //   const checkAudioJackStatus = async () => {
  //     const headphonesConnected = await DeviceInfo.isHeadphonesConnected();
  //     // Do something based on headphone connection status
  //   };

  //   checkAudioJackStatus();

  //   // Clear media controls and remove listeners when the component is unmounted
  //   return () => {
  //     MusicControl.resetNowPlaying();
  //     MusicControl.resetBindings();
  //   };
  // }, []);
  // //isHeadphonesConnected

  // -------------------per pcs incrementCounter------------------------------------

  const incrementCounter = () => {
    setTotalProduction(parseInt(totalProduction) + 1);

    var data_new = {
      lineId: getLineName,
      styleName: getstyleNo,
      season: getSeasonName,
      buyer: getBuyerName,
      machineNo: 10,
      operation: 'zip join',
      useTime: parseInt(time),
      production: parseInt(totalProduction + 1),
      garmentsType: 'Jkt',
      macAddress: macaddress,
      ipAddress: ipaddress,
      createby: employeeID,
      createDate: new Date(),
    };

    instance
      .post('/ProductionEntryByOp', JSON.stringify(data_new))
      .then(res => {
        {
          res.data > 0 ? soundStart() : errormsg();
        }
      });
  };

  const decrementCounter = () => {
    if (totalProduction !== 0) {
      setTotalProduction(parseInt(totalProduction) - 1);
      soundStart();
      setDialog(!Dialog);
    }
  };

  // ------------------- Reset all Data------------------------------------

  const ResetallCounter = () => {
    setTotalProduction(0);
    setDialog(false);
    setTime(0);
    setRunning(!running);
  };

  const tableHead = [
    <Text
      style={{
        color: '#fff',
        fontSize: textFontSize15,
        marginLeft: 5,
        fontWeight: 'bold',
      }}>
      Sl
    </Text>,
    <Text
      style={{
        color: '#fff',
        fontSize: textFontSize15,
        marginLeft: 5,
        fontWeight: 'bold',
      }}>
      Part Name
    </Text>,
    <Text style={{color: '#fff', fontSize: textFontSize15, fontWeight: 'bold'}}>
      SMV
    </Text>,

    <Text
      style={{
        color: '#fff',
        fontSize: textFontSize15,
        fontWeight: 'bold',
        marginLeft: -5,
      }}>
      Count
    </Text>,
    <Text
      style={{
        color: '#fff',
        fontSize: textFontSize15,
        fontWeight: 'bold',
        marginLeft: 10,
      }}>
      Action
    </Text>,
  ];

  const tableDataRows = tableData.map((rowData, index) => (
    <Row
      key={index}
      data={[
        <Text style={{color: '#fff', fontSize: textFontSize15, marginLeft: 5}}>
          {index + 1}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize15, marginLeft: 5}}>
          {rowData.PartName}
        </Text>,

        <Text
          style={{color: '#fff', fontSize: textFontSize20, fontWeight: 'bold'}}>
          {rowData.SMV}
        </Text>,

        <Text
          style={{color: '#fff', fontSize: textFontSize20, fontWeight: 'bold'}}>
          {rowData.TotalPartEntry}
        </Text>,

        getSampleQty !== rowData.TotalPartEntry ? (
          <Pressable
            style={{
              width: 50,
              height: 30,
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
                fontSize: textFontSize15,
                textAlign: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              Submit
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              width: 50,
              height: 30,
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: '#E9C46B',
              borderRadius: 5,
              elevation: 8,
            }}
            onPress={() => {
              setPartComplete(true);
              setDialogpart(false);
              console.log('hi');
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: textFontSize15,
                textAlign: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              Submit
            </Text>
          </Pressable>
        ),
      ]}
      widthArr={[20, 100, 80, 50, 100]}
      style={[
        styles.row,
        rowData.TotalPartEntry === 0 ? null : {backgroundColor: '#00999A'},
      ]}
      textStyle={styles.text}
    />
  ));

  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <SafeAreaView style={{backgroundColor: statusBarStyle, flex: 1}}>
      <>
        <Appbar.Header style={{backgroundColor: 'blue', elevation: 0}}>
          <Appbar.Content
            titleStyle={{color: 'white', fontSize: 18}}
            title="Operator Entry Panel"
          />
          <Button
            style={{color: '#fff'}}
            labelStyle={{color: '#fff', fontSize: 15, marginLeft: 15}}
            mode="text"
            icon="microsoft-xbox-controller-menu"
            onPress={() => _handleMore()}>
            Menu
          </Button>
        </Appbar.Header>

        <View style={{position: 'absolute', right: 0, top: 40}}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action onPress={openMenu} />}
            style={{
              position: 'absolute',
              right: 0,
              top: 40,
              backgroundColor: 'white',
              borderRadius: 8,
              elevation: 4,
              width: 150,
            }}>
            <Menu.Item onPress={logouthendel} title="Logout" />
            <Menu.Item onPress={setColorvalueRed} title="Red" />
            <Menu.Item onPress={setColorvalueYellow} title="Yellow" />
            <Menu.Item onPress={setColorvalueDefault} title="Default" />
            <Menu.Item onPress={handleMenuPress} title="Production Complete" />
            <Menu.Item onPress={handleDayend} title="Day End" />
            <Menu.Item onPress={handleResetall} title="Reset" />

            {/* Add more menu items as needed */}
          </Menu>
        </View>
      </>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View
          style={{
            height: 80,
            width: '32%',
            backgroundColor:
              statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
            borderRadius: 10,
            elevation: 15,
            marginLeft: 6,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: headerFontside,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Total Part
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
              zIndex: 1000,
            }}>
            {totalpartList}
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '32%',
            backgroundColor:
              statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
            marginLeft: 3,
            borderRadius: 10,
            elevation: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: headerFontside,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Todays Target Qty
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {getSampleQty}
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '32%',
            backgroundColor:
              statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
            marginLeft: 3,
            borderRadius: 10,
            elevation: 14,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: headerFontside,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Allocate SMV
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 35,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {totalSMV}
          </Text>
        </View>
      </View>
      {/* -----------------------------Achived area----------------------------------------------------- */}
      <View style={{flexDirection: 'row', margin: 5}}>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor:
              statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
            borderRadius: 10,
            elevation: 15,
            marginLeft: 3,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: headerFontside,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Achived Efficency
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: 5,
            }}>
            {Achived_Efficency == null ? <>0</> : Achived_Efficency}%
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '32%',
            backgroundColor:
              statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
            marginLeft: 3,
            borderRadius: 10,
            elevation: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: headerFontside,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Complete Work
          </Text>

          <View style={styles.backgroundStyle}>
            <View style={styles.containeronline}>
              <Text style={[styles.text, styles.bottom]}> {totalpartDone}</Text>
              <Text style={[styles.text, styles.top]}> {totalpartList}</Text>
              <View style={styles.line}></View>
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 35,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: -10,
                }}>
                {totalpartList}{' '}
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 45,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  /
                </Text>
              </Text>
            </View>
            <View style={{marginLeft: 5}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 35,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {totalpartDone}
              </Text>
            </View>
          </View> */}
        </View>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor:
              statusBarStyle === undefined ? '#016FC4' : statusBarStyle,
            marginLeft: 3,
            borderRadius: 10,
            elevation: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: headerFontside,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Work SMV
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 35,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {totaluseTime == null ? <>0</> : totaluseTime}
          </Text>
        </View>
      </View>
      {/* ------------------------------Line Info------------------------------------ */}
      <View style={{flexDirection: 'row', margin: 3}}>
        <View
          style={{
            height: 150,
            width: '50%',
            backgroundColor: '#EC681B',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {' '}
            Line Info
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {' '}
            Name :{getEmployeeName}
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {' '}
            ID NO : {employeeID}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {' '}
            Style : {getstyleNo}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {' '}
            Buyer : {getBuyerName}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {' '}
            Season : {getSeasonName}
          </Text>
        </View>
        <View
          style={{
            height: 150,
            width: '52%',
            backgroundColor: '#EC681B',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              marginTop: 20,
              fontWeight: 'bold',
            }}>
            {' '}
            Line : {getLineName}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {' '}
            End Date : {moment(getEndDate).format('DD-MMM-YYYY')}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {' '}
            Start Date : {moment(getStartDate).format('DD-MMM-YYYY')}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {' '}
            Sample Man : {getNumberOfSampleMan}
          </Text>
        </View>
      </View>
      {/* ------------------------------------Clock-------------------------------------------------------------     */}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 'bold',
          backgroundColor: '#5D2684',
          color: '#fff',
          marginTop: 5,
        }}>
        {formattedTime}
      </Text>

      {/* ---------------------Per Pcs Production------------------------- */}
      <View style={{flexDirection: 'row', marginTop: 3}}>
        <View style={{width: '50%'}}>
          <Text
            style={{
              backgroundColor: '#892E88',
              color: '#fff',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {' '}
            Per Pcs Production{' '}
          </Text>
        </View>
        <View style={{width: '50%', marginLeft: 10}}>
          <Text
            style={{
              backgroundColor: '#892E88',
              color: '#fff',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {' '}
            Bundle Production{' '}
          </Text>
        </View>
      </View>
      {/* ---------------------------------------------- */}
      {/* -----------------Use Time area----------------------------- */}
      <Toast />
      <View style={{flexDirection: 'row', marginTop: 3}}>
        <Text
          style={{
            backgroundColor: '#892E88',
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            width: '100%',
          }}>
          Use Time : {formatTime(time)}
        </Text>
      </View>
      {/* _____________________________________________________________________________________ */}
      <View style={{flexDirection: 'row', margin: 10, marginTop: 10}}>
        <View
          style={{
            height: 100,
            width: '100%',
            backgroundColor: '#003D75',
            borderRadius: 10,
            elevation: 15,
          }}>
          {totalProduction == 0 && ProductionStart == 0 ? (
            <Button
              style={{justifyContent: 'center', paddingTop: 15}}
              labelStyle={{fontSize: 55, color: '#fff'}}
              icon="plus-circle"
              mode="text"
              onPress={() => {
                ProductionStartNow();
              }}>
              <Text style={{fontSize: 39, paddingTop: 25}}>START</Text>
            </Button>
          ) : getcheckData === false ? (
            <View style={{flexDirection: 'column'}}>
              <View>
                <Button
                  style={{
                    justifyContent: 'center',
                    paddingTop: 15,
                    elevation: 10,
                  }}
                  labelStyle={{fontSize: 55, color: '#fff'}}
                  icon="plus-circle"
                  mode="text"
                  onPress={() => {
                    setDialogpart(true);
                    getAllPartData();
                    startStopwatch();
                  }}>
                  {lowestTotalPartEntry == 0 ? (
                    <Text style={{fontSize: 40, paddingTop: 25}}>GMT PART</Text>
                  ) : (
                    <Text style={{fontSize: 40, paddingTop: 25}}>
                      {lowestTotalPartEntry}
                    </Text>
                  )}
                </Button>
              </View>
              <View>
                {lowestTotalPartEntry == 0 ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Part is not complete yet
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Part complete
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <Button
              style={{justifyContent: 'center', paddingTop: 5, height: '90%'}}
              labelStyle={{fontSize: 55, color: '#fff'}}
              icon="plus-circle"
              mode="text"
              onPress={() => {
                incrementCounter();

                {
                  time == 0 ? handleStartStop() : handleReset();
                }
              }}>
              <Text style={{fontSize: 40, paddingTop: 25}}>
                {' '}
                {totalProduction}
              </Text>
            </Button>
          )}
        </View>
        {/* <View
          style={{
            height: 100,
            width: '20%',
            backgroundColor: '#E51B1F',
            borderRadius: 8,
            elevation: 15,
            marginLeft: 2,
          }}>
          <Button
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              marginLeft: 8,
            }}
            labelStyle={{fontSize: 50, color: '#fff', paddingTop: 20}}
            icon="minus-circle"
            mode="text"
            onPress={() => {
              setDialog(true);
              setResetData(0);
            }}></Button>
        </View>
        <View
          style={{
            height: 100,
            width: '20%',
            backgroundColor: '#E51B1F',
            borderRadius: 8,
            elevation: 15,
            marginLeft: 2,
          }}>
          <Button
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              marginLeft: 8,
            }}
            labelStyle={{fontSize: 45, color: '#fff'}}
            mode="text"
            onPress={() => {
              setResetData(1);
              setDialog(true);
            }}>
            <Text
              style={{
                fontSize: 13,
                paddingTop: 30,
                marginLeft: -4,
              }}>
              Reset
            </Text>
          </Button>
        </View> */}
      </View>

      {/* ------------------------------------------model-------------------------------------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={Dialog}
        onRequestClose={() => {
          setDialog(!Dialog);
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.centeredView2}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                {' '}
                Are You Sure ?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 5,
                marginTop: 40,
              }}>
              <View style={{width: '50%'}}>
                <Button
                  mode="text"
                  onPress={() => setDialog(!Dialog)}
                  style={{
                    backgroundColor: '#fff',
                    width: '98%',
                    borderRadius: 8,
                    height: 35,
                  }}>
                  Cancel
                </Button>
              </View>
              <View style={{width: '50%'}}>
                <Button
                  mode="text"
                  onPress={() => {
                    {
                      resetData === 1 ? ResetallCounter() : decrementCounter();
                      console.log('check again' + resetData);
                    }
                  }}
                  style={{
                    backgroundColor: '#fff',
                    width: '98%',
                    borderRadius: 8,
                    height: 35,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* ------------------------------------------model for Part-------------------------------------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={Dialogpart}
        onRequestClose={() => {
          setDialogpart(!Dialogpart);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.centeredView2}>
            <ScrollView horizontal={true}>
              <View style={{width: '100%'}}>
                <Table borderStyle={{borderColor: 'black'}}>
                  <Row
                    data={tableHead}
                    widthArr={[20, 100, 80, 50, 100]}
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
                  onPress={() => {
                    setDialogpart(!Dialogpart);
                    startStopwatch();
                  }}
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
      </Modal>

      {/* ------------------------------------------model for Part Complete-------------------------------------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={partComplete}
        onRequestClose={() => {
          setPartComplete(!partComplete);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.centeredView2}>
            <ScrollView horizontal={true}>
              <View style={{width: '100%', justifyContent: 'center'}}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Part Complete
                </Text>
              </View>
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                margin: 5,
                marginBottom: 25,
              }}>
              <View style={{width: '100%'}}>
                <Button
                  mode="text"
                  onPress={() => {
                    setPartComplete(!partComplete);
                    startStopwatch();
                  }}
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
    backgroundColor: '#2c3e50',
  },

  header: {height: 40, backgroundColor: '#108AF7'},
  row: {
    height: 50,
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#C1C0B9',
    flexDirection: 'row',
  },
  text: {textAlign: 'center', justifyContent: 'center'},
  headertext: {textAlign: 'center', justifyContent: 'center', color: '#fff'},
  centeredView2: {
    width: '98%',
    height: '98%',
    backgroundColor: '#123FAC',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    borderColor: '#FFFFFF',
    borderWidth: 4,
  },

  backgroundStyle: {
    // width: 80,
    // height: 50,
    // padding: 0,
    // margin: 0,
    width: 100,
    height: 50,
    overflow: 'hidden',
  },
  containeronline: {
    position: 'relative',
    height: '80%',
    width: '70%',
    top: 10,
    left: 19,
  },
  line: {
    width: 112,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    transform: [{translateY: -20}, {translateX: 5}, {rotate: '30deg'}],
    position: 'absolute',
    zIndex: -1,
  },
  text: {
    position: 'absolute',
    fontSize: 30, // Adjust the font size as needed
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottom: {
    // bottom: -5,
    // left: 10,
    position: 'absolute',
    bottom: -8,
    left: -2,
  },
  top: {
    position: 'absolute',
    top: -10,
    right: 5,
  },
});

//make this component available to the app
export default Operator_daily_info;
