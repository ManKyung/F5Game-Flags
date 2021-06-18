import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Layout, Text } from "@ui-kitten/components";

export const Home = ({ navigation: { navigate } }) => {
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
        onPress={() => navigate("Quiz")}
        status="primary"
        style={{ width: "100%", marginBottom: 30 }}
        size="giant"
      >
        PLAY
      </Button>
      <Button
        onPress={() => navigate("Dictionary")}
        style={{ width: "100%" }}
        size="giant"
      >
        DICTIONARY
      </Button>
      <StatusBar hidden={true} />
    </Layout>
  );
};
