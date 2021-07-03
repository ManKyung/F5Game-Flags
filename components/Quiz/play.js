import React, { useState, useEffect } from "react";
import {
  Icon,
  Layout,
  Text,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Modal,
  Card,
  Radio,
  RadioGroup,
  Button,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { Banner, Sound, Rewared, langArr } from "../../lib";
import { PlayContent } from "./Content";
import useStore from "../../stores";

const HeartIcon = (props) => <Icon {...props} name="heart" fill="yellow" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const VolumeUpIcon = (props) => <Icon {...props} name="volume-up-outline" />;
const VolumeOffIcon = (props) => <Icon {...props} name="volume-off-outline" />;
const TVIcon = (props) => <Icon {...props} name="tv" />;
const GlobeIcon = (props) => <Icon {...props} name="globe" />;

export const Play = ({ navigation, route }) => {
  const { lang } = useStore();
  const { items, stage, isCapital, title, score } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [life, setLife] = useState(5);
  const [visible, setVisible] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundText, setSoundText] = useState(
    Sound.isSound ? "Sound On" : "Sound Off"
  );

  useEffect(() => {
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      setLife(5);
    });
  }, []);

  const setLanguage = (index) => {
    lang.setLang(langArr[index].key);
    setSelectedIndex(index);
  };

  const doSound = () => {
    Sound.setSound(!Sound.isSound);
    const text = Sound.isSound ? "Sound On" : "Sound Off";
    setSoundText(text);
  };

  const getLife = async () => {
    await Rewared();
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
          <MenuItem
            accessoryLeft={TVIcon}
            title="Get Life"
            onPress={() => getLife()}
          />
          <MenuItem
            accessoryLeft={GlobeIcon}
            title="Language"
            onPress={() => {
              setVisible(true);
              setMenuVisible(false);
            }}
          />
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
            {title}
          </Text>
        )}
        accessoryRight={renderRightActions}
      />
      <PlayContent
        navigation={navigation}
        flagItems={items}
        setLife={setLife}
        life={life}
        stage={stage}
        isCapital={isCapital}
        score={score}
      />

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ width: 200 }}>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setLanguage(index)}
          >
            {langArr.map((item, index) => (
              <Radio key={index}>{item.value}</Radio>
            ))}
          </RadioGroup>
          <Button size="small" onPress={() => setVisible(false)}>
            APPLY
          </Button>
        </Card>
      </Modal>
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
