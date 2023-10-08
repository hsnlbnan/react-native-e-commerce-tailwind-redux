import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { SIZES } from "../variables";
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket } from "../redux/features/basket/basketSlice";

export default function ProductDetailScreen(
  { route } // 1. Get the params
) {
  const dispatch = useDispatch();

  const product = route.params.product;

  const [selectedSize, setSelectedSize] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  const windowWidth = Dimensions.get("window").width;

  const handleAddToCart = () => {
    dispatch(
      addProductToBasket({
        ...product,
        selectedSize,
        quantity: parseInt(quantity),
      })
    );
  };

  const t = useSelector((state) => state.basketSlice);

  console.log("In the basket", t);

  return (
    <SafeAreaView>
      <View>
        <Image source={product.image} className={`h-96 w-full object-cover`} />
        <ScrollView className="max-w-full  bg-white h-full">
          <Text className="text-lg text-gray-600 tracking-[0.75px] mt-1 font-normal px-3">
            {product.brand}
          </Text>
          <Text className="text-xl text-gray-600 mt-1 tracking-[0.75px] font-normal px-3">
            {product.name}
          </Text>

          <View
            className={`
            flex flex-row mt-4 w-full border-b border-gray-200 pb-5  px-3
            ${product.discount ? "justify-between" : "justify-end"} `}
          >
            {product.discount && (
              <Text className="text-lg text-gray-600 tracking-[0.75px] mt-2 font-normal line-through">
                AED {product.price - (product.price * product.discount) / 100}
              </Text>
            )}

            <Text className="text-2xl text-red-600 tracking-[0.75px] mt-2 font-bold ">
              AED {product.price}
            </Text>
          </View>

          <View className="flex mt-6 w-full justify-between  px-3">
            <Text className="text-lg text-gray-600 tracking-[0.75px] mt font-normal">
              Select a size
            </Text>
            <View className="flex flex-row flex-wrap gap-1 mt-2">
              {SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  className={`${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } border border-black flex w-[68px] h-8 items-center justify-center rounded-md`}
                  onPress={() => {
                    if (selectedSize === size) {
                      setSelectedSize("");
                    } else {
                      setSelectedSize(size);
                    }
                  }}
                >
                  <Text
                    className={`${
                      selectedSize === size ? "text-white" : "text-black"
                    } text-sm font-medium`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex flex-row mt-6 w-full justify-between items-center p-0 h-16">
            <View
              className="flex flex-row p-0"
              style={{ width: (windowWidth * 3) / 9 }}
            >
              <TextInput
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(Number(text))}
                className="bg-[#F5F5F5] w-full h-16 text-2xl text-center"
              />
            </View>

            <TouchableOpacity
              className="flex items-center justify-center w-3/4 p-1 h-16 
                border border-black bg-[#333333]"
              style={{ width: (windowWidth * 6) / 9 }}
              onPress={handleAddToCart}
            >
              <Text className="text-white text-xl ">ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
