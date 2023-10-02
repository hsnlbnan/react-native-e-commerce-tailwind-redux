import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import ProductCard from "../components/Product/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getColors,
  getProductView,
  getSize,
  getSortValue,
  setColors,
  setProductView,
} from "../redux/features/general/generalSlice";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheet } from "../components";
import { SORT_VALUES } from "../variables";

const productsData = [
  {
    id: 1,
    name: "REID Lace-Up Shoes Multi",
    brand: "Aldo",
    price: 100,
    image: require("../assets/products/1.png"),
    size: [38, 39, 40, 41, 42, 43, 44],
    colors: ["#FF5A5A", "#2878D5"],
  },
  {
    id: 2,
    name: "Prayrien Low Top Sneakers-Black",
    brand: "Aldo",
    price: 50,
    discount: 10,
    size: [39],
    colors: ["#FF5A5A"],
    image: require("../assets/products/2.png"),
  },
  {
    id: 3,
    name: "OLIRANG-Genda",
    brand: "Aldo",
    price: 50,
    discount: 10,
    size: [39, 40, 41],
    colors: ["#2878D5", "#FFFFFF"],
    image: require("../assets/products/3.png"),
  },
  {
    id: 4,
    name: "Prayrien Low Top Sneakers-Black",
    brand: "Aldo",
    price: 50,
    discount: 10,
    size: [39, 40, 41],
    colors: ["#2878D5", "#000000", "#FFFFFF"],
    image: require("../assets/products/4.png"),
  },
  {
    id: 5,
    name: "Prayrien Low Top Sneakers-Black",
    brand: "Aldo",
    price: 10,
    discount: 10,
    size: [39, 40, 41],
    colors: ["#2878D5", "#000000"],
    image: require("../assets/products/5.png"),
  },
];

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const selectedProductView = useSelector(getProductView);

  const bottomSheetModalRef = React.useRef(null);

  const snapPoints = React.useMemo(() => ["25%", "90%"], []);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = React.useCallback((index) => {}, []);

  const sortedValue = useSelector(getSortValue);
  const size = useSelector(getSize);

  const [changedProductData, setChangedProductData] =
    React.useState(productsData);

  React.useEffect(() => {
    if (sortedValue === SORT_VALUES.POPULARITY) {
      setChangedProductData(productsData);
    } else if (sortedValue === SORT_VALUES.PRICE_HIGH_LOW) {
      setChangedProductData(
        productsData.sort((a, b) => (a.price > b.price ? -1 : 1))
      );
    } else if (sortedValue === SORT_VALUES.PRICE_LOW_HIGH) {
      setChangedProductData(
        productsData.sort((a, b) => (a.price > b.price ? 1 : -1))
      );
    } else if (sortedValue === SORT_VALUES.NEWEST_FIRST) {
      setChangedProductData(
        productsData.sort((a, b) => (a.id > b.id ? -1 : 1))
      );
    }
  }, [sortedValue]);

  React.useEffect(() => {
    if (size.length === 0) {
      setChangedProductData(productsData);
    } else {
      const filteredData = productsData.filter((product) => {
        return product.size.some((r) => size.includes(r));
      });
      setChangedProductData(filteredData);
    }
  }, [size]);

  const selectedColors = useSelector(getColors);

  React.useEffect(() => {
    if (selectedColors.length === 0) {
      setChangedProductData(productsData);
    } else {
      const filteredData = productsData.filter((product) => {
        return product.colors.some((r) => selectedColors.includes(r));
      });
      setChangedProductData(filteredData);
    }
  }, [selectedColors]);

  const handleNavigateProductDetail = (product) => {
    navigation.navigate("ProductDetailScreen", { product });
  };

  return (
    <BottomSheetModalProvider>
      <View className="flex flex-row flex-wrap justify-between bg-white h-full flex-1">
        <SafeAreaView>
          <Text className="text-lg font-light text-left py-7 px-5 tracking-widest">
            All Products
          </Text>
          <View className="flex flex-row justify-between items-center px-5 mb-3">
            <TouchableOpacity
              onPress={handlePresentModalPress}
              className="border border-black inline-flex w-24 items-center flex-row text-center justify-center p-2 "
            >
              <AntDesign name="filter" size={16} color="black" />
              <Text className="text-sm font-medium text-black ml-2">
                Filter
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row justify-between items-center gap-2">
              <TouchableOpacity
                className={`${
                  selectedProductView === "list"
                    ? "bg-black text-white p-2"
                    : ""
                } border-black`}
                onPress={() => {
                  dispatch(setProductView("list"));
                }}
              >
                <Feather
                  name="list"
                  size={24}
                  color={selectedProductView === "list" ? "white" : "black"}
                  onPress={() => {
                    dispatch(setProductView("list"));
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  selectedProductView === "grid"
                    ? "bg-black text-white p-2"
                    : ""
                } border-black`}
                onPress={() => {
                  dispatch(setProductView("grid"));
                }}
              >
                <Feather
                  name="grid"
                  size={24}
                  color={selectedProductView === "grid" ? "white" : "black"}
                  onPress={() => {
                    dispatch(setProductView("grid"));
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
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
            {changedProductData?.length === 0 && (
              <View className="flex flex-row items-center justify-center w-full h-full">
                <Text className="text-lg font-light text-left py-7 px-5 tracking-widest">
                  No Products Found
                </Text>
              </View>
            )}

            {changedProductData?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedProductView={selectedProductView}
                onClick={() => handleNavigateProductDetail(product)}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheet bottomSheetModalRef={bottomSheetModalRef} />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
