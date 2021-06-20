import React, { useState, useLayoutEffect, useCallback } from "react";
import {
  Icon,
  Layout,
  Text,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Banner, Interstitial, Sound } from "../../lib";
import { PlayContent } from "./Content";

const HeartIcon = (props) => <Icon {...props} name="heart" fill="yellow" />;
// const HeartOutlineIcon = (props) => <Icon {...props} name="heart-outline" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const VolumeUpIcon = (props) => <Icon {...props} name="volume-up-outline" />;
const VolumeOffIcon = (props) => <Icon {...props} name="volume-off-outline" />;
const TVIcon = (props) => <Icon {...props} name="tv" />;
const GlobeIcon = (props) => <Icon {...props} name="globe" />;

export const Play = ({ navigation, route }) => {
  const { items, stage } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [life, setLife] = useState(10);
  const [soundText, setSoundText] = useState(
    Sound.isSound ? "Sound On" : "Sound Off"
  );

  const doSound = () => {
    Sound.setSound(!Sound.isSound);
    const text = Sound.isSound ? "Sound On" : "Sound Off";
    setSoundText(text);
  };

  let lifeArr = [];
  for (let i = 0; i < life; i++) {
    lifeArr.push(true);
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => {
    return (
      <>
        {lifeArr.map((_, index) => (
          <TopNavigationAction
            key={index}
            icon={HeartIcon}
            style={{ marginRight: -6 }}
          />
        ))}
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
        >
          <MenuItem
            accessoryLeft={Sound.isSound ? VolumeUpIcon : VolumeOffIcon}
            onPress={() => doSound()}
            title={soundText}
          />
          <MenuItem accessoryLeft={TVIcon} title="Get Coin" />
          <MenuItem accessoryLeft={GlobeIcon} title="Language" />
        </OverflowMenu>
      </>
    );
  };

  return (
    <Layout style={styles.container}>
      <StatusBar hidden={true} />
      <TopNavigation
        title={() => (
          <Text category="h5" style={styles.title}>
            LEVEL {stage}
          </Text>
        )}
        accessoryRight={renderRightActions}
      />
      <PlayContent
        navigation={navigation}
        flagItems={items}
        setLife={setLife}
        life={life}
      />

      <Banner />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    marginTop: -4,
    letterSpacing: 1,
  },
});
