import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import * as Application from 'expo-application';
import api from '../../src/calls.js'
import { Entypo } from 'react-native-vector-icons'
import { Appbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get('screen');
import styles from '../styles/styles.js'

const MainScreen = ({ navigation }) => {
  const deviceId = Application.androidId

  const [dates, setDates] = useState([])
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()
  const SPACING = 18;
  const MARGIN = 10;
  const AVATAR_SIZE = 70;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;


  useEffect(() => {
    api.getMyDates(deviceId).then((dates) => {
      setDates(dates)
    }).catch((e) => {
      console.log(e)
    })
  }, [isFocused, loading])


  /*
   * @param _id is the objectId of the date to be deleted
   */
  const deleteItem = (date) => {
    setLoading(true)
    api.deleteDate(deviceId, date)
      .then((response) => {
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
      .catch((e) => console.log(e))
  }

  const trimName = (name) => {
    const names = name.split(' ')
    return names[0][0] + '. ' + names[1]
  }


  const scrollY = React.useRef(new Animated.Value(0)).current;

  return <View style={{ height: height,bottom: 0,flex: 1, backgroundColor: '#fff', ...StyleSheet.absoluteFillObject }}>
    <Appbar.Header style={{backgroundColor:'#FF7A93'}}>
      <Image source={require('../../assets/logo.png')}></Image>
      <Appbar.Content title="DateNest" titleStyle={styles.appbarContent}/>
      <Appbar.Action icon="plus" style={styles.appbarAction}onPress={() => navigation.navigate('EDataScreen')} />
    </Appbar.Header>
    {/* <Image
      source={require('../../assets/rose.png')}
      style={StyleSheet.absoluteFillObject}
      blurRadius={20}
    /> */}
    <Animated.FlatList
      data={dates}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      keyExtractor={item => item._id}
      contentContainerStyle={{
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 20
      }}
      renderItem={({ item, index }) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + .5)
        ]

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })

        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })

        return <View>
          <Animated.View
            style={{
              flexDirection: 'row', 
              padding: 18, 
              marginBottom: 10, 
              backgroundColor: '#FFF', 
              borderRadius: 50, 
              borderColor: "#979797", 
              borderWidth: 2,
              shadowColor: "#e81919",
              elevation: 600,
              opacity: 1,
              transform: [{ scale }]
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VDataScreen', { item })}>
              <Image
                source={require('../../assets/avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('VDataScreen', { item })}>
                <Text style={styles.text1}>
                  {trimName(item.name)} {item.age && <Text>, {item.age}</Text>}</Text>
                <Text style={styles.text2}>
                  {item.phoneNumber ? item.phoneNumber : "No contact info"}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.trash}
              onPress={() => deleteItem(item)}>
              <Entypo name="trash" size={30} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      }}
    />
  </View>
}

/// Just some styles
export default MainScreen
