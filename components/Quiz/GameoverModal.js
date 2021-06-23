import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Banner } from "../../lib";
import { Fail } from "../../assets/animations";

export const GameoverModal = ({
  setIsGameoverModal,
  setIsGameover,
  navigation,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const goReset = () => {
    setIsGameoverModal(false);
    setIsGameover(true);
  };

  const goHome = () => {
    setIsGameoverModal(false);
    navigation.goBack();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1500);
  }, []);

  return (
    <View style={styles.wrap}>
      <View style={styles.firstView}>
        <Fail />
      </View>
      <View style={styles.secondeView}>
        <Banner bannerSize="mediumRectangle" />
        {isVisible ? (
          <View style={styles.buttonWrap}>
            <Button onPress={() => goHome()} style={styles.button}>
              <Text style={styles.buttonText}>NO</Text>
            </Button>
            <Button onPress={() => goReset()} style={styles.button}>
              <Text style={styles.buttonText}>RETRY</Text>
            </Button>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 99,
    width: "100%",
    height: "100%",
  },
  firstView: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  secondeView: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonWrap: { flexDirection: "row", width: 300 },
  button: {
    paddingVertical: 15,
    borderRadius: 0,
    flex: 1,
  },
  buttonText: { letterSpacing: 1, fontWeight: "bold" },
});
