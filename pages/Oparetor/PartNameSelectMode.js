//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {useIsFocused} from '@react-navigation/native';
import {Button, Checkbox} from 'react-native-paper';
import instance from '../Axiosinstance';

// create a component
const PartNameSelectMode = () => {
  const [tableData, setTableData] = useState(['']);
  const isFocused = useIsFocused();
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  var textFontSize = deviceHeight * 0.012;
  const [checkedIndex, setCheckedIndex] = React.useState('');
  const [Dialog, setDialog] = useState(false);

  useEffect(() => {
    if (isFocused) {
      instance
        .get(`/Op_Production_Calc/getPartName/COLUMBIA/WL9001/FALL-24/2S-03`)
        .then(response => {
          console.log('data', JSON.stringify(response.data));

          setTableData(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [isFocused]);

  // const handlechecksendData = rowData => {
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
    <Text style={{color: '#fff', fontSize: textFontSize, fontWeight: 'bold'}}>
      IsPart
    </Text>,
    <Text style={{color: '#fff', fontSize: textFontSize, fontWeight: 'bold'}}>
      Action
    </Text>,
  ];

  const tableDataRows = tableData.map((rowData, index) => (
    <Row
      key={index}
      data={[
        <Text style={{color: '#fff', fontSize: textFontSize, marginLeft: 5}}>
          {index + 1}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize, marginLeft: 5}}>
          {rowData.PartName}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize}}>
          {rowData.PartName}
        </Text>,
        <Text style={{color: '#fff', fontSize: textFontSize}}>
          {rowData.PartName}
        </Text>,
        // <Checkbox
        //   status={checked ? 'checked' : 'unchecked'}
        //   onPress={() => {
        //     setChecked(!checked);
        //   }}
        // />,

        <Checkbox
          status={checkedIndex === index ? 'checked' : 'unchecked'}
          mode="android"
          color="#CC2630"
          onPress={() => {
            // setCheckedIndex(index);
          }}
        />,
        <Text
          style={{
            color: '#000',
            fontSize: textFontSize,
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          select
        </Text>,
        // <Pressable
        //   style={{
        //     width: '85%',
        //     height: '70%',
        //     justifyContent: 'center',
        //     alignContent: 'center',
        //     backgroundColor: '#E9C46B',
        //     borderRadius: 5,
        //     elevation: 8,
        //   }}
        //   onPress={() => {
        //     // handlechecksendData(rowData);
        //     //addToList(item)
        //   }}>
        //   <Text
        //     style={{
        //       color: '#000',
        //       fontSize: textFontSize,
        //       textAlign: 'center',
        //       justifyContent: 'center',
        //       alignContent: 'center',
        //     }}>
        //     select
        //   </Text>
        // </Pressable>,
      ]}
      widthArr={[20, 50, 80, 80, 80, 50]}
      style={[styles.row, index % 2 && {backgroundColor: '#10A1C5'}]}
      textStyle={styles.text}
    />
  ));

  return (
    <View style={styles.container}>
      <Text>MyComponent </Text>

      {tableData?.length > 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.centeredView2}>
            <ScrollView horizontal={true}>
              <View style={{width: '100%'}}>
                <Table borderStyle={{borderColor: 'black'}}>
                  <Row
                    data={tableHead}
                    widthArr={[20, 50, 80, 80, 80, 50]}
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
      ) : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default PartNameSelectMode;
