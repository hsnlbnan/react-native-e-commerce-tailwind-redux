import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCouponToBasket,
  changeCustomQuantity,
  decrementToProductQuantity,
  incrementToProductQuantity,
} from "../redux/features/basket/basketSlice";

export default function ProfileScreen() {
  const products = useSelector((state) => state.basketSlice);

  const [productsInBasket, setProductsInBasket] = React.useState([]);

  React.useEffect(() => {
    setProductsInBasket(products);
  }, [products]);

  const dispatch = useDispatch();

  const handleIncrementToProductQuantity = (product) => {
    dispatch(incrementToProductQuantity(product));
  };

  const handleDecrementToProductQuantity = (product) => {
    dispatch(decrementToProductQuantity(product));
  };

  const customProductQuantity = (product) => {
    dispatch(changeCustomQuantity(product));
  };

  const [coupon, setCoupon] = React.useState("");

  const subtotal = productsInBasket?.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const discount = productsInBasket?.reduce(
    (acc, product) =>
      acc +
      (product.discount
        ? (product.price * product.discount) / 100
        : product.price) *
        product.quantity,
    0
  );

  const vat = productsInBasket?.reduce(
    (acc, product) =>
      acc +
      (product.discount
        ? (product.price * product.discount) / 100
        : product.price) *
        product.quantity *
        0.05,
    0
  );

  const total = subtotal - discount + vat;

  const [appliedCoupon, setAppliedCoupon] = React.useState({
    message: "",
    discount: 0,
  });

  const handleCoupon = () => {
    if (coupon === "DISCOUNT") {
      setAppliedCoupon({
        message: "Coupon Applied",
        discount: 10,
      });
      dispatch(addCouponToBasket(coupon));
    } else {
      setAppliedCoupon({
        message: "Invalid Coupon",
        discount: 0,
      });
    }
  };

  return (
    <SafeAreaView className="flex flex-col bg-white h-full">
      <ScrollView className="flex flex-col">
        <View className="text-center w-full h-12 bg-[#333] flex items-center justify-center">
          <Text className="text-white font-bold tracking-wider">
            Shop for AED 75 more for free shipping
          </Text>
        </View>

        <View className="mt-3 h-10 text-center">
          <Text className="tracking-wider text-3xl font-normal text-center">
            My Cart
          </Text>
        </View>

        {productsInBasket.length > 0 ? (
          <>
            {productsInBasket?.map((product, index) => (
              <View
                className="flex flex-row w-full mt-3 px-3 bg-[#F5F5F5] p-3"
                key={index}
              >
                <Image
                  source={require("../assets/products/1-big.png")}
                  className="h-28 w-28 object-cover mr-2"
                />

                <View className="flex flex-col justify-between">
                  <Text className="text-[11px] text-[#6F7F8A] tracking-[0.75px] font-normal">
                    {product.brand}
                  </Text>

                  <Text className="text-[13px] text-[#333A3A] max-w-[200px] tracking-[0.75px] mt font-normal whitespace-pre-wrap">
                    {product.name}
                  </Text>

                  <Text className="text-[14px] text-[#6F7F8A] max-w-[200px] tracking-[0.75px] mt font-normal whitespace-pre-wrap">
                    Size: {product.size}
                  </Text>

                  <Text className="text-[15px] text-[#333] tracking-[0.75px] mt font-bold">
                    AED {product.price}
                  </Text>
                </View>

                <View className="flex flex-col justify-center ml-auto items-center">
                  <TouchableOpacity
                    className="bg-white border border-[#CDD7E0] w-8 h-8 flex items-center justify-center rounded-md"
                    onPress={() => handleIncrementToProductQuantity(product)}
                  >
                    <Text className="text-[#333] text-sm font-medium">+</Text>
                  </TouchableOpacity>
                  <TextInput
                    keyboardType="numeric"
                    className="text-lg text-gray-600 tracking-[0.75px] my-1 mb-2 font-normal"
                    value={product.quantity}
                    onChangeText={(text) =>
                      customProductQuantity({
                        id: product.id,
                        selectedSize: product.selectedSize,
                        quantity: text,
                      })
                    }
                  >
                    <Text>{product.quantity}</Text>
                  </TextInput>
                  <TouchableOpacity
                    className="bg-white border border-[#CDD7E0] w-8 h-8 flex items-center justify-center rounded-md"
                    onPress={() => handleDecrementToProductQuantity(product)}
                  >
                    <Text className="text-[#333] text-sm font-medium">-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View className="flex flex-row justify-between w-full h-16 items-center mt-5 px-2 mb-10">
              <TextInput
                placeholder="Enter Coupon Code"
                className="h-full  bg-[#F5F5F5] w-3/4 px-3 text-md tracking-widest p-3 "
                value={coupon}
                onChangeText={(text) => setCoupon(text)}
              ></TextInput>

              <TouchableOpacity
                className="flex items-center justify-center px-4 border border-[#333333] w-1/4 h-full"
                onPress={() => handleCoupon()}
              >
                <Text className="text-[#333333] text-md tracking-widest">
                  APPLY
                </Text>
              </TouchableOpacity>
            </View>

            {appliedCoupon.message !== "" && (
              <View className="flex flex-row justify-between w-full items-center  px-2 mb-10">
                <Text className="text-[#333333] text-md tracking-widest">
                  {appliedCoupon.message}
                </Text>
                <Text className="text-[#333333] text-md tracking-widest">
                  -{appliedCoupon.discount}%
                </Text>
              </View>
            )}

            <View className="flex flex-col p-3 bg-[#F5F5F5] mt-10 gap-3">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-[#333333] text-md tracking-widest">
                  Subtotal:
                </Text>
                <Text className="text-[#333333] text-md tracking-widest">
                  AED {subtotal}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-[#333333] text-md tracking-widest">
                  Discount
                </Text>
                <Text className="text-[#333333] text-md tracking-widest">
                  AED {discount}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-[#333333] text-md tracking-widest">
                  Vat
                </Text>
                <Text className="text-[#333333] text-md tracking-widest">
                  AED {vat}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-[#333333] text-md tracking-widest">
                  Total
                </Text>
                <Text className="text-[#333333] text-md tracking-widest">
                  AED {total}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View className="flex flex-col justify-center items-center mt-10">
            <Text className="text-[#333333] text-md tracking-widest">
              No Products in Cart
            </Text>
          </View>
        )}
      </ScrollView>
      {productsInBasket.length > 0 && (
        <View className="flex flex-row justify-between items-center gap-2 mt-auto h-16">
          <TouchableOpacity className="flex flex-row items-center w-full justify-center p-1 h-full bg-[#333333]">
            <Text className="text-white text-xl ">PROCEED TO PAYMENT</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
