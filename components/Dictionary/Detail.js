import React, { useState, memo } from "react";
import {
  Text,
  Card,
  Button,
  Modal,
  List,
  ListItem,
} from "@ui-kitten/components";
import { CONTINENT_KR, CONTINENT_DETAIL_KR } from "../../lib";

import { StyleSheet, Image, Dimensions, View } from "react-native";

const screen = Dimensions.get("screen");
const imageWidth = screen.width > 400 ? 400 : screen.width - 100;
const imageHeight = imageWidth * 0.65;

const arePropsEqual = (prev, curr) => {
  return prev.visible === curr.visible;
};

export const DictionaryDetail = memo(
  ({ visible, setVisible, modalItem: item }) => {
    return (
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card status="primary">
          <Image
            source={item.image}
            style={{ width: imageWidth, height: imageHeight }}
          />
          <Text style={styles.listItem}>국가 : {item.name_kr}</Text>
          <Text style={styles.listItem}>국가(영문) : {item.name_en}</Text>
          <Text style={styles.listItem}>
            대륙 : {CONTINENT_KR[item.continent]} /{" "}
            {CONTINENT_DETAIL_KR[item.continent_detail]}
          </Text>
          <Button onPress={() => setVisible(false)}>CLOSE</Button>
        </Card>
      </Modal>
    );
  },
  arePropsEqual
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  listItem: {
    marginVertical: 6,
    // marginBottom: 4,
    // marginTop: 4,
  },
});
