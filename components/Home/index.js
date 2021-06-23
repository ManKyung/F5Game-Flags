import React from "react";
import { View } from "react-native";
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#222B45",
        }}
      >
        <Cat />
      </View>
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
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
      </Layout>
    </>
  );
};
