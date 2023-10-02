import { View, Text } from "react-native";
import React from "react";

export default function ProfileScreen() {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
}

// function SettingsStack() {
//     return (
//       <Stack.Navigator
//         initialRouteName="Settings"
//         screenOptions={{
//           headerStyle: { backgroundColor: "#42f44b" },
//           headerTintColor: "#fff",
//           headerTitleStyle: { fontWeight: "bold" },
//         }}
//       >
//         <Stack.Screen
//           name="Settings"
//           component={SettingsScreen}
//           options={{ title: "Setting Page" }}
//         />
//         <Stack.Screen
//           name="Details"
//           component={DetailsScreen}
//           options={{ title: "Details Page" }}
//         />
//         <Stack.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{ title: "Profile Page" }}
//         />
//       </Stack.Navigator>
//     );
//   }
