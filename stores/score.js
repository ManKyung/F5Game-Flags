import { observable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initColorScore = {
  red: {
    level: 1,
    count: [],
  },
  orange: {
    level: 1,
    count: [],
  },
  yellow: {
    level: 1,
    count: [],
  },
  green: {
    level: 1,
    count: [],
  },
  blue: {
    level: 1,
    count: [],
  },
  white: {
    level: 1,
    count: [],
  },
  black: {
    level: 1,
    count: [],
  },
};

const initScore = {
  level1: {
    level: 1,
    count: [],
  },
  level2: {
    level: 1,
    count: [],
  },
  level3: {
    level: 1,
    count: [],
  },
  level4: {
    level: 1,
    count: [],
  },
  asia: {
    level: 1,
    count: [],
  },
  america: {
    level: 1,
    count: [],
  },
  africa: {
    level: 1,
    count: [],
  },
  europe: {
    level: 1,
    count: [],
  },
  oceania: {
    level: 1,
    count: [],
  },
  world: {
    level: 1,
    count: [],
  },
};

const getScores = (name) => {
  return new Promise(async (resolve) => {
    const scores = await AsyncStorage.getItem(`f5_${name}_scores`);
    resolve(
      scores
        ? JSON.parse(scores)
        : name === "color"
        ? initColorScore
        : initScore
    );
  });
};

const score = observable({
  flagScoreItems: {},
  capitalScoreItems: {},
  colorScoreItems: {},
  syncScore(name, scores) {
    if (name === "flag") {
      this.flagScoreItems = scores;
    } else if (name === "capital") {
      this.capitalScoreItems = scores;
    } else if (name === "color") {
      this.colorScoreItems = scores;
    }
  },
  async getScores(name) {
    const scores = await getScores(name);
    runInAction(() => {
      this.syncScore(name, scores);
    });
  },
  async setScore(name, stage) {
    let scores = await getScores(name);
    if (scores[stage].level === 4 && scores[stage].count.length === 3) {
      return;
    }

    scores[stage].count.push(true);
    if (scores[stage].count.length === 4) {
      scores[stage].count = [true];
      scores[stage].level = scores[stage].level + 1;
    }
    await AsyncStorage.setItem(`f5_${name}_scores`, JSON.stringify(scores));
    runInAction(() => {
      this.syncScore(name, scores);
    });
  },
});

export default score;
