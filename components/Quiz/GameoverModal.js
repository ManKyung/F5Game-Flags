import React from "react";

import { View, StyleSheet } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";
import { Banner } from "../../lib";

export const GameoverModal = ({
  setIsGameoverModal,
  setIsGameover,
  navigation,
}) => {
  const goBack = () => {
    setIsGameoverModal(false);
    setIsGameover(true);
  };

  const goHome = () => {
    setIsGameoverModal(false);
    navigation.goBack();
  };

  return (
    <Modal
      visible={true}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      style={{ padding: 10, paddingHorizontal: 0, paddingVertical: 0 }}
    >
      <Banner bannerSize="mediumRectangle" />

      <View style={{ flexDirection: "row" }}>
        <Button onPress={() => goHome()} style={styles.button}>
          <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>NO</Text>
        </Button>
        <Button onPress={() => goBack()} style={styles.button}>
          <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>RETRY</Text>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 0,
    flex: 1,
  },
});
