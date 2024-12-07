import { View, Text } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <FontAwesome6
        name="spinner"
        size={hp(2.5)}
        color="gray"
        className="animate-spin"
      />
    </View>
  );
};

export default Loading;
