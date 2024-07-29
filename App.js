import "react-native-gesture-handler";
import AddMedicationScreen from "./AddMedicationScreen";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import React from "react";
import RegisterScreen from "./RegisterScreen";
import UpdateMedicationScreen from "./UpdateMedicationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="UpdateMedication" component={UpdateMedicationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
