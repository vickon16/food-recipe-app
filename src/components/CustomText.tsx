import { Text, type TextProps, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export type CustomTextProps = TextProps & {
  hpSize?: number;
};

export default function CustomText({
  hpSize = 2,
  children,
  ...rest
}: CustomTextProps) {
  return (
    <Text
      style={[
        { fontSize: hp(hpSize), fontFamily: "SourGummy" },
        rest.style ? rest.style : undefined,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
