import React, { ComponentProps, useEffect } from "react";
import { Image } from "react-native";
import Animated, { SharedTransition } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = ComponentProps<typeof Animated.Image> & {
  uri: string;
};

const getFileExtension = (url: string): string => {
  // Match file extension from the URL (e.g., .jpg, .png)
  const match = url.match(/\.(\w+)(\?|$)/);
  return match ? `.${match[1]}` : "";
};

// const CachedImage = (props: Props) => {
// const [cachedSource, setCachedSource] = React.useState(props.uri);

// useEffect(() => {
//   const getCachedImage = async () => {
//     try {
//       // Generate a hash-based file name
//       const fileExtension = getFileExtension(props.uri);
//       const fileName = await Crypto.digestStringAsync(
//         Crypto.CryptoDigestAlgorithm.SHA256,
//         props.uri
//       );
//       const filePath = `${FileSystem.documentDirectory}${fileName}${fileExtension}`;

//       // Check if the file exists
//       const fileInfo = await FileSystem.getInfoAsync(filePath);
//       if (fileInfo.exists) {
//         setCachedSource(filePath);
//       } else {
//         // Fetch the image from the remote source
//         const response = await fetch(props.uri);
//         const imageBlob = await response.blob();
//         const base64Image = await new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(imageBlob);
//           reader.onloadend = () => {
//             if (reader.result) {
//               resolve(reader.result.toString());
//             } else {
//               reject(new Error("Failed to convert blob to base64"));
//             }
//           };
//         });

//         // Write the base64 string to the file system
//         await FileSystem.writeAsStringAsync(
//           filePath,
//           base64Image.replace(/^data:image\/\w+;base64,/, ""),
//           { encoding: FileSystem.EncodingType.Base64 }
//         );
//         setCachedSource(filePath);
//         // // Download the image and save it directly
//         // await FileSystem.downloadAsync(props.uri, filePath);
//         // setCachedSource(filePath);
//       }
//     } catch (error) {
//       console.error("Error fetching and caching image:", error);
//     }
//   };

//   getCachedImage();
// }, []);

// return <Animated.Image source={{ uri: cachedSource }} {...props} />;
// };

const CachedImage = (props: Props) => {
  const [cachedSource, setCachedSource] = React.useState(props.uri);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(props.uri);
        if (cachedImageData) {
          setCachedSource(cachedImageData);
        } else {
          const response = await fetch(props.uri);
          const imageBlob = await response.blob();
          const base64Image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              if (reader.result) {
                resolve(reader.result.toString());
              } else {
                reject(new Error("Failed to convert blob to base64"));
              }
            };
          });
          await AsyncStorage.setItem(props.uri, base64Image);
          setCachedSource(base64Image);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getCachedImage();
  }, []);

  return <Animated.Image source={{ uri: cachedSource }} {...props} />;
};

export default CachedImage;
