import React from "react";
import { StyleSheet, View, Text,  Image,ScrollView,ImageBackground } from "react-native";

function Untitled(props) {
  return (
    <ImageBackground    source={require('../assets/images/bgOrder2.png')}
        style={{ width: '100%', height: '100%' }}>
    <ScrollView>
    <View style={styles.container}>
     <View style={styles.userNameColumnFiller}></View>
      <Image
        source={require("../assets/images/profile.png")}
        resizeMode="center"
        style={styles.image}
      ></Image>
       <Text style={styles.userName}>User Name</Text>   
    </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userName: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 34,
   alignSelf:'center',
    marginTop:10
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "white",
       alignSelf:'center',

  }
});

export default Untitled;
