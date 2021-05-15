import { iow as i18n } from "@/i18n/it/tasks";
import { leftPadValue, shuffle, clone } from "@/utils/utilityFns";
import {
  computeTaskTotalItems,
  computeTaskTotalDuration,
} from "@/views/tasks/_composables/taskSetupUtilityFunctions";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// bechara scheme
let becharaItems = [
  {
    deckId: "A",
    cards: [
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -150 },
      { win: 100, lose: 0 },
      { win: 100, lose: -300 },
      { win: 100, lose: 0 },
      { win: 100, lose: -200 },
      { win: 100, lose: 0 },
      { win: 100, lose: -250 },
      { win: 100, lose: -350 },
      { win: 100, lose: 0 },
      { win: 100, lose: -350 },
      { win: 100, lose: 0 },
      { win: 100, lose: -250 },
      { win: 100, lose: -200 },
      { win: 100, lose: 0 },
      { win: 100, lose: -300 },
      { win: 100, lose: -150 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -300 },
      { win: 100, lose: 0 },
      { win: 100, lose: -350 },
      { win: 100, lose: 0 },
      { win: 100, lose: -200 },
      { win: 100, lose: -250 },
      { win: 100, lose: -150 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -350 },
      { win: 100, lose: -200 },
      { win: 100, lose: -250 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -150 },
      { win: 100, lose: -200 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
    ],
  },
  {
    deckId: "B",
    cards: [
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -1250 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -1250 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -1250 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: -1250 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
      { win: 100, lose: 0 },
    ],
  },
  {
    deckId: "C",
    cards: [
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: -25 },
      { win: 50, lose: -75 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -25 },
      { win: 50, lose: -75 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: -25 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -75 },
      { win: 50, lose: -50 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -25 },
      { win: 50, lose: -25 },
      { win: 50, lose: 0 },
      { win: 50, lose: -75 },
      { win: 50, lose: 0 },
      { win: 50, lose: -50 },
      { win: 50, lose: -75 },
    ],
  },
  {
    deckId: "D",
    cards: [
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -250 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -250 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -250 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: -250 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
      { win: 50, lose: 0 },
    ],
  },
];

// task cards
let becharaTaskCards = becharaItems.map((deck) => {
  return Object.assign({}, deck, {
    cards: [
      ...deck.cards.map((e, index) => Object.assign({ id: index + 1 }, e)),
      ...deck.cards.map((e, index) => Object.assign({ id: index + 41 }, e)),
      ...deck.cards.map((e, index) => Object.assign({ id: index + 81 }, e)),
    ].slice(0, 100),
  });
});

// demo cards
let becharaDemoCards = becharaItems.map((deck) => {
  return Object.assign({}, deck, {
    cards: [
      ...deck.cards.map((e, index) => Object.assign({ id: index + 1 }, e)),
    ].slice(0, 5),
  });
});

// shuffle bechara cards
becharaTaskCards = shuffle(becharaTaskCards);
becharaDemoCards = shuffle(becharaDemoCards);

// base items
const baseTaskitems = [
  {
    decks: [...becharaTaskCards],
    deckIds: [],
    wins: [],
    losses: [],
    netAmount: 0,
  },
];

// base demo items
const baseDemoItems = [
  {
    decks: [...becharaDemoCards],
    deckIds: [],
    wins: [],
    losses: [],
    netAmount: 0,
  },
];

// task items
const taskItems = baseTaskitems.map((item, index) => {
  let itemObject = {};
  itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
  itemObject.component = "item";
  itemObject.canGoBack = false;
  itemObject.canGoForth = false;
  itemObject.isLocked = false;
  itemObject.itemData = {
    ...item,
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
      ...baseDemoItems[0],
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
          items: taskItems[0].itemData.decks[0].cards.length,
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

// export total number of items
export const totalItems = computeTaskTotalItems(
  blocks,
  ["items"],
  (e) => e.items[0].itemData.decks[0].cards.length
);

// export total duration
export const totalDurantion = computeTaskTotalDuration(blocks);

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
  // function to process itemData
  const itemDataFn = (block, index) => {
    return {
      deckId: block.itemData.deckIds[index],
      win: block.itemData.wins[index],
      loss: block.itemData.losses[index],
    };
  };

  // process answers
  const processedAnswers = processAnswers
    .chain(answers)
    .explodeBlock("demo.001", "demo", 5, itemDataFn)
    .explodeBlock("item.001", "items", 100, itemDataFn)
    .keepDefaultProps()
    .computeDuration()
    .omitSpecifiedItemDataProps()
    .flatten()
    .getData();
  // return processed answers
  return processedAnswers;
};
