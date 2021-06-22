import { FLAGS } from "./data";
import { shuffle } from "./common";

const getLevelStage = (level) => {
  return FLAGS.filter((item) => item.level === level);
};
const getContinentStage = (continent) => {
  return FLAGS.filter((item) => item.continent === continent);
};
// const getCapitalStage = (capital) => {
// return FLAGS.filter((item) => item.capital === continent);
// };
const getALLStage = () => {
  return FLAGS;
};

export const getStage = (value) => {
  let stage = [];
  if (typeof value === "number") {
    stage = getLevelStage(value);
  } else if (value === "all" || value === "capital") {
    stage = getALLStage(value);
  } else {
    stage = getContinentStage(value);
  }
  return shuffle(stage);
};

export const getStageItems = (isCapital) => {
  return [
    {
      index: "1",
      link: 1,
      title: "LEVEL 1",
      image: require("../assets/images/stage/easy.png"),
      isCapital,
    },
    {
      index: "2",
      link: 2,
      title: "LEVEL 2",
      image: require("../assets/images/stage/medium.png"),
      isCapital,
    },
    {
      index: "3",
      link: 3,
      title: "LEVEL 3",
      image: require("../assets/images/stage/hard.png"),
      isCapital,
    },
    {
      index: "4",
      link: 4,
      title: "LEVEL 4",
      image: require("../assets/images/stage/crazy.png"),
      isCapital,
    },
    {
      index: "5",
      link: "Asia",
      title: "ASIA",
      image: require("../assets/images/stage/asia.png"),
      isCapital,
    },
    {
      index: "6",
      link: "America",
      title: "AMERICA",
      image: require("../assets/images/stage/america.png"),
      isCapital,
    },
    {
      index: "7",
      link: "Africa",
      title: "AFRICA",
      image: require("../assets/images/stage/africa.png"),
      isCapital,
    },
    {
      index: "8",
      link: "Europe",
      title: "EUROPE",
      image: require("../assets/images/stage/europe.png"),
      isCapital,
    },
    {
      index: "9",
      link: "Oceania",
      title: "OCEANIA",
      image: require("../assets/images/stage/oceania.png"),
      isCapital,
    },
    {
      index: "10",
      link: "all",
      title: "WORLD",
      image: require("../assets/images/stage/all.png"),
      isCapital,
    },
  ];
};
