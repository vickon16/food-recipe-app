import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import Categories from "@/components/Categories";
import axios from "axios";
import Recipes from "@/components/Recipes";
import Loading from "@/components/Loading";

const App = () => {
  const [activeCategory, setActiveCategory] = React.useState("Beef");
  const [categories, setCategories] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);
  const [isFetchingCategories, setIsFetchingCategories] = React.useState(false);
  const [isFetchingRecipes, setIsFetchingRecipes] = React.useState(false);

  const getCategories = async () => {
    setIsFetchingCategories(true);
    try {
      const response = await axios(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories || []);
      }
    } catch (error: any) {
      console.log("error", error.message);
    } finally {
      setIsFetchingCategories(false);
    }
  };

  const getRecipes = async (category: string) => {
    setIsFetchingRecipes(true);
    try {
      const response = await axios(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setRecipes(response.data.meals || []);
      }
    } catch (error: any) {
      console.log("error", error.message);
    } finally {
      setIsFetchingRecipes(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getRecipes(activeCategory);
  }, [activeCategory]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-6 mx-4"
      >
        <View className="flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <FontAwesome6 name="bell" size={hp(3)} color="gray" />
        </View>

        <View className="space-y-2 mb-2">
          <CustomText hpSize={2.5} className="text-neutral-600">
            Hello, Victor
          </CustomText>
          <CustomText hpSize={3.5} className="font-semibold text-neutral-600">
            Make your own food
          </CustomText>
          <CustomText hpSize={3.3} className=" text-neutral-600">
            Stay at{" "}
            <CustomText hpSize={3.5} className="font-bold text-amber-400">
              home
            </CustomText>
          </CustomText>
        </View>

        <View className="my-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe..."
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7), fontFamily: "SourGummy" }}
            className="flex-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-2.5">
            <FontAwesome6 name="magnifying-glass" size={hp(2.3)} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <View className="my-4">
          {isFetchingCategories ? (
            <Loading />
          ) : categories.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <CustomText hpSize={2} className="text-neutral-600">
                No categories found
              </CustomText>
            </View>
          ) : (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View className="my-4">
          {isFetchingRecipes ? (
            <Loading />
          ) : recipes.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <CustomText hpSize={2} className="text-neutral-600">
                No Recipe found
              </CustomText>
            </View>
          ) : (
            <Recipes recipes={recipes} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
