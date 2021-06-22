import React, { useCallback } from "react";
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
import {
  BackgroundGradient,
  BackgroundCardGradient,
} from "../../components/Common";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");
const stageCountryItems = getStageItems(false);
const stageCapitalItems = getStageItems(true);

export const Quiz = ({ navigation }) => {
  const navi = (stage, isCapital) => {
    Sound.playSound("click");
    const items = getStage(stage);
    navigation.push("Play", { items, stage, isCapital });
  };
  const _renderItem = useCallback(({ item }) => {
    return (
      <Card style={styles.renderView}>
        <BackgroundCardGradient />
        <TouchableOpacity
          style={{ borderRadius: 20 }}
          activeOpacity={0.5}
          onPress={() => navi(item.link, item.isCapital)}
        >
          <Text style={styles.renderText}>{item.title}</Text>
          <View style={styles.renderImage}>
            <Image
              source={item.image}
              style={{
                width: 160,
                height: 160,
              }}
            />
          </View>
        </TouchableOpacity>
      </Card>
    );
  }, []);
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
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
};

const styles = StyleSheet.create({
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
});
