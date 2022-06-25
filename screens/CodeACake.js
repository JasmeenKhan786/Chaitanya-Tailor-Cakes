import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Games = 'https://www.bt.com/codeacake/';

export default function Game() {
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%' }}>
    <Text style={{backgroundColor:'white',alignSelf:'center'}}>BT's Code A Cake Game </Text>
        <WebView source={{ uri: Games  }} />
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
