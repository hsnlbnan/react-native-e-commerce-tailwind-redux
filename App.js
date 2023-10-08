import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text } from "react-native";
import {
  FavoritesScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
  CategoryScreen,
} from "./screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "./redux";
import { Feather } from "@expo/vector-icons";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { Header } from "./components";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

let persistor = persistStore(store);

function LogoTitle() {
  return <Header onlyLogo />;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackgroundContainerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="HomeProductDetail"
        component={ProductDetailScreen}
      />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: (props) => (
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="black"
            style={{ marginLeft: 16 }}
            {...props}
          />
        ),
        animationEnabled: true,
        headerLeftLabelVisible: false,
      }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Category" component={CategoryScreen} />
      <SearchStack.Screen
        name="SearchProductDetail"
        component={ProductDetailScreen}
      />
    </SearchStack.Navigator>
  );
}
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#A0A0A0",
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === "HomeScreen") {
                  iconName = "home";
                } else if (route.name === "SearchScreen") {
                  iconName = "search";
                } else if (route.name === "Favorites") {
                  iconName = "star";
                } else if (route.name === "Profile") {
                  iconName = "user";
                }

                return <Feather name={iconName} size={24} color={color} />;
              },
            })}
          >
            <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
            <Tab.Screen name="SearchScreen" component={SearchStackScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
