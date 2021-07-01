import { observable } from "mobx";

const lang = observable({
  value: "en",
  setLang(value) {
    this.value = value;
  },
});

export default lang;
