import React from "react";
import LottieView from "lottie-react-native";

export const Fail = () => {
  return <LottieView source={require("./fail.json")} autoPlay loop />;
};
