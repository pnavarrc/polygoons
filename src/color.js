// import axios from "axios";

import { randInt } from "./rand";

const fetchColor = async () => {
  const colorList = [
    "#f94144",
    "#f3722c",
    "#f8961e",
    "#f9844a",
    "#f9c74f",
    "#90be6d",
    "#43aa8b",
    "#4d908e",
    "#577590",
    "#277da1",
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226",
  ];
  const colorIndex = randInt(0, colorList.length - 1);
  return colorList[colorIndex];
};

export default fetchColor;
