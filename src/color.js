import axios from "axios";

const fetchColor = async () => {
  const { data: dataHex } = await axios.get("https://api.noopschallenge.com/hexbot", {
    params: { count: 1 }
  });
  const [color] = dataHex.colors;
  return color.value;
};

export default fetchColor;
