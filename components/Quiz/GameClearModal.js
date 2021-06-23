import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Banner } from "../../lib";
import { Clear } from "../../assets/animations";
import { Interstitial } from "../../lib";

export const GameClearModal = ({ setIsGameClearModal, navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const goHome = () => {
    Interstitial();
    setTimeout(() => {
      setIsGameClearModal(false);
      navigation.goBack();
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1500);
  }, []);

  return (
    <View style={styles.wrap}>
      <View style={styles.firstView}>
        <Clear />
      </View>
      <View style={styles.secondeView}>
        <Banner bannerSize="mediumRectangle" />
        {isVisible ? (
          <View style={styles.buttonWrap}>
            <Button onPress={() => goHome()} style={styles.button} size="giant">
              <Text style={styles.buttonText}>Next Stage</Text>
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
