import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SplashScreen } from "expo-router";

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const router = useRouter();
  const [loaded] = useFonts({
    SourGummy: require("../../assets/fonts/SourGummy-Regular.ttf"),
  });

  const loadedFunction = () => {
    SplashScreen.hideAsync();
    return setTimeout(() => router.replace("home"), 2500);
  };

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

    const navigationTimeout = loaded ? loadedFunction() : undefined;

    () => {
      clearTimeout(ring1Timeout);
      clearTimeout(ring2Timeout);
      clearTimeout(navigationTimeout);
    };
  }, [loaded]);

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
