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

      markers: [
        {
          coordinate: {
            latitude: LATITUDE + 5*SPACE,
            longitude: LONGITUDE + 5*SPACE,
          },
          title: 'First marker',
          description: 'Description for first marker',
          key: 'first',
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
          title: 'Second marker',
          description: 'Description for second marker',
          key: 'second',
        },
        {
          coordinate: {
            latitude: LATITUDE + 5*SPACE,
            longitude: LONGITUDE - 5*SPACE,
          },
          title: 'Third marker',
          description: 'Description for third marker',
          key: 'third'
        },
      ],      
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

          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              key={marker.key}
            />
          ))}

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
