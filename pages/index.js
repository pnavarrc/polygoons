import axios from "axios";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import Polygoon from "../components/Polygoon";
import Header from "../components/Header";
import fetchPolygon from "../src/polygon";
import fetchColor from "../src/color";

// Params
const [width, height] = [400, 300];

const Home = ({ coords, color }) => {
  return (
    <div>
      <Header />
      <div style={{ padding: 15 }}>
        <Polygoon color={color} coords={coords} width={width} height={height} />
      </div>

      <button id="button">generate png</button>
      <button id="button-share">share png</button>
      <canvas id="canvas" width={width} height={height} style={{display: 'block'}}></canvas>
      <script src="/static/script.js" />
    </div>
  );
};

const x = p => p.x;
const y = p => p.y;

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
  const coords = await fetchPolygon();
  const color = await fetchColor();
  const nPoints = normalizePolygon(width, height, coords);

  return {
    coords: nPoints,
    color
  };
};

export default Home;
