import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PosterMyWall = 'https://www.postermywall.com/index.php/posters/gallery?utm_source=homepage&utm_content=herocta_createadesign&utm_medium=cta&utm_campaign=homepage';

export default function Poster() {
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%',backgroundColor:'#3fbce8' }}>
    <Text style={{backgroundColor:'#3fbce8',alignSelf:'center'}}>Make stunning Digital Media For Your Occassion </Text>
        <WebView source={{ uri: PosterMyWall  }} />
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
