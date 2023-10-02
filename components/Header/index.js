import { View, Text } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
export default function Header() {
  return (
    <View className="flex flex-row justify-between items-center drop-shadow-md bg-white h-14 px-4">
      <Feather name="menu" size={24} color="black" />
      <Text className="font-extrabold text-2xl text-black">ALDO</Text>
      <Feather name="shopping-cart" size={24} color="black" />
    </View>
  );
}
