import React from "react";

import { View, StyleSheet } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";
import { Banner } from "../../lib";

export const GameClearModal = ({ setIsGameClearModal, navigation }) => {
  const goBack = () => {
    setIsGameClearModal(false);
    setIsGameover(true);
  };

  const goHome = () => {
    setIsGameClearModal(false);
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

      <View style={{ flexDirection: "row", flex: 1 }}>
        <Button onPress={() => goHome()} style={styles.button} size="giant">
          <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>NO</Text>
        </Button>
        <Button onPress={() => goBack()} style={styles.button} size="giant">
          <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>
            NEXT STAGE
          </Text>
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
