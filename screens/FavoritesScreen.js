import { View, Text, SafeAreaView, FlatList, ScrollView } from "react-native";
import React from "react";
import { Header } from "../components";
import { useSelector } from "react-redux";
import { getFavoriteProducts } from "../redux/features/product/productSlice";
import ProductCard from "../components/Product/ProductCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FavoritesScreen() {
  const favoritedProducts = useSelector(getFavoriteProducts);

  const navigation = useNavigation();

  const handleNavigateProductDetail = (product) => {
    navigation.navigate("SearchProductDetail", { product });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Header />
      <View className="p-2 flex-1 h-full">
        {favoritedProducts.length > 0 ? (
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            className="flex flex-row flex-wrap w-full bg-white h-full flex-1"
            contentContainerStyle={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {favoritedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedProductView={"grid"}
                onClick={handleNavigateProductDetail}
              />
            ))}
          </ScrollView>
        ) : (
          <View className="flex  items-center justify-center w-full h-full">
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={32}
              color="#888"
            />
            <Text className="text-center text-gray-500 mt-4">
              Your favorites list is empty
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
