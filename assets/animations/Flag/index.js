import React from "react";
import LottieView from "lottie-react-native";

export const Flag = () => {
  return (
    <LottieView source={require("./flag.json")} autoPlay={true} loop={false} />
  );
};
