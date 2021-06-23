import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, Card, Layout } from "@ui-kitten/components";
import { Sound, getStage, getStageItems } from "../../lib";
import { BackgroundCardGradient } from "../../components/Common";
import Carousel from "react-native-snap-carousel";
import { observer } from "mobx-react";
import useStore from "../../stores";

const { width: screenWidth } = Dimensions.get("window");
const stageCountryItems = getStageItems(false);
const stageCapitalItems = getStageItems(true);

const getScoreImage = (i) => {
  switch (i) {
    case 1:
      return require("../../assets/images/clear/clear_1.png");
    case 2:
      return require("../../assets/images/clear/clear_2.png");
    case 3:
      return require("../../assets/images/clear/clear_3.png");
    case 4:
      return require("../../assets/images/clear/clear_4.png");
  }
};

export const Quiz = observer(({ navigation }) => {
  const { score } = useStore();
  useEffect(() => {
    (async () => {
      await score.getScores("flag");
      await score.getScores("capital");
    })();
  }, []);
  const navi = (item) => {
    const { link: stage, isCapital, title, score } = item;
    Sound.playSound("click");
    const items = getStage(stage);
    navigation.push("Play", { items, stage, isCapital, title, score });
  };
  const _renderItem = useCallback(
    ({ item }) => {
      // const renderScoreItem = score.flagScoreItems;
      const renderScoreItem = item.isCapital
        ? score.capitalScoreItems
        : score.flagScoreItems;
      return (
        <Card style={styles.renderView}>
          <BackgroundCardGradient />
          <TouchableOpacity
            style={{ borderRadius: 20 }}
            activeOpacity={0.5}
            onPress={() => navi(item)}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.renderText}>{item.title}</Text>
              <View style={{ flexDirection: "row" }}>
                {Object.keys(renderScoreItem).length !== 0 &&
                  renderScoreItem[item.score].count.map((score, index) => {
                    const scoreImage = getScoreImage(
                      renderScoreItem[item.score].level
                    );
                    return (
                      <Image
                        key={index}
                        source={scoreImage}
                        style={styles.clearImage}
                      />
                    );
                  })}
              </View>
            </View>
            <View style={styles.renderImage}>
              <Image source={item.image} style={styles.stageImage} />
            </View>
          </TouchableOpacity>
        </Card>
      );
    },
    [score.flagScoreItems, score.capitalScoreItems]
  );
  return (
    <Layout style={styles.layout}>
      <StatusBar hidden={true} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.view}>
          <Text style={styles.title}>국가</Text>
          <Carousel
            layout={"default"}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 80}
            data={stageCountryItems}
            renderItem={_renderItem}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>수도</Text>
          <Carousel
            layout={"default"}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 80}
            data={stageCapitalItems}
            renderItem={_renderItem}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  },
  view: {
    flex: 1,
  },
  title: {
    color: "#f1f2f3",
    paddingLeft: 40,
    fontSize: 42,
    fontWeight: "bold",
  },
  renderView: {
    borderRadius: 20,
    minHeight: 250,
  },
  renderText: {
    color: "#f1f2f3",
    fontSize: 24,
    paddingLeft: 0,
    marginBottom: 24,
    fontWeight: "bold",
  },
  renderImage: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stageImage: {
    width: 160,
    height: 160,
  },
  clearImage: {
    marginLeft: 0,
    width: 30,
    height: 30,
  },
});
