import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "expo-router";

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    const ring1Timeout = setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + hp(5))),
      100
    );
    const ring2Timeout = setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + hp(5.5))),
      300
    );

    const navigationTimeout = setTimeout(
      () => navigation.navigate("home"),
      2500
    );

    () => {
      clearTimeout(ring1Timeout);
      clearTimeout(ring2Timeout);
      clearTimeout(navigationTimeout);
    };
  }, []);

  return (
    <View className="flex-1 justify-center items-center gap-y-6 bg-amber-500">
      <StatusBar style="light" />

      <Animated.View
        className="bg-white/10 rounded-full"
        style={{ padding: ring2Padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full flex flex-col items-center justify-center"
          style={{ padding: ring1Padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      <View className="flex items-center space-y-3">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-extrabold text-white tracking-widest"
        >
          Foody
        </Text>
        <Text style={{ fontSize: hp(2) }} className="text-white">
          Food is always better with a recipe.
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
