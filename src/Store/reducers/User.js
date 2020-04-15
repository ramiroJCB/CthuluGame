const initialState = {
  Char: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_DATA":
      return { ...state, Char: payload };

    default:
      return state;
  }
};
