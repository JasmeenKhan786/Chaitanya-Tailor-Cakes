import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import db from "../config";
import { Card } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

export default class Vendors extends React.Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
    };
  }

  getData = async () => {
    var response = await db.collection("Vendors").get();
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
      <ImageBackground
        style={{ width: "100%", height: "100%", backgroundColor: "#fff0f3" }}
      >
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "15%",
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
                Vendors
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
                  }}
                >
                  Fethcing Best Vendors for you!
                </Text>
              ) : (
                this.state.vendors.map((b) => {
                  return (
                    <TouchableOpacity
                    key={b.id}
                      onPress={() => {
                        this.props.navigation.navigate("VendorDetail", {
                          id: b.id,
                        });
                      }}
                    >
                      <Card
                        style={{
                          flex: 0.3,
                          borderWidth: 5,
                          borderRadius: 100,
                        }}
                      >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <Avatar
                            source={{
                              uri: b.image,
                            }}
                            size={64}
                            rounded
                          />

                          <View
                            style={{
                              flex: 1,
                              marginLeft: 10,
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: "semibold",
                                marginBottom: 5,
                              }}
                            >
                              {b.shopName}
                            </Text>
                            <Text
                              style={{
                                color: "grey",
                                fontSize: 12,
                                fontFamily: "medium",
                              }}
                            >
                              {b.email}
                            </Text>
                            <Text
                              style={{
                                color: "grey",
                                fontSize: 12,
                                fontFamily: "medium",
                              }}
                            >
                              {b.address}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
