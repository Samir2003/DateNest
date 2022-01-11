import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');

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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: '80%',
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EE59D',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
});

export default VDataScreen;