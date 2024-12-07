import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import MasonryList from "@react-native-seoul/masonry-list";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import CachedImage from "./CachedImage";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  recipes: any[];
};

const Recipes = ({ recipes }: Props) => {
  const navigation = useNavigation();
  return (
    <View className="gap-y-2">
      <CustomText hpSize={3} className="font-semibold text-neutral-600">
        Recipes
      </CustomText>
      <MasonryList
        data={recipes}
        keyExtractor={(item): string => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => (
          <CardItem key={i} item={item} index={i} navigation={navigation} />
        )}
        // refreshing={false}
        // onRefresh={() => {}}
        // onEndReached={() => {}}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Recipes;

type CardItemProps = {
  index: number;
  item: any;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

const CardItem = ({ index, item, navigation }: CardItemProps) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index + 100)
        .duration(600)
        .springify()
        .damping(5)}
    >
      <Pressable
        className="w-full flex justify-center mb-4 gap-y-2"
        style={{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        onPress={() => {
          // @ts-expect-error
          navigation.navigate("recipe-details", item);
        }}
      >
        <CachedImage
          uri={item.strMealThumb}
          className="w-full bg-black/5 rounded-[25px]"
          style={{ height: index % 3 === 0 ? hp(25) : hp(30) }}
          // this is the transition link to the recipe details screen
          sharedTransitionTag={item.strMeal}
        />
        <CustomText className="text-neutral-600">
          {item.strMeal.length > 20
            ? `${item.strMeal.slice(0, 20)}...`
            : item.strMeal}
        </CustomText>
      </Pressable>
    </Animated.View>
  );
};
