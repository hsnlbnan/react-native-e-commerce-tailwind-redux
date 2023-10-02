import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import RadioGroup from "react-native-radio-buttons-group";
import { useDispatch, useSelector } from "react-redux";
import {
  getSize,
  getSortValue,
  setColors,
  setSize,
  setSortValue,
} from "../../redux/features/general/generalSlice";
import { COLORS, SIZES, SORT_VALUES } from "../../variables";

const radioButtons = [
  {
    id: SORT_VALUES.POPULARITY,
    label: "Popularity",
    value: "popularity",
  },
  {
    id: SORT_VALUES.PRICE_HIGH_LOW,
    label: "Price: High - Low",
    value: "priceHighLow",
  },
  {
    id: SORT_VALUES.PRICE_LOW_HIGH,
    label: "Price: Low - High",
    value: "priceLowHigh",
  },
  {
    id: SORT_VALUES.NEWEST_FIRST,
    label: "Newest First",
    value: "newestFirst",
  },
];

export default function BottomSheet({ bottomSheetModalRef }) {
  const [selectedId, setSelectedId] = React.useState();
  const [selectedSize, setSelectedSize] = React.useState([]);
  const [selectedColors, setSelectedColors] = React.useState([]);

  const dispatch = useDispatch();
  const sortValue = useSelector(getSortValue);
  const size = useSelector(getSize);

  React.useEffect(() => {
    if (sortValue) {
      setSelectedId(sortValue);
    }
  }, []);

  React.useEffect(() => {
    if (selectedId) {
      dispatch(setSortValue(selectedId));
    }
  }, [selectedId]);

  React.useEffect(() => {
    if (size) {
      setSelectedSize(size);
    }
  }, []);

  React.useEffect(() => {
    if (selectedSize.length > 0) {
      dispatch(setSize(selectedSize));
    }
  }, [selectedSize]);

  const isSelectedSize = (size) => {
    return selectedSize.includes(size);
  };

  const isSelectedColor = (color) => {
    return selectedColors.includes(color);
  };

  React.useEffect(() => {
    dispatch(setColors(selectedColors));
  }, [selectedColors]);

  const handleResetAll = () => {
    setSelectedId(null);
    setSelectedSize([]);
    setSelectedColors([]);

    dispatch(setSortValue(null));
    dispatch(setSize([]));
    dispatch(setColors([]));
  };

  return (
    <>
      <View className="flex flex-row items-center justify-between px-5 ">
        <Text className="text-2xl font-normal tracking-widest">Filters</Text>
        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mx-auto max-w-md w-full">
        <View className="border-b border-gray-200 pb-5">
          <Text className="text-lg font-light text-left py-4 px-8 tracking-widest">
            Sort By
          </Text>

          <View className="flex flex-row justify-between items-center px-5 mb-3">
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: 0,
                margin: 0,
                gap: 6,
              }}
              accessibilityLabel="sort by"
            />
          </View>
        </View>

        <View className="border-b border-gray-200 pb-5">
          <Text className="text-lg font-light text-left py-4 px-8 tracking-widest">
            Size
          </Text>

          <View className="flex flex-row flex-wrap gap-1 px-8 mb-3">
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                className={`${
                  isSelectedSize(size)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } border border-black flex w-[68px] h-8 items-center justify-center rounded-md`}
                onPress={() => {
                  if (selectedSize?.includes(size)) {
                    setSelectedSize(
                      selectedSize.filter((item) => item !== size)
                    );
                  } else {
                    setSelectedSize([...selectedSize, size]);
                  }
                }}
              >
                <Text
                  className={`${
                    isSelectedSize(size) ? "text-white" : "text-black"
                  } text-sm font-medium`}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="border-b border-gray-200 pb-5">
          <Text className="text-lg font-light text-left py-4 px-8 tracking-widest">
            Colors
          </Text>

          <View className="flex flex-row flex-wrap gap-4 px-8 mb-3">
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={{
                  backgroundColor: color,
                }}
                className={`${
                  isSelectedColor(color) ? "border border-gray-600" : ""
                }  

                flex w-10 h-10 items-center justify-center rounded-full shadow-md`}
                onPress={() => {
                  if (selectedColors?.includes(color)) {
                    setSelectedColors(
                      selectedColors.filter((item) => item !== color)
                    );
                  } else {
                    setSelectedColors([...selectedColors, color]);
                  }
                }}
              ></TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex mb-auto mt-28">
          <TouchableOpacity>
            <Text
              className="text-lg font-light text-left py-4 px-8 tracking-widest"
              onPress={handleResetAll}
            >
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
