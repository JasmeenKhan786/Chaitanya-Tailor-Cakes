import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";
export default class SignUp extends React.Component {
  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert("User created!");

        db.collection("users").add({
          email: this.state.email,
          name: "Test!",
          password: this.state.password,
        });

        this.props.navigation.replace("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff0f3" }}>
        <ScrollView>
          <Image
            source={require("../assets/images/logonobg.png")}
            style={{
              width: "150%",
              height: 250,
              marginTop: "20%",
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />

          <Text style={{ fontSize: 22, fontFamily: "bold", marginLeft: "5%" }}>
            Sign Up
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
            <AntDesign name="lock" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
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
            <AntDesign name="lock" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Confirm Password"
              onChangeText={(val) => {
                this.setState({ confirmPassword: val });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#ed647b",
              width: "90%",
              height: 40,
              marginTop: 30,
              borderRadius: 10,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (
                this.state.password &&
                this.state.confirmPassword &&
                this.state.email
              ) {
                if (this.state.password === this.state.confirmPassword) { 
                  this.signUp();
                } else {
                  alert("Password dont match");
                }
              } else {
                alert("Please fill all the details!"); 
              }
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: "center", marginTop: 30, color: "grey" }}>
            Already have an account?
            <Text
              style={{ color: "blue", fontWeight: "bold" }}
              onPress={() => {
                this.props.navigation.replace("Login");
              }}
            >
              Login
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
