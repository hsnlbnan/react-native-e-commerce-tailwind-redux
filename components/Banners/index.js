import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const bannerData = [
  {
    id: 1,
    title: "For Her",
    image: require("../../assets/for-her.png"),
    grid: 6,
  },
  {
    id: 2,
    title: "For Him",
    image: require("../../assets/for-him.png"),
    grid: 6,
  },
  {
    id: 3,
    title: "Kids",
    image: require("../../assets/kids.png"),
    grid: 12,
  },
  {
    id: 4,
    title: "Shoes",
    image: require("../../assets/shoes.png"),
    grid: 12,
  },
];

const BannerItem = ({ title, image, width }) => (
  <View
    className={`${width} relative h-[320px] p-2  flex items-center justify-center`}
  >
    <Image source={image} className={"w-full h-full relative"} />
    <Text
      className={
        "absolute  bottom-5 transform -translate-y-1/2  bg-[#FFFFFF7A] text-center p-2 text-lg font-medium border border-white w-3/4"
      }
    >
      {title}
    </Text>
  </View>
);

export default function Banners() {
  return (
    <ScrollView
      className={"flex flex-col pb-30 mb-16"}
      showsVerticalScrollIndicator={false}
    >
      <View className={"flex flex-row"}>
        {bannerData.slice(0, 2).map((item) => (
          <BannerItem
            key={item.id}
            title={item.title}
            image={item.image}
            width="w-1/2"
          />
        ))}
      </View>
      <View className={"flex flex-col"}>
        {bannerData.slice(2).map((item) => (
          <BannerItem
            key={item.id}
            title={item.title}
            image={item.image}
            width="w-full"
          />
        ))}
      </View>
    </ScrollView>
  );
}
