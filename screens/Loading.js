import React from 'react';
import {
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
//main axis - justifyContent
//cross axis - alignItems

//alignSelf, justifyContent, alignItems, margin and padding
export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Login');
      }
    });
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/Loading.gif')}
        style={{ width: 364, height: 364,marginLeft:20,marginRight:20}}>
      </ImageBackground>
    );
  }
}
