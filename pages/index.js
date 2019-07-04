
import { useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import Polygoon from "../components/Polygoon";
import Header from "../components/Header";
import PurchaseButton from '../components/PurchaseButton'
import fetchPolygon from "../src/polygon";
import fetchColor from "../src/color";

// function drawInlineSVG(ctx, rawSVG, callback) {
//   const svgURL = new XMLSerializer().serializeToString(rawSVG);
//   const img = new Image();

//   img.onload = function () {
//     ctx.drawImage(this, 0, 0);
//     callback();
//   };

//   img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
// }

// function generatePNG() {
//   const rawSVG = document.querySelector('#svg');
//   const canvas = document.querySelector('#canvas');
//   const ctxt = canvas.getContext("2d");

//   drawInlineSVG(ctxt, rawSVG, function () {
//     // console.log(canvas.toDataURL());
//   });
// }

// Params
const [width, height] = [400, 300];

const Home = ({ coords, color }) => {

  let started;
  const start = useStoreActions(actions => actions.connect);

  useEffect(() => {
    if (!started)
      start();

    started = true;
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: 15 }}>
        <Polygoon color={color} coords={coords} width={width} height={height} />
      </div>
      <PurchaseButton goon={{ coords, color }} />
      <canvas id="canvas" width="400" height="300" style={{ display: 'block' }}></canvas>
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
