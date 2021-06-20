import React, { useCallback, useEffect, useState } from "react";
import { Layout, Button } from "@ui-kitten/components";
import { Image, Dimensions, StyleSheet, Vibration } from "react-native";
import { getRandomNumber, shuffle } from "../../lib";
import { Time } from "./Time";
import { GameoverModal } from "./Gameover";
import { Sound } from "../../lib";

const screen = Dimensions.get("screen");
const imageWidth = screen.width - 40;
const imageHeight = imageWidth * 0.65;
const delayTime = 700;
let randomNumberItems = [];

export const PlayContent = ({ flagItems, setLife, life, navigation }) => {
  const [count, setCount] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isWrong, setIsWrong] = useState([false, false, false, false]);
  const [isGameover, setIsGameover] = useState(false);
  const [isGameoverModal, setIsGameoverModal] = useState(false);

  if (isStart) {
    // life = 3;
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

  if (isGameover) {
    console.log("gameover");
  }

  const changeButtonColor = (index, change) => {
    let d = isWrong;
    d[index] = change;
    setIsWrong([...d]);
  };

  const doPress = (item, index) => {
    if (item.index === flagItems[count].index) {
      Sound.playSound("ok");
      if (flagItems.length - 1 === count) {
        console.log("all clear");
      } else {
        setTimeout(() => {
          setCount(count + 1);
          setIsStart(true);
        }, delayTime);

        changeButtonColor(index, "answer");
      }
    } else {
      if (Sound.isSound) {
        Sound.playSound("wrong");
      } else {
        Vibration.vibrate();
      }
      setLife(life - 1);
      changeButtonColor(index, true);

      if (life - 1 === 0) {
        setTimeout(() => {
          setIsGameoverModal(true);
        }, 1000);
      }
    }

    setTimeout(() => {
      changeButtonColor(index, false);
    }, delayTime);
  };
  return (
    <>
      <Time setIsGameover={setIsGameover} />
      {/* <Button onPress={() => playSound()}>ttt</Button> */}
      <Layout style={styles.layout} level="2">
        <Image
          source={flagItems[count].image}
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
              onPress={() => doPress(flagItems[number], index)}
            >
              {flagItems[number]["name_kr"]}
            </Button>
          );
        })}
      </Layout>
      {isGameoverModal ? (
        <GameoverModal
          setIsGameoverModal={setIsGameoverModal}
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
