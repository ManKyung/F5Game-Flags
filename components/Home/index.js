import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Layout } from "@ui-kitten/components";
import { Sound } from "../../lib";
import { Cat } from "../../assets/animations";
import GradientButton from "react-native-gradient-buttons";

export const Home = ({ navigation }) => {
  const navi = (stage) => {
    Sound.playSound("click");
    navigation.push(stage);
  };

  return (
    <>
      <Layout
        style={{
          flex: 1,
        }}
      >
        <View style={styles.view}>
          <Cat />
        </View>
        <View style={styles.view}>
          <GradientButton
            text="PLAY"
            width="70%"
            deepBlue
            onPressAction={() => navi("Quiz")}
            style={{
              marginBottom: 20,
            }}
          />
          <GradientButton
            text="DICTIONARY"
            width="70%"
            deepBlue
            onPressAction={() => navi("Dictionary")}
          />
          <StatusBar hidden={true} />
        </View>
      </Layout>
    </>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222B45",
  },
});
