import { randArray, randInt } from "./rand";

const fetchPolygon = async () => {
  const minSides = randInt(3, 7);
  const maxSides = minSides + randInt(1, 10);
  const numSides = randInt(minSides, maxSides);

  const coords = randArray(numSides)
    .map((r) => 2 * Math.PI * r)
    .sort()
    .map((t) => ({ x: Math.cos(t), y: Math.sin(t) }));

  return [...coords, coords[0]];

  return coords;
};

export default fetchPolygon;
