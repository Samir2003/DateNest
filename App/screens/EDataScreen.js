import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import * as Application from 'expo-application';
import api from '../../src/calls.js'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Appbar } from 'react-native-paper'

const EDataScreen = ({ navigation }) => {

  const deviceId = Application.androidId
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [numberOfDates, setnumberOfDates] = useState('')
  const [lastDate, setlastDate] = useState('')
  const [notes, setNotes] = useState('')


  const onPress = async (e) => {
    e.preventDefault()

    const newDate = {
      name,
      age: parseInt(age),
      phoneNumber,
      numberOfDates: parseInt(numberOfDates),
      lastDate,
      // image: e.target.elements.image.value,
      notes
    }

    api.addDate(deviceId, newDate)
      .then((result) => {
        alert('Date was added')
        navigation.navigate('MainScreen')
      })
      .catch((e) => {
        alert('Error', e)
      })
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-around',
      }}
    >
      <Appbar.Header style={{ backgroundColor: '#FF7A93' }}>
        <Appbar.Content title="Enter your new date" titleStyle={{ textAlign: "center", fontSize: 25 }} />
        <Appbar.BackAction style={{position:"absolute"}}onPress={navigation.goBack} />
      </Appbar.Header>
      <FloatingLabelInput
        label="Name"
        onChangeText={value => setName(value)}
        value={name}
        required={true}
      />
      <FloatingLabelInput
        label="Age"
        keyboardType="numeric"
        onChangeText={value => setAge(value)}
        value={age}
      />
      <FloatingLabelInput
        label="Phone Number"
        mask="(999)-999-9999"
        keyboardType="numeric"
        onChangeText={value => setphoneNumber(value)}
        value={phoneNumber}
      />
      <FloatingLabelInput
        label="Number of Dates"
        keyboardType="numeric"
        onChangeText={value => setnumberOfDates(value)}
        value={numberOfDates}
      />
      <FloatingLabelInput
        label="Last Date (MM/DD/YY)"
        mask="99/99/9999"
        keyboardType='numeric'
        onChangeText={value => setlastDate(value)}
        value={lastDate}
      />
      <FloatingLabelInput
        label="Additional Notes"
        onChangeText={value => setNotes(value)}
        value={notes}
      />
      <View>
        <TouchableHighlight
          onPress={onPress}
          style={styles.button}
        >
          <Text> Done </Text>
        </TouchableHighlight>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#3498db',
    borderRadius: 8,
    shadowColor: '#2a2a2a',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 2
  }
});

export default EDataScreen;