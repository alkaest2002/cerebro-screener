import { col as i18n } from "@/i18n/it/tasks";
import { leftPadValue, clone } from "@/utils/utilityFns";
import {
  computeTotalItems,
  computeTotalDuration,
} from "@/views/tasks/_composables/taskSetupUtilityFunctions";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// function to generate cards
const generateCards = (amount) =>
  Array.from({ length: 25 }, () => {
    return { isCovered: true, amount };
  });

// base items
const baseItems = [
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
    loseAt: 8,
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

// task items
const taskItems = baseItems.map((item, index) => {
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
});

// demo items
const demoItems = [
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
      loseAt: 8,
      cards: generateCards(15),
      totalAmount: 0,
      flippedAmounts: [],
      outcome: null,
      hint: i18n["demo.001"].itemData.hint,
    },
    timer: {},
  },
];

// blocks
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
          description: i18n["instruction.001"].itemData.description,
          scoring: i18n["instruction.001"].itemData.scoring,
          duration: 0,
          items: taskItems.length,
          images: [
            {
              src: i18n["instruction.001"].itemData.images[0].src,
              description:
                i18n["instruction.001"].itemData.images[0].description,
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
    items: demoItems,
  },
  {
    id: "block.003",
    type: "items",
    timer: {},
    items: taskItems,
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

// update instrunctions data
blocks[0].items.forEach((e) => e.itemData.duration = computeTotalDuration([blocks[2]]));

// export total number of items
export const totalItems = computeTotalItems(blocks);

// export total duration
export const totalDurantion = computeTotalDuration(blocks);

// export getTaskData function
export const getTaskData = () => {
  // clone blocks
  const clonedBlocks = clone(blocks);
  // get presenters
  const presenters = makePresenters(clonedBlocks);
  // return data
  return { blocks: clonedBlocks, presenters };
};

// export get task answers function
export const getTaskAnswers = (answers) => {
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
