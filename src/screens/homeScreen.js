import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useWindowDimensions} from 'react-native';
import MapView from 'react-native-maps';

export default function HomeScreen({navigation}) {
  const window = useWindowDimensions();
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
