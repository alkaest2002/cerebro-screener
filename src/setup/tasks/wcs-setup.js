import { leftPadValue, shuffle, clone } from "@/utils/utilityFns";
import { wcsLang } from "@/lang/it/tasks";
import makePresenters from "./_composables/makePresenters";
import processAnswers from "./_composables/processAnswers";

// cards specs
const colors = ["red", "green", "blue", "yellow"];
const figures = ["circle", "star", "diamond", "cross"];
const numbers = ["one", "two", "three", "four"];

// obtain all 64 cards
const cardsAll = colors
  .map((c) => figures.map((f) => numbers.map((n) => [c, f, n])))
  .flat(2);

// remove stimulus cards
const cardsCleaned = cardsAll.filter(
  (c) =>
    [
      "redcircleone",
      "greenstartwo",
      "bluediamondthree",
      "yellowcrossfour",
    ].indexOf(c.join("")) === -1
);

// shuffle cards
const cardsCleanedShuffled = shuffle(cardsCleaned);

// get final cards
const cards = cardsCleanedShuffled.map((c) => {
  const item = {
    color: c[0],
    figure: c[1],
    number: c[2],
  };
  return { ...item };
});

const blocks = [
  {
    id: "block.001",
    type: "instructions",
    timer: {},
    items: [
      {
        id: "instruction.001",
        component: "instructions",
        canGoBack: false,
        canGoForth: true,
        isLocked: false,
        itemData: {
          description: wcsLang["instruction.001"].itemData.description,
          scoring: wcsLang["instruction.001"].itemData.scoring,
          duration: wcsLang["instruction.001"].itemData.duration,
          items: 60,
          images: [
            {
              src: "wcs/fig1.png",
              description: wcsLang["instruction.001"].itemData.images[0].description
            }
          ],
          actions: 0,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.002",
    type: "demo",
    timer: {},
    items: [
      {
        id: "demo.001",
        component: "demo",
        canGoBack: true,
        canGoForth: false,
        isLocked: false,
        itemData: {
          cards: [
            { color: "red", figure: "diamond", number: "two" },
            { color: "green", figure: "cross", number: "three" },
            { color: "blue", figure: "circle", number: "one" },
            { color: "yellow", figure: "circle", number: "two" },
            { color: "blue", figure: "cross", number: "two" },
            { color: "red", figure: "diamond", number: "four" },
          ],
          droppedCards: [],
          decks: [],
          initialRule: shuffle(["color", "figure", "number"])[0],
          rules: [],
          feedback: {
            index: null,
            message: null,
          },
          hint: wcsLang["demo.001"].itemData.hint
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.003",
    type: "items",
    timer: {},
    items: [1].map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "item";
      itemObject.canGoBack = true;
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        cards,
        droppedCards: [],
        decks: [],
        initialRule: shuffle(["color", "figure", "number"])[0],
        rules: [],
        feedback: {
          index: null,
          message: null,
        },
      };
      itemObject.timer = {};
      return { ...itemObject };
    }),
  },
  {
    id: "block.004",
    type: "end",
    timer: {},
    items: [
      {
        id: "end.001",
        component: "end",
        canGoBack: false,
        canGoForth: true,
        isLocked: false,
        itemData: {},
        timer: {},
      },
    ],
  },
  {
    id: "block.005",
    type: "survey",
    timer: {},
    items: [
      {
        id: "survey.001",
        component: "survey",
        canGoBack: false,
        canGoForth: false,
        isLocked: false,
        itemData: {
          q1: null,
          q2: null,
          q3: null,
        },
        timer: {},
      },
    ],
  },
];

export const getTaskData = () => {
  // clone blocks
  const clonedBlocks = clone(blocks);
  // get presenters
  const presenters = makePresenters(clonedBlocks);
  // return data
  return { blocks: clonedBlocks, presenters };
};

export const buildAnswersFn = (answers) => {
  // function to process itemData
  const itemDataFn = (block, index) => {
    return {
      cardIsCorrect: block.itemData.droppedCards[index],
      rule: block.itemData.rules[index] || block.itemData.initialRule,
    };
  };

  // process answers
  const processedAnswers = processAnswers
    .chain(answers)
    .explodeBlock("demo.001", "demo", 6, itemDataFn)
    .explodeBlock("item.001", "items", 60, itemDataFn)
    .keepDefaultProps()
    .computeDuration()
    .omitSpecifiedItemDataProps()
    .flatten()
    .getData();
  // return processed answers
  return processedAnswers;
};
