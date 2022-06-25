import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import Loading from '../screens/Loading';
import Login from '../screens/Loginscreen';
import SignUp from '../screens/SignUp';
import Vendors from '../screens/Vendors';
import VendorDetail from '../screens/VendorDetail';
import OrdersDetail from '../screens/OrdersDetail';
import Orders from '../screens/Orders';
import CodeCake from '../screens/CodeACake';
import Map from '../screens/Map';
import Poster from '../screens/OnlinePhoto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';

//objects -screen and navigator
const Stack1 = createStackNavigator();

const VendorsStack = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="Home" component={Home} />
      <Stack1.Screen name="Vendors" component={Vendors} />
      <Stack1.Screen name="VendorDetail" component={VendorDetail} />
      <Stack1.Screen name="CodeCake" component={CodeCake} />
      <Stack1.Screen name="Map" component={Map} />
       <Stack1.Screen name="Poster" component={Poster} />
    </Stack1.Navigator>
  );
};

const Stack2 = createStackNavigator();

const OrdersStack = () => {
  return (
    <Stack2.Navigator screenOptions={{ headerShown: false }}>
      <Stack2.Screen name="Orders" component={Orders} />
      <Stack2.Screen name="OrdersDetail" component={OrdersDetail} />
    </Stack2.Navigator>
  );
};

const Stack3 = createStackNavigator();

const GamesStack = () => {
  return (
    <Stack3.Navigator screenOptions={{ headerShown: false }}>
      <Stack3.Screen name="CodeACake" component={CodeCake} />
    </Stack3.Navigator>
  );
};

const Stack4 = createStackNavigator();

const MapStack = () => {
  return (
    <Stack4.Navigator screenOptions={{ headerShown: false }}>
      <Stack4.Screen name="Map" component={Map} />
    </Stack4.Navigator>
  );
};
const Stack5 = createStackNavigator();

const PosterStack = () => {
  return (
    <Stack4.Navigator screenOptions={{ headerShown: false }}>
      <Stack4.Screen name="PosterMyWall" component={Poster} />
    </Stack4.Navigator>
  );
};


const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={VendorsStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

//objects -screen and navigator
const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default LoginStack;
