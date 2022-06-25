import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import db from "../config";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

export default class VendorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedid: props.route.params.id,
      info: [],
      image: "",
      uploading: "none",
      deliveryAddress: "",
      deliveryContact: "",
      deliveryDate: "",
      cakesFlavour: "",
      cakesweight: "",
      occasion: "",
      theme: "",
      nameOnCake: "",
      additionalInformation: "",
      photocakeimage: "",
    };
  }
  sendSMS = (contact) => {
    var number = contact;
    var price = "100";
    Linking.openURL(
      "sms:" + number + "?body=Hi, Have got number From Tailor Cakes "
    );
  };

  sendEmail = () => {
    var emailTo = this.state.info.email;
    Linking.openURL(
      "mailTo:" +
        emailTo +
        "?subject=Buying Product from Tailor Cakes&body=Hi, Have got Email From Tailor Cakes "
    );
  };
  getData = async () => {
    var response = await db
      .collection("Vendors")
      .doc(this.state.selectedid)
      .get();
    this.setState({ info: response.data() });
  };

  componentDidMount() {
    this.getData();
  }
  selectImage = async (path) => {
    this.setState({ uploading: true });
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path);
    }
  };

  uploadImage = async (uri, email, path) => {

    var response = await fetch(uri);

    //binary large objects
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path);
    });
  };

  fetchImage = (email, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + email);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url, uploading: false });
      })
      .catch((error) => { 
        this.setState({ image: "#", uploading: "none" });
      });
  };

  placedOrder = () => {
    db.collection("Orders").add({
      deliveryAddress: this.state.deliveryAddress,
      deliveryContact: this.state.deliveryContact,
      deliveryDate: this.state.deliveryDate,
      cakesFlavour: this.state.cakesFlavour,
      cakesweight: this.state.cakesweight,
      occasion: this.state.occasion,
      theme: this.state.theme,
      nameOnCake: this.state.nameOnCake,
      additionalInformation: this.state.additionalInformation,
      vendorid: this.state.selectedid,
      useremail: firebase.auth().currentUser.email,
      photocakeimage: this.state.photocakeimage,
      price: "",
      vendorsrespone: "pending",
      cakeimage: "",
      customerresponse: "",
      status: "Order Request Sent",
      vendorDetails: this.state.info, 
    });

    alert("Order Placed!");
    this.props.navigation.navigate("Orders");
  };
  render() {
    var icon;
    if (this.state.uploading === "none") {
      icon = <Entypo name="upload" size={24} color="black" />;
    } else if (this.state.uploading) {
      icon = <ActivityIndicator size={"small"} color="black" />;
    } else {
      icon = <Feather name="check-circle" size={24} color="black" />;
    }
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#fff0f3" }}>
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
              Vendor Detail
            </Text>
          </View>
          <View>
            <View style={styles.image3Stack}>
              <Image
                source={{ uri: this.state.info.image }}
                resizeMode="cover"
                style={styles.image3}
              ></Image>
              <View style={styles.rect}>
                <Text style={styles.shopName}>{this.state.info.shopName}</Text>
                <Text style={styles.extraEverything}>
                  {this.state.info.address}
                </Text>
                <TouchableOpacity
                  onPress={this.sendEmail}
                  activeOpacity={0.7}
                  style={styles.button}
                >
                  <Text style={styles.extraEverything}>
                    {this.state.info.email}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.sendSMS(this.state.info.contactNumber);
                  }}
                  activeOpacity={0.7}
                  style={styles.button}
                >
                  <Text style={styles.extraEverything}>
                    {this.state.info.contactNumber}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.textInputRow}>
              <TextInput
                placeholder="Delivery Address"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput}
                onChangeText={(val) => {
                  this.setState({ deliveryAddress: val });
                }}
              />
              <TextInput
                placeholder="Delivery Contact"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput2}
                onChangeText={(val) => {
                  this.setState({ deliveryContact: val });
                }}
              />
            </View>
            <View>
              <TextInput
                placeholder="Delivery date"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.deliveryDate}
                onChangeText={(val) => {
                  this.setState({ deliveryDate: val });
                }}
              />
            </View>
            <View style={styles.textInput3Stack}>
              <TextInput
                placeholder="Cake Flavour"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput3}
                onChangeText={(val) => {
                  this.setState({ cakesFlavour: val });
                }}
              />
              <TextInput
                placeholder="Cake Weight"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput8}
                onChangeText={(val) => {
                  this.setState({ cakesweight: val });
                }}
              />
            </View>

            <View style={styles.textInput7Row}>
              <TextInput
                placeholder="Occasion"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput7}
                onChangeText={(val) => {
                  this.setState({ occasion: val });
                }}
              />
              <TextInput
                placeholder="theme"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput6}
                onChangeText={(val) => {
                  this.setState({ theme: val });
                }}
              />
            </View>

            <View style={styles.textInput5Row}>
              <TextInput
                placeholder="Name On Cake"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput5}
                onChangeText={(val) => {
                  this.setState({ nameOnCake: val });
                }}
              />
              <TextInput
                placeholder="Additional Information"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput4}
                onChangeText={(val) => {
                  this.setState({ additionalInformation: val });
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.cupertinoButtonInfo}
              onPress={() => {
                if (
                  this.state.deliveryAddress &&
                  this.state.deliveryContact &&
                  this.state.deliveryDate &&
                  this.state.cakesFlavour &&
                  this.state.cakesweight &&
                  this.state.occasion &&
                  this.state.theme &&
                  this.state.nameOnCake &&
                  this.state.additionalInformation
                ) {
                  this.placedOrder();
                }
                else{
                  alert('Please fill all the details!')
                }
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "bold",
                  marginBottom: 10,
                }}
              >
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image3: {
    marginLeft: 20,
    width: 301,
    height: 353,
    position: "absolute",
    borderRadius: 34,
  },
  rect: {
    top: 323,
    left: 19,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 24,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 30,
    shadowOpacity: 0.33,
    shadowRadius: 10,
    overflow: "visible",
  },

  shopName: {
    color: "rgba(18,18,18,1)",
    fontSize: 23,
    marginLeft: 20,
    marginTop: 10,
    fontFamily: "bold",
  },
  extraEverything: {
    color: "grey",
    fontSize: 10,
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: "semibold",
  },
  image3Stack: {
    width: 301,
    height: 433,
    marginTop: 10,
    marginLeft: 9,
  },
  textInput: {
    color: "#121212",
    height: 44,
    width: 133,

    fontFamily: "regular",
  },
  textInput2: {
    fontFamily: "regular",
    color: "#121212",
    height: 44,
    width: 133,
    marginLeft: -1,
  },
  deliveryDate: {
    color: "#121212",
    height: 44,
    width: 133,
    marginLeft: 30,
    fontFamily: "regular",
  },
  textInputRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
  },

  textInput3: {
    top: 0,
    left: 0,
    position: "absolute",

    color: "#121212",
    height: 44,
    width: 131,
    fontFamily: "regular",
  },
  textInput8: {
    top: 0,
    left: 129,
    position: "absolute",

    color: "#121212",
    height: 44,
    width: 133,
    fontFamily: "regular",
  },
  textInput3Stack: {
    width: 263,
    height: 44,
    marginLeft: 30,
    fontFamily: "regular",
  },
  textInput7: {
    color: "#121212",
    height: 44,
    width: 133,
    fontFamily: "regular",
  },
  textInput6: {
    color: "#121212",
    height: 44,
    width: 149,
    marginLeft: 1,
    fontFamily: "regular",
  },
  textInput7Row: {
    height: 44,
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 12,
    fontFamily: "regular",
  },
  textInput5: {
    color: "#121212",
    height: 44,
    width: 133,
    fontFamily: "regular",
  },
  textInput4: {
    fontFamily: "regular",
    color: "#121212",
    height: 44,
    width: 151,
  },
  textInput5Row: {
    height: 44,
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 12,
    fontFamily: "regular",
  },
  cupertinoButtonInfo: {
    height: 49,
    width: 143,
    borderRadius: 20,
    backgroundColor: "rgba(128,195,229,1)",
    shadowColor: "rgba(0,0,0,1)",
    alignItems: "center",
    paddingTop: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },

    elevation: 39,
    shadowOpacity: 0.52,
    shadowRadius: 13,
    marginLeft: 88,
    fontFamily: "regular",
  },
});
