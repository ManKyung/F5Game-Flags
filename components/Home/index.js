import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Layout } from "@ui-kitten/components";
import { Sound } from "../../lib";
import { Flag } from "../../assets/animations";
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
        <Flag />
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
        {/* <Button
          onPress={() => navi("Dictionary")}
          style={{ width: "100%" }}
          size="giant"
        >
          DICTIONARY
        </Button> */}
        <StatusBar hidden={true} />
      </Layout>
    </>
  );
};
