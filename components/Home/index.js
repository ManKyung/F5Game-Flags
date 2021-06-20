import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Layout } from "@ui-kitten/components";
import { Sound } from "../../lib";

export const Home = ({ navigation }) => {
  const navi = (stage) => {
    Sound.playSound("click");
    navigation.push(stage);
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Button
        onPress={() => navi("Quiz")}
        status="primary"
        style={{ width: "100%", marginBottom: 30 }}
        size="giant"
      >
        PLAY
      </Button>
      <Button
        onPress={() => navi("Dictionary")}
        style={{ width: "100%" }}
        size="giant"
      >
        DICTIONARY
      </Button>
      <StatusBar hidden={true} />
    </Layout>
  );
};
