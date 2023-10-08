import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import {
  AccessoriesIcon,
  CollectionsIcon,
  FootwearIcon,
  HandBagIcon,
} from "../icons/Icons";

const categoriesData = [
  {
    id: 1,
    name: "For Her",
  },
  {
    id: 2,
    name: "For Him",
  },
  {
    id: 3,
    name: "For Kids",
  },
  {
    id: 4,
    name: "Sale",
  },
];

const forHerCategories = [
  {
    id: 1,
    name: "Footwear",
    icon: FootwearIcon,
    children: [
      {
        id: 1,
        name: "Sneakers",
      },
      {
        id: 2,
        name: "Sandals",
      },
      {
        id: 3,
        name: "Boots",
      },
      {
        id: 4,
        name: "Slippers",
      },
      {
        id: 5,
        name: "Shoes",
      },
    ],
  },

  {
    id: 2,
    name: "Handbags",
    icon: HandBagIcon,
    children: [
      {
        id: 1,
        name: "Tote Bags",
      },
      {
        id: 2,
        name: "Satchel Bags",
      },
      {
        id: 3,
        name: "Crossbody Bags",
      },
      {
        id: 4,
        name: "Clutch Bags",
      },
      {
        id: 5,
        name: "Backpacks",
      },
    ],
  },
  {
    id: 3,
    name: "Accessories",
    icon: AccessoriesIcon,
    children: [
      {
        id: 1,
        name: "Sunglasses",
      },
      {
        id: 2,
        name: "Watches",
      },
      {
        id: 3,
        name: "Jewelry",
      },
      {
        id: 4,
        name: "Hats",
      },
      {
        id: 5,
        name: "Belts",
      },
    ],
  },
  {
    id: 4,
    name: "Collections",
    icon: CollectionsIcon,
    children: [
      {
        id: 1,
        name: "New Arrivals",
      },
      {
        id: 2,
        name: "Best Sellers",
      },
      {
        id: 3,
        name: "Most Viewed",
      },
      {
        id: 4,
        name: "Trending",
      },
      {
        id: 5,
        name: "Sale",
      },
    ],
  },
];

function Category({ id, name, icon, children, onClick, activeCategory }) {
  return (
    <TouchableOpacity
      onPress={onClick}
      key={id}
      className="flex  justify-between mb-2 mt-5"
    >
      <View className="flex flex-row items-center justify-between  pb-4  border-b border-gray-300">
        <View
          className={`
          ${activeCategory === id ? "" : ""}
          flex flex-row items-center justify-center 

        `}
        >
          {icon}
          <Text className="ml-4 text-lg font-light tracking-widest">
            {name.toUpperCase()}
          </Text>
        </View>

        <Feather
          name={activeCategory === id ? "chevron-down" : "chevron-right"}
          size={24}
          color="black"
        />
      </View>
      {activeCategory === id && (
        <View className="flex mt-5">
          {children.map((child) => (
            <TouchableOpacity
              onPress={onClick}
              key={child.id}
              className="flex rounded-md px-5 mb-5 ml-4"
            >
              <Text className="text-md font-light tracking-widest text-gray-500">
                {child.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function SearchScreen({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoriesData[0].id);
  const [activeSubCategory, setActiveSubCategory] = useState(
    forHerCategories[0].id
  );

  const navigateToCategoryScreen = () => {};

  const handlePressCategory = (id) => {
    navigation.navigate("Category", { id });
  };

  return (
    <>
      <View className="bg-white flex-1 h-full">
        <View className=" pb-3 px-4">
          <Text className="text-3xl font-light text-gray-500 tracking-widest">
            SEARCH
          </Text>
          <View className="relative">
            <Text className="absolute top-1/2 transform -translate-x-1/2 left-4 z-10">
              <Feather name="search" size={16} color="#333" />
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md px-10 py-4 mt-4 bg-[#F5F5F5]"
              placeholder="Search"
              keyboardAppearance="dark"
              onChangeText={(text) => setSearchValue(text)}
            />
          </View>
        </View>
        <View className="flex flex-row py-4">
          {categoriesData.map((category) => (
            <TouchableOpacity
              key={category.id}
              className="flex-1 flex flex-col items-center justify-center border-b border-gray-400 "
              onPress={() => setActiveCategory(category.id)}
            >
              <View
                className={
                  activeCategory === category.id
                    ? "text-[#333] font-semibold border-b-[3px] border-[#333] pb-4 z-10 -mb-[2px] rounded-xs"
                    : "text-[#999] font-normal pb-4 "
                }
              >
                <Text
                  className={
                    activeCategory === category.id
                      ? "text-[#333] font-semibold "
                      : "text-[#999] font-normal "
                  }
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="px-4">
          {forHerCategories.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              icon={<category.icon />}
              children={category.children}
              onClick={() => handlePressCategory(category.id)}
              activeCategory={activeSubCategory}
              navigateToCategoryScreen={navigateToCategoryScreen}
            />
          ))}
        </View>
      </View>
    </>
  );
}
