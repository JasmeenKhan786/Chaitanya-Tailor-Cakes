import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Map = 'https://www.bing.com/maps?q=cake+shop+near+me&FORM=HDRSC6';

export default function Maps() {
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%' }}>
         <Text style={{backgroundColor:'white',alignSelf:'center'}}>Cake's Shop Near You (Results through Microsoft) </Text>
        <WebView source={{ uri: Map  }} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
