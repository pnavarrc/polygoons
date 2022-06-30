const randInt = (a, b) => Math.round(a + (b - a) * Math.random());

const randArray = (n) =>
  Array(n)
    .fill(1)
    .map(() => Math.random());

export { randInt, randArray };
