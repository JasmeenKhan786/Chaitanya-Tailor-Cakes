import React, { Component } from "react";
import {
  View,
  Text, 
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image 
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './navigations/Navigator';
//expo install expo-app-loading
//expo install expo-font
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";


let customFonts = {
  bold: require('./assets/fonts/EuclidFlex/EuclidFlexBold.ttf'),
  semibold: require('./assets/fonts/EuclidFlex/EuclidFlexSemiBold.ttf'),
  medium: require('./assets/fonts/EuclidFlex/EuclidFlexMedium.ttf'),
  light: require('./assets/fonts/EuclidFlex/EuclidFlexLight.ttf'),
  ultralight: require('./assets/fonts/EuclidFlex/EuclidFlexUltraLight.ttf'),
  regular: require('./assets/fonts/EuclidFlex/EuclidFlexRegular.ttf'),
};

export default class Feed extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() { 
    this._loadFontsAsync();
  }



  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
    
      return (
       <NavigationContainer>
       <LoginStack/>
       </NavigationContainer>
      );
    }
  }
}

