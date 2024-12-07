import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import CachedImage from "@/components/CachedImage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import axios from "axios";
import Loading from "@/components/Loading";
import CustomText from "@/components/CustomText";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, {
  FadeIn,
  FadeInDown,
  SharedTransition,
} from "react-native-reanimated";

const RecipeDetails = () => {
  const route = useRoute();
  const item = (route?.params as any) || undefined; // Destructure the passed data'
  const [isFavorite, setIsFavorite] = React.useState(false);
  const navigation = useNavigation();
  const [mealsData, setMealsData] = React.useState<any | null>(null);
  const [isFetchingMeals, setIsFetchingMeals] = React.useState(false);

  const IngredientIndexes = (meal: any) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i < 20; i++) {
      if (!!meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const regExp = /[?&]v=([^&]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return match[1];
    }

    return undefined;
  };

  const getMealData = async (id: string) => {
    setIsFetchingMeals(true);
    try {
      const response = await axios(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMealsData(response.data.meals[0]);
      }
    } catch (error: any) {
      console.log("error", error.message);
    } finally {
      setIsFetchingMeals(false);
    }
  };

  useEffect(() => {
    item.idMeal && getMealData(item.idMeal);
  }, [item.idMeal]);

  if (!item) {
    return <View className="flex-1 items-center justify-center">No data</View>;
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StatusBar style="light" />

      <View className="flex-1 flex flex-row justify-center items-center">
        <CachedImage
          uri={item.strMealThumb}
          style={{ width: wp(98), height: hp(50) }}
          className="rounded-t-[30px] rounded-b-[40px] mt-1"
          sharedTransitionTag={item.strMeal}
        />
      </View>

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row flex justify-between items-center pt-12"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full bg-white size-10 flex items-center justify-center ml-4"
        >
          <FontAwesome6 name="chevron-left" size={hp(2.3)} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite((prev) => !prev)}
          activeOpacity={0.8}
          className="rounded-full bg-white size-10 flex items-center justify-center mr-4"
        >
          <FontAwesome
            name="heart"
            size={hp(2.3)}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      <View className="my-4">
        {isFetchingMeals ? (
          <Loading />
        ) : !mealsData ? (
          <View className="flex-1 items-center justify-center">
            <CustomText hpSize={2} className="text-neutral-600">
              No categories found
            </CustomText>
          </View>
        ) : (
          <View className="px-4 flex justify-between gap-y-4">
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(6)}
              className="space-y-2"
            >
              <CustomText hpSize={3} className="text-neutral-700 font-semibold">
                {mealsData.strMeal}
              </CustomText>
              <CustomText hpSize={2} className="text-neutral-500 font-medium">
                {mealsData.strArea}
              </CustomText>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(6)}
              className="flex-row justify-around"
            >
              <MiscComponent iconName="clock" info={"30"} subInfo="Mins" />
              <MiscComponent iconName="users" info={"03"} subInfo="Servings" />
              <MiscComponent iconName="clock" info={"103"} subInfo="Cals" />
              <MiscComponent
                iconName="cubes-stacked"
                info={""}
                subInfo="Easy"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(6)}
              className="gap-y-4"
            >
              <CustomText
                hpSize={2.5}
                className="text-neutral-700 font-semibold flex-1"
              >
                Ingredients
              </CustomText>
              <View className="gap-y-2">
                {IngredientIndexes(mealsData).map((index) => {
                  return (
                    <View key={index} className="flex-row gap-x-3 items-center">
                      <View
                        style={{ height: hp(1), width: hp(1) }}
                        className="bg-amber-300 rounded-full"
                      />
                      <View className="flex-row gap-x-2 items-center">
                        <CustomText
                          hpSize={1.7}
                          className="text-neutral-700 font-bold"
                        >
                          {mealsData[`strMeasure${index}`]}
                        </CustomText>
                        <CustomText hpSize={1.7} className="text-neutral-700">
                          {mealsData[`strIngredient${index}`]}
                        </CustomText>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(6)}
              className="gap-y-4"
            >
              <CustomText
                hpSize={2.5}
                className="text-neutral-700 font-semibold flex-1"
              >
                Instructions
              </CustomText>
              <CustomText
                hpSize={1.6}
                className="text-neutral-700 font-semibold flex-1"
              >
                {mealsData.strInstructions}
              </CustomText>
            </Animated.View>

            {/* Recipe Video */}
            {mealsData?.strYoutube && (
              <View className="gap-y-4">
                <CustomText hpSize={2.5} className="text-neutral-600">
                  Recipe Video
                </CustomText>
                <View>
                  <YoutubeIframe
                    videoId={getYoutubeVideoId(mealsData.strYoutube)}
                    height={hp(30)}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;

type Props = {
  iconName: string;
  iconColor?: string;
  info: string;
  subInfo: string;
};

export const MiscComponent = ({
  iconName,
  iconColor = "gray",
  info,
  subInfo,
}: Props) => {
  return (
    <View className="flex rounded-full bg-amber-300 p-2">
      <View
        style={{ height: hp(5), width: hp(5) }}
        className="bg-white rounded-full flex items-center justify-center"
      >
        <FontAwesome6 name={iconName} size={hp(3)} color={iconColor} />
      </View>
      <View className="flex items-center py-2 space-y-1">
        <CustomText className="text-neutral-700 font-bold">{info}</CustomText>
        <CustomText hpSize={1.3}>{subInfo}</CustomText>
      </View>
    </View>
  );
};
