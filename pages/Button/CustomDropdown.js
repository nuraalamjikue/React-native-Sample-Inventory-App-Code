// // CustomDropdown.js
// import React from 'react';
// import {Dropdown} from 'react-native-element-dropdown';
// import {StyleSheet} from 'react-native';

// const CustomDropdown = ({
//   data,
//   value,
//   placeholder,
//   searchPlaceholder,
//   onChange,
// }) => {
//   return (
//     // <Dropdown
//     //   style={styles.dropdown}
//     //   placeholderStyle={styles.placeholderStyle}
//     //   selectedTextStyle={styles.selectedTextStyle}
//     //   inputSearchStyle={styles.inputSearchStyle}
//     //   iconStyle={styles.iconStyle}
//     //   data={data}
//     //   search
//     //   maxHeight={300}
//     //   labelField="label"
//     //   valueField="value"
//     //   placeholder={placeholder}
//     //   searchPlaceholder={searchPlaceholder}
//     //   value={value}
//     //   onChange={onChange}
//     // />

//     <Dropdown
//       style={styles.dropdown}
//       placeholderStyle={styles.placeholderStyle}
//       selectedTextStyle={styles.selectedTextStyle}
//       inputSearchStyle={styles.inputSearchStyle}
//       iconStyle={styles.iconStyle}
//       data={data}
//       search
//       maxHeight={300}
//       labelField="label"
//       valueField="value"
//       placeholder={placeholder}
//       searchPlaceholder={searchPlaceholder}
//       value={value}
//       onChange={onChange}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     borderBottomColor: 'gray',
//     borderBottomWidth: 0.5,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });

// export default CustomDropdown;

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({data, label, placeholder, onSelect}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>{label}</Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onSelect && onSelect(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 15,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 9,
  },
  placeholderStyle: {
    fontSize: 10,
  },
  selectedTextStyle: {
    fontSize: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 10,
  },
});

export default CustomDropdown;
