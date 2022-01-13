import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as Application from 'expo-application';
import api from '../../src/calls.js';
import { useForm, Controller } from 'react-hook-form';
import { Appbar } from 'react-native-paper';
import { AppStyles } from '../AppStyles';
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get('screen');

const EDataScreen = ({ navigation }) => {
  const deviceId = Application.androidId;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [numberOfDates, setnumberOfDates] = useState('');
  const [lastDate, setlastDate] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);

  const handleChoosePhoto = async () => {
    const options = {
      noData: true
    };
    const response = await ImagePicker.launchImageLibrary(options);
    if (response.uri) {
      setImage(response);
      alert('Image was successfully uploaded');
    }
  };

  const onPress = async (e) => {
    e.preventDefault();

    const newDate = {
      name,
      age: parseInt(age),
      phoneNumber,
      numberOfDates: parseInt(numberOfDates),
      lastDate,
      image,
      notes
    };

    api
      .addDate(deviceId, newDate)
      .then((result) => {
        alert('Date was added');
        navigation.navigate('MainScreen');
      })
      .catch((e) => {
        alert('Error', e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Appbar.Header style={{ backgroundColor: '#FF7A93' }}>
          <Appbar.Content
            title="Enter your new date"
            titleStyle={{ textAlign: 'center', fontSize: 25 }}
          />
          <Appbar.BackAction
            style={{ position: 'absolute' }}
            onPress={navigation.goBack}
          />
        </Appbar.Header>
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Age"
          onChangeText={setAge}
          value={age}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number"
          onChangeText={setphoneNumber}
          value={phoneNumber}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Number of Dates"
          onChangeText={setnumberOfDates}
          value={numberOfDates}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Last Date"
          onChangeText={setlastDate}
          value={lastDate}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainerNotes}>
        <TextInput
          style={styles.bodyNotes}
          placeholder="Notes"
          onChangeText={setNotes}
          value={notes}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
          multiline={true}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
          <Text style={{ color: AppStyles.color.text }}>Choose Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: 'red'
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  InputContainerNotes: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    height: '17%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  bodyNotes: {
    height: '94%',
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  button1: {
    width: AppStyles.textInputWidth.main,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.blue,
    borderRadius: AppStyles.borderRadius.main,
    position: 'absolute',
    bottom: '17%'
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default EDataScreen
