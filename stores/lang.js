import { observable } from "mobx";

const lang = observable({
  value: "kr",
  setLang(value) {
    this.value = value;
  },
});

export default lang;
