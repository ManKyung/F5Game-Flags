import { Vibration } from "react-native";
import { Audio } from "expo-av";

const clickSoundFile = require("../assets/mp3/click.mp3");
const okSoundFile = require("../assets/mp3/ok.mp3");
const wrongSoundFile = require("../assets/mp3/wrong.mp3");

let clickSound = null;
let okSound = null;
let wrongSound = null;
export const soundInit = async () => {
  const { sound: clickObject } = await Audio.Sound.createAsync(clickSoundFile);
  const { sound: okObject } = await Audio.Sound.createAsync(okSoundFile);
  const { sound: wrongObject } = await Audio.Sound.createAsync(wrongSoundFile);
  clickSound = clickObject;
  okSound = okObject;
  wrongSound = wrongObject;
};

export const Sound = {
  isSound: true,
  setSound(boolean) {
    this.isSound = boolean;
    if (this.isSound) {
      this.playSound("click");
    }
  },
  async playSound(type) {
    if (!this.isSound) {
      if (type === "wrong") {
        Vibration.vibrate();
      }
      return;
    }

    // click, ok, wrong
    switch (type) {
      case "click":
        await clickSound.replayAsync();
        break;
      case "ok":
        await okSound.replayAsync();
        break;
      case "wrong":
        await wrongSound.replayAsync();
        break;
    }
  },
};
