/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';

import BackgroundTimer from 'react-native-background-timer';
import PriceMarker from './PriceMarker';
//import TimerMixin from 'react-timer-mixin';
//import reactMixin from 'react-mixin';
//const timer = require('react-native-timer');


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 32.0853;
const LONGITUDE = 34.7818;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Beeper Administration',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {/*<Text>Beeper Administration</Text>*/}
        <Button
          onPress={() => navigate('BeeperMap')}
          title="Go to Map view"
        />
        <Button
          onPress={() => navigate('BeeperMap')}
          title="Go to Map view"
        />
        
      </View>
    );
  }
}

class BeeperMapView extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };

  makeid()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }


  updateMarkers() {
    this.setState(this.state, () => timer.setTimeout(
      this, 'hideMsg', () => {

        this.setState({
          //fadeAnim: 87,
          amounts: [Math.round(Math.random() * 100.0), Math.round(Math.random() * 100.0), Math.round(Math.random() * 100.0)],
        })
        // this.state.markers[0].title = this.makeid();
        // this.state.markers[1].title = this.makeid();
        // this.state.markers[2].title = this.makeid();

        // this.state.markers[0].amount = Math.round(100*Math.random());
        // this.state.markers[1].amount = Math.round(100*Math.random());
        // this.state.markers[2].amount = Math.round(100*Math.random());
      }, 3000
    ));
  }
  
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      titles: [this.makeid(), this.makeid(), this.makeid()],
      amounts: [56, 67, 78],
      //fadeAnim: new Animated.Value(0),
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + Math.round(Math.random()*6)*SPACE,
            longitude: LONGITUDE + Math.round(Math.random()*6)*SPACE,
          },
          title: 'First marker',
          description: 'Description for first marker',
          key: 'first',
          amount: 76,
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
          title: 'Second marker',
          description: 'Description for second marker',
          key: 'second',
          amount: 74,
        },
        {
          coordinate: {
            latitude: LATITUDE + Math.round(Math.random()*6)*SPACE,
            longitude: LONGITUDE - Math.round(Math.random()*6)*SPACE,
          },
          title: 'Third marker',
          description: 'Description for third marker',
          key: 'third',
          amount: 554,
        },
      ], 

    };
  }  

  componentDidMount() {
    // Animated.timing(          // Uses easing functions
    //   this.state.fadeAnim,
    //   {toValue: 100,
    //     delay: 300,
    //     duration: 50000
    //   }            // Configuration
    // ).start();                // Don't forget start!


    //this.updateMarkers();
    // timer.setTimeout(this, 'hideMsg',
    //   () => {
    //     this.setState({
    //       //fadeAnim: 87,
    //       amounts: [Math.round(Math.random() * 100.0), Math.round(Math.random() * 100.0), Math.round(Math.random() * 100.0)],
    //     })
    //     //this.state.marker[0].title = makeid();
    //     //this.state.marker[1].title = makeid();
    //     //this.state.marker[2].title = makeid();
    //     //console.log('I do not leak!');
    //   },


    //   500
    // );   



    // Start a timer that runs continuous after X milliseconds
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      this.setState({
    //       //fadeAnim: 87,
          amounts: [Math.round(Math.random() * 100.0), Math.round(Math.random() * 100.0), Math.round(Math.random() * 100.0)],
      });
      console.log('tic');
    }, 200);    
  }


  getamountbykey(key){
    for (var i=0; i < this.state.markers.length; i++) {
        if (this.state.markers[i].key === key) {
            return this.state.amounts[i];
        }
    }
    //return this.state.fadeAnim;
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
            <MapView.Marker.Animated
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              key={marker.key}>
              <PriceMarker amount={this.getamountbykey(marker.key)} />
            </MapView.Marker.Animated>
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


BeeperMapView.propTypes = {
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

const BeeperApp = StackNavigator({
  Home: { screen: HomeScreen },
  BeeperMap: { screen: BeeperMapView },
});



AppRegistry.registerComponent('BeeperApp', () => BeeperApp);
