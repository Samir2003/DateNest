import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');
import styles from '../styles/styles.js'

const VDataScreen = ({ route, navigation }) => {

  const date = route.params.item

  const onPress = async (e) => {
    e.preventDefault()

    //save data to db
    navigation.navigate('MainScreen')
  }

  //Style all the information about date

  return (
    <View style={{ height: height, bottom: 0, flex: 1, backgroundColor: '#fff', ...StyleSheet.absoluteFillObject }}>
      <Appbar.Header style={{ backgroundColor: '#FF7A93' }}>
        <Appbar.Content title={date.name} titleStyle={{ textAlign: "center", fontSize: 25 }} />
        <Appbar.BackAction style={{position:"absolute"}}onPress={navigation.goBack} />
      </Appbar.Header>
      <View style={styles.screenContainer}>
        <Text>Here is your date</Text>
        <Text>
          {date.age && <Text>Age: {date.age}</Text>}
          {date.phoneNumber && <Text>Phone Number: {date.phoneNumber}</Text>}
          {date.numberOfDates && <Text># of Dates: {date.numberOfDates}</Text>}
          {date.lastDate && <Text>Last Date: {date.lastDate}</Text>}
          {date.notes && <Text>Notes: {date.notes}</Text>}
        </Text>
      </View>
    </View>
  );
};

export default VDataScreen;