import PropTypes from "prop-types";

function Polygoon({ color, width, height }) {
  return (
    <div>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={color} />
      </svg>
    </div>
  );
}

Polygoon.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

Polygoon.defaultProps = {
  color: "#556270",
  height: 300,
  width: 400
};

export default Polygoon;
