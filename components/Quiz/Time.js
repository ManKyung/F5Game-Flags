import React, { useState, useLayoutEffect, useEffect } from "react";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");
const defaultTime = 120;

export const Time = ({ setIsTimeover, isGameClear, timeReset }) => {
  const [progressCount, setProgressCount] = useState(1);
  const [timeLimit, setTimeLimit] = useState(defaultTime);

  useEffect(() => {
    if (timeReset) {
      setProgressCount(1);
    }
  }, [timeReset]);

  useLayoutEffect(() => {
    const timer =
      timeLimit >= 0 &&
      setInterval(() => {
        setProgressCount(timeLimit / defaultTime);
        setTimeLimit(timeLimit - 1);
      }, 1000);
    if (timeLimit < 0) {
      setIsTimeover(true);
    }
    if (isGameClear) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLimit]);

  return (
    <>
      <Progress.Bar
        progress={progressCount}
        borderWidth={1}
        height={4}
        borderRadius={1}
        animationType={"timing"}
        color={"#6B799D"}
        width={screen.width}
      />
    </>
  );
};
