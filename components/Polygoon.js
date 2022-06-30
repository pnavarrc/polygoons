import { Component } from "react";
import { polygonCentroid } from "d3-polygon";
import Eyes from "./Eyes";
import Mouth from "./Mouth";

const randInt = (a, b) => Math.floor(a + (b - a) * Math.random());
const randChoice = (items) => items[randInt(0, items.length)];
const EYE_TYPES = Object.keys(Eyes);
const MOUTH_TYPES = Object.keys(Mouth);

class Polygoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eyeType: null,
      mouthType: null,
    };
  }

  componentDidMount() {
    this.setState({
      eyeType: randChoice(EYE_TYPES),
      mouthType: randChoice(MOUTH_TYPES),
    });
  }

  render() {
    const { width, height, coords, color } = this.props;
    const { eyeType, mouthType } = this.state;

    const points = coords.map((p) => `${p.x},${p.y}`).join(" ");
    const polygonCoords = coords.map((p) => [p.x, p.y]);

    const [cx, cy] = polygonCentroid(polygonCoords);

    if (!eyeType || !mouthType) return null;

    const RandomEyes = Eyes[eyeType];
    const RandomMouth = Mouth[mouthType];

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        id="svg"
      >
        <g transform="translate(5, 5)scale(0.95)">
          <polygon
            points={points}
            fill={color}
            stroke="#333"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g transform={`translate(${cx}, ${cy})`}>
            <g transform={"translate(-50, -20)"}>
              <RandomEyes />
            </g>
            <g transform={"translate(-50, 20)"}>
              <RandomMouth />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Polygoon;
