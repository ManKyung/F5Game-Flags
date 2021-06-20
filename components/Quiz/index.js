import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Layout, Text } from "@ui-kitten/components";
import { Sound, CONTINENT, getStage } from "../../lib";

export const Quiz = ({ navigation }) => {
  const navi = (stage) => {
    Sound.playSound("click");
    const items = getStage(stage);
    navigation.push("Play", { items, stage });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Layout style={styles.layout}>
        {[1, 2, 3, 4].map((item, index) => (
          <Button
            key={index}
            onPress={() => navi(item)}
            style={styles.button}
            size="giant"
          >
            <Text style={styles.buttonText}>LEVEL {item}</Text>
          </Button>
        ))}
        {Object.entries(CONTINENT).map((item, index) => (
          <Button
            key={index}
            onPress={() => navi(item[1])}
            style={styles.button}
            size="giant"
          >
            <Text style={styles.buttonText}>{item[0]}</Text>
          </Button>
        ))}
        <Button onPress={() => navi("all")} style={styles.button} size="giant">
          <Text style={styles.buttonText}>RANDOM</Text>
        </Button>
        <StatusBar hidden={true} />
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    letterSpacing: 1,
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layout: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginVertical: 6,
  },
});
