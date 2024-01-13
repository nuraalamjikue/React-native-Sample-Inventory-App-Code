//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Button} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import MusicControl, {Command} from 'react-native-music-control';
import Sound from 'react-native-sound';

// create a component

const requireAudio = require('../Img/start.mp3');
const requirestop = require('../Img/stop.mp3');
const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
};

const Operator_daily_info = ({navigation, route}) => {
  const employeeID = route.params?.EmployeeCordNo;
  const [headphone, setHeadphone] = useState(false);
  // const mac = DeviceInfo.getIpAddress().then(ip => {
  //   // "92.168.32.44"
  // });

  const CurrentVersion = DeviceInfo.isHeadphonesConnected().then(enabled => {
    if (enabled) {
      setHeadphone(enabled);
      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);

      MusicControl.on('play', () => {
        console.log('play');

        const s = new Sound(requireAudio, e => {
          s.setSpeakerphoneOn(true);
          s.play(() => s.release());
          {
            time == 0 ? handleStartStop() : handleReset();
          }
        });

        //     //incrementCountercounterBundle();
        setCounterBundle(f => counterBundle + 1);
      });

      MusicControl.on('pause', () => {
        console.log('pause');
        setCounterBundle(f => counterBundle - 1);
        const s = new Sound(requirestop, e => {
          s.play(() => s.release());
        });
      });
    } else {
      setHeadphone(enabled);
    }
  });

  // useEffect(() => {
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
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => {
    setCounter(counter + 1);
    const s = new Sound(requireAudio, e => {
      s.setSpeakerphoneOn(true);
      s.play(() => s.release());
    });
  };

  const decrementCounter = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
      const s = new Sound(requireAudio, e => {
        s.setSpeakerphoneOn(true);
        s.play(() => s.release());
      });
    }
  };

  // ---------------------Time-----------------------------
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  //   ----------------------per pcs Product---------------
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
  const handleResets = () => {
    setRunning(false);
    setTime(0);
  };
  const handleStartStop = () => {
    setRunning(!running);
  };
  // -------------------Bundle incrementCounter------------------------------------
  const [counterBundle, setCounterBundle] = useState(0);
  const incrementCountercounterBundle = () => {
    setCounterBundle(counterBundle + 1);
  };

  const decrementCountercounterBundle = () => {
    if (counterBundle !== 0) {
      setCounterBundle(counterBundle - 1);
    }
  };

  //   ----------------Bundle Production---------------------
  const [timebundle, setTimebundle] = useState(0);
  const [runningbundle, setRunningbundle] = useState(false);

  useEffect(() => {
    let interval;

    if (runningbundle) {
      interval = setInterval(() => {
        setTimebundle(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(runningbundle);
    }

    return () => clearInterval(interval);
  }, [runningbundle]);

  const handleStartStopbundle = () => {
    setRunningbundle(!runningbundle);
  };

  const handleResetbundle = () => {
    setRunningbundle(false);
    setTimebundle(0);
    setRunningbundle(runningbundle);
  };
  const handleResetbundles = () => {
    setRunningbundle(false);
    setTimebundle(0);
  };

  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', margin: 5}}>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor: '#7421B1',
            borderRadius: 10,
            elevation: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Efficency
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            80%
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor: '#016FC4',
            marginLeft: 3,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Target
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            100
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor: '#EC681B',
            marginLeft: 3,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Defect
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            10
          </Text>
        </View>
      </View>
      {/* -----------------------------Achived area----------------------------------------------------- */}
      <View style={{flexDirection: 'row', margin: 5}}>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor: '#7421B1',
            borderRadius: 10,
            elevation: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Achived
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            100
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor: '#016FC4',
            marginLeft: 3,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Target
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            100
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: '33%',
            backgroundColor: '#EC681B',
            marginLeft: 3,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Achived
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            100
          </Text>
        </View>
      </View>
      {/* ------------------------------Line Info------------------------------------ */}
      <View style={{flexDirection: 'row', margin: 3}}>
        <View
          style={{
            height: 200,
            width: '49%',
            backgroundColor: '#EC681B',
            marginLeft: 3,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {' '}
            Line Info
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 10,
            }}>
            {' '}
            1. Name : Oparetor Name
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
            }}>
            {' '}
            2. Work Station No : 10
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
            }}>
            {' '}
            2. Work Station No : 10
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
            }}>
            {' '}
            2. Work Station No : 10
          </Text>
        </View>
        <View
          style={{
            height: 200,
            width: '49%',
            backgroundColor: '#EC681B',
            marginLeft: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../Img/GARMENT_BREAKDOWN.jpg')}
            style={{width: '95%', height: '95%'}}
          />
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
      <View style={{flexDirection: 'row', margin: 3}}>
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
        <View style={{width: '48%', marginLeft: 10}}>
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
      {/* ---------------------------------------------- */}
      <View style={{flexDirection: 'row', margin: 3}}>
        <View style={{width: '50%'}}>
          <Text
            style={{
              backgroundColor: '#892E88',
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {formatTime(time)}
          </Text>
        </View>
        <View style={{width: '48%', marginLeft: 10}}>
          <Text
            style={{
              backgroundColor: '#892E88',
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {formatTime(timebundle)}
          </Text>
        </View>
      </View>
      {/* _____________________________________________________________________________________ */}
      <View style={{flexDirection: 'row', margin: 10, marginTop: 5}}>
        <View
          style={{
            height: 80,
            width: '49%',
            backgroundColor: '#189938',
            borderRadius: 10,
            elevation: 15,
          }}>
          <Button
            style={{justifyContent: 'center', paddingTop: 5}}
            labelStyle={{fontSize: 55, color: '#fff'}}
            icon="plus-circle"
            mode="text"
            onPress={() => {
              incrementCounter();
              {
                time == 0 ? handleStartStop() : handleReset();
              }
            }}>
            <Text style={{fontSize: 40, paddingTop: 25}}> {counter}</Text>
          </Button>
        </View>

        <View
          style={{
            height: 80,
            width: '49%',
            backgroundColor: '#189938',
            borderRadius: 10,
            elevation: 15,
            marginLeft: 10,
          }}>
          <Button
            style={{justifyContent: 'center', paddingTop: 5}}
            labelStyle={{fontSize: 55, color: '#fff'}}
            icon="plus-circle"
            mode="text"
            onPress={() => {
              incrementCountercounterBundle();
              {
                timebundle == 0 ? handleStartStopbundle() : handleResetbundle();
              }
            }}>
            <Text style={{fontSize: 40, paddingTop: 25}}> {counterBundle}</Text>
          </Button>
        </View>
      </View>

      {/* -------------------------------------------------------------------------------------------------- */}

      <View style={{flexDirection: 'row', margin: 10, marginTop: 5}}>
        <View
          style={{
            height: 80,
            width: '49%',
            backgroundColor: '#E51B1F',
            borderRadius: 10,
            elevation: 15,
          }}>
          <Button
            style={{justifyContent: 'center', paddingTop: 5}}
            labelStyle={{fontSize: 55, color: '#fff'}}
            icon="minus-circle"
            mode="text"
            onPress={() => {
              decrementCounter();
              handleResets();
            }}>
            <Text style={{fontSize: 40, paddingTop: 25}}> {counter}</Text>
          </Button>
        </View>
        <View
          style={{
            height: 80,
            width: '49%',
            backgroundColor: '#E51B1F',
            borderRadius: 10,
            elevation: 15,
            marginLeft: 10,
          }}>
          <Button
            style={{justifyContent: 'center', paddingTop: 5}}
            labelStyle={{fontSize: 55, color: '#fff'}}
            icon="minus-circle"
            mode="text"
            onPress={() => {
              decrementCountercounterBundle();
              handleResetbundles();
            }}>
            <Text style={{fontSize: 40, paddingTop: 25}}> {counterBundle}</Text>
          </Button>
        </View>
      </View>
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
});

//make this component available to the app
export default Operator_daily_info;
