import { observable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    resolve(scores ? JSON.parse(scores) : initScore);
  });
};

const score = observable({
  flagScoreItems: {},
  capitalScoreItems: {},
  syncScore(name, scores) {
    if (name === "flag") {
      this.flagScoreItems = scores;
    } else if (name === "capital") {
      this.capitalScoreItems = scores;
    }
  },
  async getScores(name) {
    const scores = await getScores(name);
    console.log(scores);
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
