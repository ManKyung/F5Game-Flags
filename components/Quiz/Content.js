import React, { useState, useEffect } from "react";
import { Layout, Button, Text } from "@ui-kitten/components";
import { Image, Dimensions, StyleSheet } from "react-native";
import { getRandomNumber, shuffle } from "../../lib";
import { GameoverModal } from "./GameoverModal";
import { GameClearModal } from "./GameClearModal";
import { Sound, Interstitial, flagColors } from "../../lib";
import useStore from "../../stores";

const screen = Dimensions.get("screen");
const imageWidth = screen.width - 40;
const imageHeight = imageWidth * 0.65;
const delayTime = 700;
let randomNumberItems = [];

export const PlayContent = ({
  flagItems,
  setLife,
  life,
  navigation,
  isCapital,
  score: scoreKey,
}) => {
  const { score } = useStore();
  const scoreName = flagColors.includes(scoreKey)
    ? "color"
    : isCapital
    ? "capital"
    : "flag";
  const totalCount = flagItems.length;
  const [count, setCount] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isWrong, setIsWrong] = useState([false, false, false, false]);
  const [isGameover, setIsGameover] = useState(false);
  const [isGameoverModal, setIsGameoverModal] = useState(false);
  const [isGameClearModal, setIsGameClearModal] = useState(false);
  const [clearCount, setClearCount] = useState(0);

  useEffect(() => {
    if (isGameover) {
      Interstitial();
      setIsStart(true);
      setIsGameover(false);
      setLife(5);
      setClearCount(0);
      setCount(0);
    }
  }, [isStart, isGameover]);
  if (isStart) {
    randomNumberItems = [];
    randomNumberItems.push(count);
    while (randomNumberItems.length !== 4) {
      const randomNumber = getRandomNumber(0, flagItems.length);
      if (!randomNumberItems.includes(randomNumber)) {
        randomNumberItems.push(randomNumber);
      }
    }
    randomNumberItems = shuffle(randomNumberItems);
    setIsStart(false);
  }

  const changeButtonColor = (index, change) => {
    let d = isWrong;
    d[index] = change;
    setIsWrong([...d]);
  };

  const doPress = (item, index) => {
    if (item.index === flagItems[count].index) {
      Sound.playSound("ok");
      setClearCount(clearCount + 1);
      if (flagItems.length - 1 === count) {
        setTimeout(() => {
          setIsGameClearModal(true);
          score.setScore(scoreName, scoreKey);
        }, 700);
      } else {
        setTimeout(() => {
          setCount(count + 1);
          setIsStart(true);
        }, delayTime);
        changeButtonColor(index, "answer");
      }
    } else {
      Sound.playSound("wrong");

      setLife(life - 1);
      changeButtonColor(index, true);

      if (life - 1 === 0) {
        setTimeout(() => {
          setIsGameoverModal(true);
        }, 700);
      }
    }

    setTimeout(() => {
      changeButtonColor(index, false);
    }, delayTime);
  };
  return (
    <>
      <Layout style={styles.layout} level="2">
        <Text category="h3">
          {clearCount} / {totalCount}
        </Text>
        <Image
          source={flagItems[count].image}
          style={{
            width: imageWidth,
            height: imageHeight,
            resizeMode: "stretch",
            marginBottom: 40,
            marginTop: 20,
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
              onPress={() => doPress(flagItems[number], index)}
            >
              {isCapital
                ? flagItems[number]["capital_kr"]
                : flagItems[number]["name_kr"]}
            </Button>
          );
        })}
      </Layout>
      {isGameoverModal ? (
        <GameoverModal
          setIsGameoverModal={setIsGameoverModal}
          setIsGameover={setIsGameover}
          navigation={navigation}
        />
      ) : null}
      {isGameClearModal ? (
        <GameClearModal
          setIsGameClearModal={setIsGameClearModal}
          navigation={navigation}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginVertical: 6,
  },
});
