/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions  
} from 'react-native';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 32.0853;
const LONGITUDE = 34.7818;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class BeeperApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee">
          <MapView.Marker
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
          />
          <MapView.Marker
            coordinate={{
              latitude: LATITUDE - SPACE,
              longitude: LONGITUDE - SPACE,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <MapView.Callout>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>

        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Map with Loading</Text>
          </View>
        </View>        
      </View>
    );
  }
}


BeeperApp.propTypes = {
  provider: MapView.ProviderPropType,
};


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },  
  map: {
    ...StyleSheet.absoluteFillObject,
  },  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BeeperApp', () => BeeperApp);
