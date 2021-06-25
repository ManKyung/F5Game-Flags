import { FLAGS } from "./data";
import { shuffle } from "./common";

const getLevelStage = (level) => {
  return FLAGS.filter((item) => item.level === level);
};
const getContinentStage = (continent) => {
  return FLAGS.filter((item) => item.continent === continent);
};
const getColorStage = (color) => {
  return FLAGS.filter((item) => item.color.includes(color));
};
const getALLStage = () => {
  return FLAGS;
};

export const flagColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "white",
  "black",
];

export const getStage = (value) => {
  let stage = [];
  if (typeof value === "number") {
    stage = getLevelStage(value);
  } else if (value === "world" || value === "capital") {
    stage = getALLStage(value);
  } else if (flagColors.includes(value)) {
    stage = getColorStage(value);
  } else {
    stage = getContinentStage(value);
  }
  return shuffle(stage);
};

export const getStageItemsByColor = () => {
  return [
    {
      index: "1",
      link: "red",
      title: "RED",
      score: "red",
      image: require("../assets/images/flags/Flag_of_Turkey.png"),
      isCapital: false,
      gradientColor: ["#F37360", "#CA2128"],
    },
    {
      index: "2",
      link: "orange",
      title: "ORANGE",
      score: "orange",
      image: require("../assets/images/flags/Flag_of_Cyprus.png"),
      isCapital: false,
      gradientColor: ["#FABE52", "#D58013"],
    },
    {
      index: "3",
      link: "yellow",
      title: "YELLOW",
      score: "yellow",
      image: require("../assets/images/flags/Flag_of_Bhutan.png"),
      isCapital: false,
      gradientColor: ["#F0EA5A", "#e7de27"],
    },
    {
      index: "4",
      link: "green",
      title: "GREEN",
      score: "green",
      image: require("../assets/images/flags/Flag_of_Saudi_Arabia.png"),
      isCapital: false,
      gradientColor: ["#12b53c", "#09823F"],
    },
    {
      index: "5",
      link: "blue",
      title: "BLUE",
      score: "blue",
      image: require("../assets/images/flags/Flag_of_the_Federated_States_of_Micronesia.png"),
      isCapital: false,
      gradientColor: ["#1b64ef", "#134DCD"],
    },
    {
      index: "6",
      link: "white",
      title: "WHITE",
      score: "white",
      image: require("../assets/images/flags/Flag_of_South_Korea.png"),
      isCapital: false,
      gradientColor: ["#dddddd", "#cccccc"],
    },
    {
      index: "8",
      link: "black",
      title: "BLACK",
      score: "black",
      image: require("../assets/images/flags/Flag_of_Papua_New_Guinea.png"),
      isCapital: false,
      gradientColor: ["#303030", "#181011"],
    },
  ];
};

export const getStageItems = (isCapital) => {
  return [
    {
      index: "1",
      link: 1,
      title: "LEVEL 1",
      score: "level1",
      image: require("../assets/images/stage/easy.png"),
      isCapital,
    },
    {
      index: "2",
      link: 2,
      title: "LEVEL 2",
      score: "level2",
      image: require("../assets/images/stage/medium.png"),
      isCapital,
    },
    {
      index: "3",
      link: 3,
      title: "LEVEL 3",
      score: "level3",
      image: require("../assets/images/stage/hard.png"),
      isCapital,
    },
    {
      index: "4",
      link: 4,
      title: "LEVEL 4",
      score: "level4",
      image: require("../assets/images/stage/crazy.png"),
      isCapital,
    },
    {
      index: "5",
      link: "Asia",
      title: "ASIA",
      score: "asia",
      image: require("../assets/images/stage/asia.png"),
      isCapital,
    },
    {
      index: "6",
      link: "America",
      title: "AMERICA",
      score: "america",
      image: require("../assets/images/stage/america.png"),
      isCapital,
    },
    {
      index: "7",
      link: "Africa",
      title: "AFRICA",
      score: "africa",
      image: require("../assets/images/stage/africa.png"),
      isCapital,
    },
    {
      index: "8",
      link: "Europe",
      title: "EUROPE",
      score: "europe",
      image: require("../assets/images/stage/europe.png"),
      isCapital,
    },
    {
      index: "9",
      link: "Oceania",
      title: "OCEANIA",
      score: "oceania",
      image: require("../assets/images/stage/oceania.png"),
      isCapital,
    },
    {
      index: "10",
      link: "world",
      title: "WORLD",
      score: "world",
      image: require("../assets/images/stage/world.png"),
      isCapital,
    },
  ];
};
