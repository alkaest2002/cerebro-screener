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
// b = array of trues (position is fixes) and falses (position is unfixed)
export const shuffle = (a, f = Array.from({ length: a }, () => false)) => {
  const list = a.reduce(
    (acc, e, i) => {
      if (!f[i]) {
        acc.pos.push(i);
        acc.unfixed.push(e);
      }
      return acc;
    },
    { pos: [], unfixed: [] }
  );
  list.pos = fisherYatesShuffle(list.pos);
  return a.map((e, i) => (f[i] ? e : list.unfixed[list.pos.indexOf(i)]));
};

// left pad numbers: 1 --> 001
export const leftPadValue = (value, padLength = 3, padValue = 0) => {
  return String(value).padStart(padLength, String(padValue));
};

// format time
export const formatTime = (value) => {
  if (typeof value != "number") return value;
  const date = new Date(0);
  date.setSeconds(value);
  return date.toISOString().substr(14, 5);
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
