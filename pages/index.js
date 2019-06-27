import axios from "axios";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import Polygoon from "../components/Polygoon";
import Header from "../components/Header";

// Params
const [width, height] = [400, 300];

const Home = ({ coords, color }) => {
  return (
    <div>
      <Header />
      <Polygoon color={color} coords={coords} width={width} height={height} />
    </div>
  );
};

const x = p => p.x;
const y = p => p.y;

const randInt = (a, b) => a + (b - a) * Math.random();

const transformPoints = (points, xT, yT) =>
  points.map(({ x, y }) => ({ x: xT(x), y: yT(y) }));

const normalizePolygon = (width, height, coords) => {
  const xRange = extent(coords, x);
  const yRange = extent(coords, y);

  const xScale = scaleLinear()
    .domain(xRange)
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(yRange)
    .range([height, 0]);

  return transformPoints(coords, xScale, yScale);
};

Home.getInitialProps = async () => {
  const minSides = randInt(3, 7);
  const maxSides = minSides + randInt(1, 10);

  const params = {
    count: 1,
    minSides,
    maxSides,
    width,
    height
  };

  const { data } = await axios.get("https://api.noopschallenge.com/polybot", { params });
  const [coords] = data.polygons;
  const nPoints = normalizePolygon(width, height, coords);

  const { data: dataHex } = await axios.get("https://api.noopschallenge.com/hexbot", {
    params: { count: 1 }
  });
  const [color] = dataHex.colors;

  return {
    coords: nPoints,
    color: color.value
  };
};

export default Home;
