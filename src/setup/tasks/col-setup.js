import { leftPadValue, clone } from "@/utils/utilityFns";
import { colLang } from "@/lang/it/tasks";
import makePresenters from "./_composables/makePresenters";
import processAnswers from "./_composables/processAnswers";

// fn to generate cards
const generateCards = (amount) =>
  Array.from({ length: 25 }, () => {
    return { isCovered: true, amount };
  });

// items
const items = [
  {
    win: 15,
    lose: -300,
    loseCards: 1,
    loseAt: 14,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -300,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -300,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -300,
    loseCards: 1,
    loseAt: 6,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -300,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(25),
  },
  {
    win: 25,
    lose: -300,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -500,
    loseCards: 1,
    loseAt: 16,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -500,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -500,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(25),
  },
  {
    win: 25,
    lose: -500,
    loseCards: 1,
    loseAt: 12,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -500,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -500,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(15),
  },
];

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
          description: colLang["instruction.001"].itemData.description,
          scoring: colLang["instruction.001"].itemData.scoring,
          duration: colLang["instruction.001"].itemData.duration,
          items: 12,
          images: [
            {
              src: "col/fig1.png",
              description:
                colLang["instruction.001"].itemData.images[0].description,
            },
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
          win: 25,
          lose: -350,
          loseCards: 1,
          loseAt: 6,
          cards: generateCards(15),
          totalAmount: 0,
          flippedAmounts: [],
          outcome: null,
          hint: colLang["demo.001"].itemData.hint,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.003",
    type: "items",
    timer: {},
    items: items.map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "item";
      itemObject.canGoBack = true;
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        ...item,
        totalAmount: 0,
        flippedAmounts: [],
        outcome: null,
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
  // process answers
  const processedAnswers = processAnswers
    .chain(answers)
    .keepDefaultProps()
    .computeDuration()
    .omitSpecifiedItemDataProps()
    .flatten()
    .getData();
  // return processed answers
  return processedAnswers;
};
