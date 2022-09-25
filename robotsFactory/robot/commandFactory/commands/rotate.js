export const rotate = (state, delta) => {
  const cardinals = ["N", "E", "S", "W"];
  const modulo = (n, m) => ((n % m) + m) % m;
  state.orientation =
    cardinals[
      modulo(cardinals.indexOf(state.orientation) + delta, cardinals.length)
    ];
};
