import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  login = async () => {
    var response = await db
      .collection("users")
      .where("email", "==", this.state.email)
      .get();

    if (response.docs.length === 1) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          alert("Welcome Back!");
          this.props.navigation.replace("Home");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert("Sorry This The User App.!!So please Create an a account ");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/images/bg.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <ScrollView>
            <Image
              source={require("../assets/images/logonobg.png")}
              style={{
                width: "90%",
                height: 250,
                marginTop: "20%",
                alignSelf: "center",
              }}
            />

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                fontFamily: "bold",
              }}
            >
              Hello Again
            </Text>
            <Text
              style={{
                fontSize: 12,
                alignSelf: "center",
                justifyContent: "center",
                fontFamily: "light",
                marginTop: "2%",
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              Your Trusted Online Bakery for Every Celebration We are exactly
              what you are looking for
            </Text>

            <View
            style={{
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="at-sign" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Email ID"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          > 
            <AntDesign name="lock" size={22} color="grey" />
            <TextInput
              style={{
                width: "85%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ password: val });
              }}
            />
              <Feather name="eye-off" size={20} color="grey" />
            </View>

            <Text
              style={{
                marginTop: 10,
                alignSelf: "flex-end",
                marginHorizontal: "5%",
                fontFamily: "semibold",
              }}
              onPress={() => {
                this.props.navigation.replace("ForgotPassword");
              }}
            >
              Forgot Password?
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#ed647b",
                width: "90%",
                height: 40,
                marginTop: 10,
                borderRadius: 10,
                alignSelf: "center",
                alignItems:'center',
                justifyContent:'center'
              }}
              onPress={() => {
                if(this.state.email && this.state.password){
                  this.login();

                }
                else{
                  alert('Please fill all the details!')
                }
              }}
            >
              <Text
                style={{ fontSize: 18, color: "white", fontFamily: "medium" }}
              >
                Login
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                alignSelf: "center",
                marginTop: 60,
                color: "grey",
                fontFamily: "light",
              }}
            >
              New to TailorCakes?
              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontFamily: "semibold",
                }}
                onPress={() => {
                  this.props.navigation.replace("SignUp");
                }}
              >
                {" "}
                Register Now!!
              </Text>{" "}
            </Text>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
