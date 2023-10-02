import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { Banners, Header } from "../components";

export default function HomeScreen() {
  return (
    <View className="flex flex-col h-full bg-white">
      <SafeAreaView>
        <Header />
        <Banners />
      </SafeAreaView>
    </View>
  );
}
