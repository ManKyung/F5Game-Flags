import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const BackgroundGradient = () => (
  <LinearGradient colors={["#26304F", "#353F5C"]} style={styles.background} />
);
export const BackgroundCardGradient = () => (
  <LinearGradient
    colors={["#4F73C3", "#3C46A2"]}
    style={{
      height: 250,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
    }}
  />
);

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
