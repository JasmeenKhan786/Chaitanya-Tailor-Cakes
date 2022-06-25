import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import db from "../config";
import { Ionicons } from "@expo/vector-icons";

export default class OrdersDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedid: props.route.params.id,
      info: [],
    };
  }
  getData = async () => {
    var response = await db
      .collection("Orders")
      .doc(this.state.selectedid)
      .get();
    this.setState({ info: response.data() });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#fff0f3" }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "15%",
              marginLeft: "5%",
              backgroundColor: "#fff0f3",
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
              Order Detail
            </Text>
          </View>
          <View style={{ backgroundColor: "#fff0f3" }}>
            <View>
              <Text style={styles.shopName}>{this.state.info.nameOnCake}</Text>
              <Text style={styles.extraEverything}>
                Delivery Date: {this.state.info.deliveryDate}
              </Text>
              <Text style={styles.extraEverything}>
                Cake Flavour: {this.state.info.cakesFlavour}
              </Text>
              <Text style={styles.extraEverything}>
                Cake Weight: {this.state.info.cakesweight}
              </Text>
              <Text style={styles.extraEverything}>
                Occasion: {this.state.info.occasion}
              </Text>
              <Text style={styles.extraEverything}>
                Theme: {this.state.info.theme} 
              </Text>
              <Text style={styles.extraEverything}>
                Additional Information: {this.state.info.additionalInformation}
              </Text>
              <Text style={styles.extraEverything}>
                Status: {this.state.info.status}
              </Text>

              <Image
                source={{ uri: this.state.info.cakeimage }}
                style={{ 
                  width: 100,
                  height: 100,
                  marginLeft: 20,
                  borderRadius: 5,
                }}
              />
            </View>
          </View> 
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f3",
  },
  shopName: {
    color: "#50CBE0",
    fontSize: 23,
    marginTop: 13,
    marginLeft: 20,
    fontFamily: "bold",
  },
  extraEverything: {
    color: "#DC6585",
    marginTop: 10,
    marginLeft: 20,
    fontFamily: "medium",
  },
});
