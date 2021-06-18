import { FLAGS } from "./data";
import { shuffle } from "./common";

const getLevelStage = (level) => {
  return FLAGS.filter((item) => item.level === level);
};
const getContinentStage = (continent) => {
  return FLAGS.filter((item) => item.continent === continent);
};
const getALLStage = () => {
  return FLAGS;
};

export const getStage = (value) => {
  let stage = [];
  switch (typeof value) {
    case "number":
      stage = getLevelStage(value);
      break;
    default:
      stage = value === "all" ? getALLStage() : getContinentStage(value);
      break;
  }
  return shuffle(stage);
};
