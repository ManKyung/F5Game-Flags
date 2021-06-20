import React, { useState, useLayoutEffect } from "react";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");
const defaultTime = 120;

export const Time = ({ setIsGameover }) => {
  const [progressCount, setProgressCount] = useState(1);
  const [timeLimit, setTimeLimit] = useState(defaultTime);

  useLayoutEffect(() => {
    const timer =
      timeLimit >= 0 &&
      setInterval(() => {
        setProgressCount(timeLimit / defaultTime);
        setTimeLimit(timeLimit - 1);
      }, 1000);
    if (timeLimit < 0) {
      setIsGameover(true);
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
