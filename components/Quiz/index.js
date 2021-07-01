import React, { useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, Card, Layout } from "@ui-kitten/components";
import { BackgroundCardGradient } from "../../components/Common";
import { observer } from "mobx-react";
import {
  Sound,
  getStage,
  getStageItems,
  getStageItemsByColor,
} from "../../lib";
import Carousel from "react-native-snap-carousel";
import useStore from "../../stores";

const { width: screenWidth } = Dimensions.get("window");
const stageCountryItems = getStageItems(false);
const stageCapitalItems = getStageItems(true);
const stageColorItems = getStageItemsByColor();

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

const isColor = (obj) => {
  return obj.hasOwnProperty("gradientColor");
};

export const Quiz = observer(({ navigation }) => {
  const { score } = useStore();
  useEffect(() => {
    (async () => {
      await score.getScores("flag");
      await score.getScores("capital");
      await score.getScores("color");
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
      const isColorStage = isColor(item);
      const renderScoreItem = isColorStage
        ? score.colorScoreItems
        : item.isCapital
        ? score.capitalScoreItems
        : score.flagScoreItems;

      return (
        <Card style={styles.renderView}>
          <BackgroundCardGradient
            gradientColor={
              isColorStage ? item.gradientColor : ["#4F73C3", "#3C46A2"]
            }
          />
          <TouchableOpacity
            style={{ borderRadius: 20 }}
            activeOpacity={0.5}
            onPress={() => navi(item)}
          >
            <View
              style={
                !isColorStage
                  ? { flexDirection: "row", justifyContent: "space-between" }
                  : {
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }
              }
            >
              <Text
                style={
                  !isColorStage ? styles.renderText : styles.renderColorText
                }
              >
                {item.title}
              </Text>
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
            {!isColorStage ? (
              <View style={styles.renderImage}>
                <Image
                  source={item.image}
                  style={
                    isColorStage ? styles.clearColorImage : styles.stageImage
                  }
                />
              </View>
            ) : null}
          </TouchableOpacity>
        </Card>
      );
    },
    [score.flagScoreItems, score.capitalScoreItems, score.colorScoreItems]
  );
  return (
    <Layout style={styles.layout}>
      <StatusBar hidden={true} />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.view}>
            <Text style={styles.title}>Country</Text>
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
            <Text style={styles.title}>Capital</Text>
            <Carousel
              layout={"default"}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 80}
              data={stageCapitalItems}
              renderItem={_renderItem}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.title}>Colors</Text>
            <Carousel
              layout={"default"}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 80}
              data={stageColorItems}
              renderItem={_renderItem}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingVertical: 10,
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
  renderColorText: {
    marginTop: 70,
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
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
  clearColorImage: {
    marginTop: 40,
    width: 180,
    height: 120,
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
