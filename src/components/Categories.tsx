import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomText from "./CustomText";
import Animated, { FadeInDown } from "react-native-reanimated";
import CachedImage from "./CachedImage";

type Props = {
  categories: any[];
  activeCategory: string;
  setActiveCategory: (val: string) => void;
};

const Categories = ({
  categories,
  activeCategory,
  setActiveCategory,
}: Props) => {
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      entering={FadeInDown.duration(500).springify()}
    >
      {categories.map((category, index) => {
        const isActive = category.strCategory === activeCategory;
        const activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
        return (
          <TouchableOpacity
            key={index}
            className="flex items-center gap-y-1 mr-4"
            onPress={() => setActiveCategory(category.strCategory)}
          >
            <View className={`rounded-full ${activeButtonClass}`}>
              <CachedImage
                uri={category.strCategoryThumb}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full"
              />
            </View>
            <CustomText hpSize={1.6} className="text-neutral-600">
              {category.strCategory}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </Animated.ScrollView>
  );
};

export default Categories;
