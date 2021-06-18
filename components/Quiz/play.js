import React, { useState, useLayoutEffect } from "react";
import {
  Icon,
  Layout,
  Text,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  Button,
  TopNavigationAction,
  Divider,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { View, Image, Dimensions, StyleSheet, Vibration } from "react-native";
import { Banner, Interstitial, getRandomNumber, shuffle } from "../../lib";
import * as Progress from "react-native-progress";
import { Wrong } from "../../assets/animations";

const screen = Dimensions.get("screen");
const imageWidth = screen.width - 40;
const imageHeight = imageWidth * 0.65;
const delayTime = 700;

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

let randomNumberItems = [];
export const Play = ({ navigation, route }) => {
  const { items, stage } = route.params;

  const [count, setCount] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [isWrong, setIsWrong] = useState([false, false, false, false]);
  const [progressCount, setProgressCount] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10 * 5);

  if (isStart) {
    randomNumberItems = [];
    randomNumberItems.push(count);
    while (randomNumberItems.length !== 4) {
      const randomNumber = getRandomNumber(0, items.length);
      if (!randomNumberItems.includes(randomNumber)) {
        randomNumberItems.push(randomNumber);
      }
    }
    randomNumberItems = shuffle(randomNumberItems);
    setIsStart(false);
  }
  useLayoutEffect(() => {
    const timer =
      timeLimit > 0 &&
      setInterval(() => {
        // 120 : 60 = 1 : ?
        const sc = timeLimit / (10 * 5);
        console.log(sc);
        setTimeLimit(timeLimit - 1);
        setProgressCount(sc);
      }, 200);

    if (!isStart && timeLimit === 0) {
      setTimeout(() => {
        setProgressCount(0);
      }, 0);
      console.log("gameover");

      // doGameOver();
      // setTimeout(() => {
      // 	setGameOverModalButtonVisible(true);
      // }, 2000);
    }
    return () => clearInterval(timer);
  }, [timeLimit]);

  const changeButtonColor = (index, change) => {
    let d = isWrong;
    d[index] = change;
    setIsWrong([...d]);
  };

  const doPress = (item, index) => {
    if (item.index === items[count].index) {
      if (items.length - 1 === count) {
        console.log("all clear");
      } else {
        setTimeout(() => {
          setCount(count + 1);
          setIsStart(true);
        }, delayTime);

        changeButtonColor(index, "answer");
      }
    } else {
      changeButtonColor(index, true);
    }

    setTimeout(() => {
      changeButtonColor(index, false);
    }, delayTime);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderBackAction = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </>
  );

  return (
    <Layout style={styles.container}>
      <StatusBar hidden={true} />
      <TopNavigation
        title={() => (
          <Text category="h5" style={styles.title}>
            {stage} QUIZ
          </Text>
        )}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Progress.Bar
        progress={progressCount}
        borderWidth={1}
        height={4}
        borderRadius={1}
        animationType={"timing"}
        color={"#6B799D"}
        width={screen.width}
      />
      <Layout style={styles.layout} level="2">
        <Image
          source={items[count].image}
          style={{
            width: imageWidth,
            height: imageHeight,
            resizeMode: "stretch",
            marginBottom: 40,
          }}
        />
        {randomNumberItems.map((number, index) => {
          return (
            <Button
              key={index}
              style={styles.button}
              status={
                isWrong[index] === false
                  ? "primary"
                  : isWrong[index] === "answer"
                  ? "success"
                  : "danger"
              }
              appearance="filled"
              onPress={() => doPress(items[number], index)}
            >
              {items[number]["name_kr"]}
            </Button>
          );
        })}
      </Layout>
      <Layout>
        {/* {isWrongVisible ? <Wrong /> : null} */}
        <Wrong />
      </Layout>
      <Banner />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layout: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginTop: -4,
    letterSpacing: 1,
  },
  button: {
    width: "100%",
    marginVertical: 6,
  },
});
