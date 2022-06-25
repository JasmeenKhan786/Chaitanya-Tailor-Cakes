import * as React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

const category = [
  { name: "Birthday", image: require("../assets/images/11.png") },
  { name: "Wedding", image: require("../assets/images/12.png") },
  { name: "Anniversary", image: require("../assets/images/10.png") },
  { name: "Baby Shower", image: require("../assets/images/13.png") },
  { name: "Milestone", image: require("../assets/images/14.png") },
  { name: "PhotoCakes", image: require("../assets/images/camera.png") },
  { name: "Promotions", image: require("../assets/images/15.png") },
];

//#82CFE2 #42CBE0 - blue

//#F5CCDC #DC6585 - pink

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
    };
  }

  getData = async () => {
    var response = await db.collection("Vendors").limit(4).get();
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
      <View style={{ flex: 1, backgroundColor: "#fff0f3" }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: "10%",
              marginHorizontal: "5%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontFamily: "bold" }}>Home</Text>
            <TouchableOpacity
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.replace("Login");
                  })
                  .catch((error) => {
                    alert("Something went wrong");
                  });
              }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginTop: 10,
              marginHorizontal: "5%",
              fontSize: 18,
              fontWeight: "500",
              fontFamily: "semibold",
            }}
          >
            Heyy!
          </Text>
          <Text
            style={{
              marginHorizontal: "5%",
              color: "grey",
              fontSize: 16,
              fontFamily: "medium",
            }}
          >
            Get the best customized cakes tailor made for you with
            <Text
              style={{
                color: "#42CBE0",
                fontWeight: "bold",
                fontFamily: "semibold",
              }}
            >
              {" "}
              Tailor{" "}
            </Text>
            <Text
              style={{
                color: "#DC6585",
                fontWeight: "bold",
                fontFamily: "semibold",
              }}
            >
              Cakes{" "}
            </Text>
          </Text>

          <ScrollView horizontal>
            {category.map((a) => {
              return (
                <View
                key={a.name}
                  style={{
                    marginHorizontal: 15,
                    marginVertical: 20,
                    backgroundColor: "#F5CCDC",
                    borderRadius: 10,
                    elevation: 10,
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: 5,
                  }}
                >
                  <Image
                    source={a.image}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      marginHorizontal: 5,
                      fontFamily: "regular",
                    }}
                  >
                    {a.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                fontFamily: "bold",
              }}
            >
              Our Best Vendors
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "100",
                fontFamily: "light",
              }}
              onPress={() => {
                this.props.navigation.navigate("Vendors");
              }}
            >
              View All
            </Text>
          </View>

          <ScrollView horizontal>
            {this.state.vendors.length === 0 ? (
              <Text
                style={{
                  marginVertical: 20,
                  alignSelf: "center",
                  fontSize: 17,
                  marginLeft:20 
                }}
              >
                Fetching Vendor Details!
              </Text>
            ) : (
              this.state.vendors.map((a) => {
                return (
                  <TouchableOpacity
                  kay={a.id}
                    onPress={() => {
                      this.props.navigation.navigate("VendorDetail", {
                        id: a.id,
                      });
                    }}
                  >
                    <ImageBackground
                      source={{ uri: a.image }}
                      style={{
                        width: 220,
                        height: 270,
                        borderRadius: 10,
                        overflow: "hidden",
                        marginHorizontal: 15,
                        justifyContent: "flex-end",
                        marginVertical: 10,
                        paddingBottom: 10,
                        elevation: 10,
                        shadowColor: "black",
                        shadowOpacity: 0.5,
                        shadowRadius: 5,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          width: "90%",
                          height: 80,
                          borderRadius: 10,
                          alignSelf: "center",
                          justifyContent: "center",
                          elevation: 15,
                          shadowColor: "black",
                          shadowOpacity: 0.5,
                          shadowRadius: 5,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginHorizontal: "5%",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "500",
                              fontSize: 18,
                              fontFamily: "bold",
                            }}
                          >
                            {a.shopName}
                          </Text>

                          <View
                            style={{ 
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }} 
                          >
                            <AntDesign name="star" size={17} color="#F7B112" />
                            <Text
                              style={{
                                fontSize: 14,
                                marginLeft: 5,
                                fontFamily: "bold",
                              }}
                            >
                              4.0
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: 13,
                            marginHorizontal: "5%",
                            fontFamily: "semibold",
                          }}
                        >
                          {a.address}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                fontFamily: "bold",
              }}
            >
              Our Latest Orders
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "100",
                fontFamily: "light",
              }}
              onPress={() => {
                this.props.navigation.navigate("Orders");
              }}
            >
              View Your Orders
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              marginVertical: 10,
              backgroundColor: "pink",
              borderRadius: 10,
              borderColor: "red",
              marginLeft: 15,
              elevation: 10,
              shadowColor: "black",
              shadowOpacity: 0.5,
              shadowRadius: 5,
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
                  fontWeight: "500",
                  fontFamily: "regular",
                }}
              >
                Mukku
              </Text>
              <Text
                style={{
                  backgroundColor: "#82CFE2",
                  padding: 6,
                  borderRadius: 10,
                  color: "white",
                  fontFamily: "regular",
                }}
              >
                10 Kg
              </Text>
            </View>
            <Text
              style={{
                color: "grey",
                marginHorizontal: "5%",
                fontFamily: "regular",
              }}
            >
              Pune,Chakan
            </Text>

            <Text
              style={{
                color: "grey",
                marginHorizontal: "5%",
                marginTop: 5,
                fontFamily: "regular",
                marginBottom: 10,
              }}
            >
              Birthday
              <Text
                style={{
                  color: "#DC6585",
                  marginHorizontal: "5%",
                  fontWeight: "bold",
                  fontFamily: "light",
                  marginBottom: 10,
                }}
              >
                Mickey Mouse
              </Text>
            </Text>
          </View>
          <ScrollView horizontal>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Vendors");
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 250,
                  alignSelf: "center",
                  backgroundColor: "#82CFE2",
                  marginTop: 10,
                  marginBottom: 20,
                  marginRight: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  elevation: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  marginLeft: 15,
                }}
              >
                <Image
                  source={require("../assets/images/c.png")}
                  style={{ width: "40%", height: "80%", resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    width: "55%",
                    textAlign: "center",
                    fontFamily: "bold",
                  }}
                >
                  Get the best deals for your occassion
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("CodeCake");
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 250,
                  alignSelf: "center",
                  backgroundColor: "#DC6585",
                  marginTop: 10,
                  marginBottom: 20,
                  marginRight: 10,
                  marginLeft: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  elevation: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                }}
              >
                <Image
                  source={require("../assets/images/game.png")}
                  style={{ width: "40%", height: "70%", resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    width: "55%",
                    textAlign: "center",
                    fontFamily: "bold",
                  }}
                >
                  Play our Code a Cake Game
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Map");
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 250,
                  alignSelf: "center",
                  backgroundColor: "lightgreen",
                  marginTop: 10,
                  marginBottom: 20,
                  marginRight: 10,
                  marginLeft: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  elevation: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                }}
              >
                <Image
                  source={require("../assets/images/map.png")}
                  style={{
                    width: "40%",
                    height: "100%",
                    marginTop: 2,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    width: "55%",
                    textAlign: "center",
                    fontFamily: "bold",
                  }}
                >
                  Cake Shop Near You
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Poster");
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 250,
                  alignSelf: "center",
                  backgroundColor: "#3fbce8",
                  marginTop: 10,
                  marginBottom: 20,
                  marginRight: 10,
                  marginLeft: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  elevation: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                }}
              >
                <Image
                  source={require("../assets/images/poster.png")}
                  style={{
                    width: "40%",
                    height: "100%",
                    marginTop: 2,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    width: "55%",
                    textAlign: "center",
                    fontFamily: "bold",
                  }}
                >
                  Make A Digital Photo Banner For Occassion
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}
