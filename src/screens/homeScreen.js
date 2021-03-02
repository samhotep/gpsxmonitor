import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {useWindowDimensions} from 'react-native';
import MapView from 'react-native-maps';

export default function HomeScreen({navigation}) {
  const window = useWindowDimensions();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4788c7" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0.347596,
          longitude: 32.58252,
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
