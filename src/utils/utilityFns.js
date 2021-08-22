import { cloneDeep } from "lodash";
import { isRef, isReactive, toRaw } from "vue";

// Fisher Yates shuffle algorithm
const fisherYatesShuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// shuffle with possibility of fixing some position
// a = array
// b = array of trues (element is fixed) and falses (element is free to be shuffled)
export const shuffle = (a, f = Array.from({ length: a }, () => false)) => {
  let elements = a.reduce(
    (acc, e, i) => !f[i] ? [...acc, e] : acc, []
  );
  elements = fisherYatesShuffle(elements);
  return a.map((e, i) => (f[i] ? e : elements.splice(0,1)[0]));
};

// left pad numbers: 1 --> 001
export const leftPadValue = (value, padLength = 3, padValue = 0) => {
  return String(value).padStart(padLength, String(padValue));
};

// format time
export const formatTime = (value) => {
  if (typeof value != "number") return value;
  return new Date(parseInt(value) * 1000).toISOString().substr(11, 8);
};

// format timer time
export const formatTimerTime = (value) =>
  `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(
    value % 60
  ).padStart(2, "0")}`;

// deep clone objects
export const clone = (o) => {
  if (typeof o != "object") return o;
  let unwrappedObject = isRef(o) ? o.value : o;
  unwrappedObject = isReactive(unwrappedObject)
    ? toRaw(unwrappedObject)
    : unwrappedObject;
  return cloneDeep(unwrappedObject);
};
