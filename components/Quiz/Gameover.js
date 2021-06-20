import React from "react";

import { Button, Modal, Text } from "@ui-kitten/components";
import { Banner } from "../../lib";

export const GameoverModal = ({ setIsGameoverModal, navigation }) => {
  const goBack = () => {
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
      <Button onPress={() => goBack()} style={{ borderRadius: 0 }} size="giant">
        <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>RETRY</Text>
      </Button>
      <Button onPress={() => goBack()} style={{ borderRadius: 0 }} size="giant">
        <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>RETRY</Text>
      </Button>
      <Button onPress={() => goBack()} style={{ borderRadius: 0 }} size="giant">
        <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>RETRY</Text>
      </Button>
      <Button onPress={() => goBack()} style={{ borderRadius: 0 }} size="giant">
        <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>RETRY</Text>
      </Button>
    </Modal>
  );
};
