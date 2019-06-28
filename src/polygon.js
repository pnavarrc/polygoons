import axios from "axios";
import { randInt } from "./rand";

const fetchPolygon = async () => {
  const minSides = randInt(3, 7);
  const maxSides = minSides + randInt(1, 10);

  const params = {
    count: 1,
    minSides,
    maxSides
  };

  const { data } = await axios.get("https://api.noopschallenge.com/polybot", { params });
  const [coords] = data.polygons;
  return coords;
};

export default fetchPolygon;
