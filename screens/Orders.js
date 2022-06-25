import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

export default class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
    };
  }

  getData = async () => {
    var response = await db
      .collection("Orders")
      .where("useremail", "==", firebase.auth().currentUser.email)
      .get();
    //Map functions - arrays

    response.docs.map((a) => {
      var temp = this.state.vendors;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ vendors: temp });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#fff0f3" }}>
        <View style={{ flex: 1, backgroundColor: "#fff0f3" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "15%",
              backgroundColor: "#fff0f3",
              marginLeft: "5%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                marginLeft: 10,
                fontFamily: "bold",
              }}
            >
              Orders
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            {this.state.vendors.length === 0 ? (
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 50,
                  marginHorizontal: "5%", 
                  fontSize: 17,
                  fontFamily:'bold',
                  color:'grey'
                }}
              >
               Your orders will be displayed here!
              </Text> 
            ) : (
              this.state.vendors.map((b) => {
                return (
                  <TouchableOpacity
                  key={b.id}
                    onPress={() => {
                      this.props.navigation.navigate("OrdersDetail", {
                        id: b.id,
                      });
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        marginVertical: 10,
                        borderRadius: 10,
                        alignSelf: "center",
                        paddingVertical: 10,
                        backgroundColor: "white",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          marginHorizontal: "5%",
                          justifyContent: "space-between",

                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "semibold",
                          }}
                        >
                          {b.nameOnCake}
                        </Text>
                        <Text
                          style={{
                            backgroundColor: "#82CFE2",
                            padding: 6,
                            borderRadius: 10,
                            color: "white",
                            fontFamily: "light",
                          }}
                        >
                          {b.deliveryDate}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "grey",
                          marginHorizontal: "5%",
                          fontFamily: "regular",
                        }}
                      >
                        {b.deliveryAddress}
                      </Text>

                      <Text
                        style={{
                          color: "grey",
                          marginHorizontal: "5%",
                          marginTop: 5,
                          fontFamily: "light",
                        }}
                      >
                        {b.occasion} -
                        <Text
                          style={{
                            color: "#DC6585",
                            marginHorizontal: "5%",
                            fontWeight: "bold",
                            fontFamily: "light",
                          }}
                        >
                          {b.theme}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          marginHorizontal: "5%",
                          alignSelf: "flex-end",
                          color: "#42CBE0",
                          fontWeight: "bold",
                          fontFamily: "ultralight",
                        }}
                      >
                        {b.cakesweight}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

    
      </ScrollView>
    );
  }
}
