//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const ResponsiveWiseOpDaily_info = () => {
  const flexD = 'column';
  return (
    <View style={{flex: 1, flexDirection: flexD, backgroundColor: '#fff'}}>
      <View
        style={{flex: 1.5, backgroundColor: '#DBDBDB', flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#042C71',
            height: '95%',
            width: '33%',
            margin: 3,
            borderRadius: 8,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 0.2,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>
              {' '}
              Target Efficency
            </Text>
          </View>
          <View
            style={{
              flex: 0.8,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 40, fontWeight: '800'}}>
              {' '}
              80%
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#0C6AB0',
            height: '95%',
            width: '33%',
            margin: 3,
            borderRadius: 8,
          }}>
          <View
            style={{
              flex: 0.2,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>
              {' '}
              Todays Target Pcs
            </Text>
          </View>
          <View
            style={{
              flex: 0.8,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 40, fontWeight: '800'}}>
              {' '}
              100
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#084387',
            height: '95%',
            width: '33%',
            margin: 3,
            borderRadius: 8,
          }}>
          <View
            style={{
              flex: 0.2,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>
              Defect Qty
            </Text>
          </View>
          <View
            style={{
              flex: 0.8,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 15,
            }}>
            <Text style={{color: '#fff', fontSize: 40, fontWeight: '800'}}>
              {' '}
              50
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{flex: 1.5, backgroundColor: '#DBDBDB', flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#042C71',
            height: '95%',
            width: '33%',
            margin: 3,
            borderRadius: 8,
          }}>
          <View
            style={{
              flex: 0.2,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>
              {' '}
              Target Efficency
            </Text>
          </View>
          <View
            style={{
              flex: 0.8,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 40, fontWeight: '800'}}>
              {' '}
              80%
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#0C6AB0',

            height: '95%',
            width: '33%',
            margin: 3,
            borderRadius: 8,
          }}>
          <View
            style={{
              flex: 0.2,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>
              {' '}
              Target Efficency
            </Text>
          </View>
          <View
            style={{
              flex: 0.8,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 40, fontWeight: '800'}}>
              {' '}
              80%
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#084387',
            height: '95%',
            width: '33%',
            margin: 3,
            borderRadius: 8,
          }}>
          <View
            style={{
              flex: 0.2,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>
              {' '}
              Target Efficency
            </Text>
          </View>
          <View
            style={{
              flex: 0.8,
              height: '95%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 40, fontWeight: '800'}}>
              {' '}
              80%
            </Text>
          </View>
        </View>
      </View>

      {/* ***********************************Body************************************************** */}
      <View style={{flex: 6, backgroundColor: '#D3D3D3'}}>
        <View
          style={{flex: 2, backgroundColor: '#DBDBDB', flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#042C71',
              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#0C6AB0',

              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
        </View>

        <View
          style={{
            flex: 0.8,
            backgroundColor: '#DBA837',
            height: '10%',
            width: '100%',
          }}></View>

        <View
          style={{flex: 0.8, backgroundColor: '#DBDBDB', flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#042C71',
              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#0C6AB0',

              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
        </View>

        <View
          style={{
            flex: 0.8,
            backgroundColor: '#DBA837',
            height: '10%',
            width: '100%',
          }}></View>
      </View>
      <View style={{flex: 4, backgroundColor: '#DBDBDB'}}>
        <View
          style={{flex: 1, backgroundColor: '#DBDBDB', flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#042C71',
              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#0C6AB0',

              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
        </View>

        <View
          style={{flex: 1, backgroundColor: '#DBDBDB', flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#042C71',
              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#0C6AB0',

              height: '95%',
              width: '50%',
              margin: 5,
              borderRadius: 8,
            }}></View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ResponsiveWiseOpDaily_info;
