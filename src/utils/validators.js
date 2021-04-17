export const required = (value, voidValue, message) => {
  return !["", voidValue, undefined].includes(value)
    ? [null, null]
    : ["required", message];
};

export const strAlphabet = (value, message) => {
  return value && /^[a-zA-Z'\s]+$/.test(value)
    ? [null, null]
    : ["alphabet", message];
};

export const numRange = (value, min, max, message) => {
  return value && !isNaN(value) && value > min && value < max
    ? [null, null]
    : ["numRange", message];
};
