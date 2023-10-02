import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import {
  CategoryScreen,
  FavoritesScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
} from "./screens";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import store from "./redux";

import { Feather } from "@expo/vector-icons";
import ProductDetailScreen from "./screens/ProductDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let persistor = persistStore(store);

function SearchNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="HomeStack"
              screenOptions={{
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#A0A0A0",
                headerShown: false,
                headerBackgroundContainerStyle: {
                  backgroundColor: "#fff",
                },
              }}
            >
              <Tab.Screen
                name="HomeStack"
                component={HomeScreen}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="home" size={24} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="SearchScreen"
                component={SearchNavigation}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="search" size={24} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="star" size={24} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="SettingsStack"
                component={ProfileScreen}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="user" size={24} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
