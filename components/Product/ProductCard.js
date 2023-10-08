import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductToFavorite,
  getFavoriteProducts,
} from "../../redux/features/product/productSlice";

export default function ProductCard({ product, selectedProductView, onClick }) {
  const dispatch = useDispatch();
  const selectedFavorites = useSelector(getFavoriteProducts);
  const isFavorited = selectedFavorites.includes(product);

  return (
    <TouchableOpacity
      className={`${
        selectedProductView === "grid" ? "w-1/2" : "w-full"
      } flex flex-col justify-center border border-gray-300`}
      onPress={() => onClick(product)}
    >
      <View className="relative">
        <Image
          source={product.image}
          className={`${
            selectedProductView === "grid" ? "h-48" : "h-96"
          } w-full object-cover`}
        />
        <View className="absolute top-3 right-0 flex items-center flex-row justify-between w-full p-2">
          <TouchableOpacity
            onPress={() => dispatch(addProductToFavorite(product))}
          >
            <AntDesign
              name={isFavorited ? "star" : "staro"}
              size={24}
              color={"black"}
            />
          </TouchableOpacity>

          {product.discount && (
            <Text className="bg-gray-800 text-white px-3 py-1">
              {product.discount}%
            </Text>
          )}
        </View>
      </View>
      <View className="max-w-full p-3 h-36">
        {product.brand && (
          <Text className="text-sm text-gray-500">{product.brand}</Text>
        )}
        {product.name && (
          <Text className="text-lg text-gray-600 tracking-[0.75px] mt-2 font-normal ">
            {product.name}
          </Text>
        )}
        <View className="flex flex-row items-center justify-between w-full mt-2">
          <Text className="">
            {product.discount && (
              <Text className="text-sm text-gray-500 line-through">
                ${product.price - (product.price * product.discount) / 100}
              </Text>
            )}
          </Text>

          <Text className="text-lg tracking-wider text-danger font-bold ">
            ${product.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
