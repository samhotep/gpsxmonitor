import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useWindowDimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2Ftb2x3ZSIsImEiOiJja2t4aGsxNHYyZzl1MnFueW1zMjZ4MWVpIn0.D288xM5ZDihIhNBDiS2d8w',
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
  },
});

export default function SignInScreen({navigation}) {
  const window = useWindowDimensions();
  return (
    <View style={styles.page}>
      <View
        style={{
          height: window.height,
          width: window.width,
          backgroundColor: 'grey',
        }}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}
