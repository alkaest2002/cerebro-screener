import { leftPadValue, clone } from "@/utils/utilityFns";
import { memLang } from "@/lang/it/tasks";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

const numericalForward = [
  [3, 5, 8],
  [7, 4, 6, 9],
  [5, 3, 6, 1, 8],
  [3, 8, 2, 9, 7, 4],
  [7, 2, 3, 6, 1, 5, 9],
  [4, 6, 3, 7, 8, 9, 5, 1],
  [2, 5, 1, 4, 8, 7, 9, 3, 6],
];

const digitSpanItems = numericalForward.map((item) => {
  let currentItem = {};
  currentItem.sequence = item;
  currentItem.userSequence = [];
  currentItem.sequenceHasPlayed = false;
  currentItem.actions = 0;
  return { ...currentItem };
});

const corsiItems = numericalForward.map((item) => {
  let currentItem = {};
  currentItem.sequence = item;
  currentItem.userSequence = [];
  return { ...currentItem };
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
          description: memLang["ds"]["instruction.001"].itemData.description,
          scoring: memLang["ds"]["instruction.001"].itemData.scoring,
          duration: memLang["ds"]["instruction.001"].itemData.duration,
          items: 7,
          images: [
            {
              src: "mem/ds/fig1.png",
              description:
                memLang["ds"]["instruction.001"].itemData.images[0].description,
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
        component: "dsDemo",
        canGoBack: true,
        canGoForth: false,
        isLocked: false,
        itemData: {
          sequence: [4, 3, 1],
          userSequence: [],
          sequenceHasPlayed: false,
          actions: 0,
          hint: memLang["ds"]["demo.001"].itemData.hint,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.003",
    type: "items",
    timer: {},
    items: digitSpanItems.map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.ds.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "dsItem";
      itemObject.canGoBack = false;
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        ...item,
      };
      itemObject.timer = {};
      return { ...itemObject };
    }),
  },
  {
    id: "block.004",
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
          description: memLang["cb"]["instruction.001"].itemData.description,
          scoring: memLang["cb"]["instruction.001"].itemData.scoring,
          duration: memLang["cb"]["instruction.001"].itemData.duration,
          items: 7,
          images: [
            {
              src: "mem/cb/fig1.png",
              description:
                memLang["cb"]["instruction.001"].itemData.images[0].description,
            },
          ],
          actions: 0,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.005",
    type: "demo",
    timer: {},
    items: [
      {
        id: "demo.001",
        component: "cbDemo",
        canGoBack: true,
        canGoForth: true,
        isLocked: false,
        itemData: {
          sequence: [6, 9, 4],
          userSequence: [],
          hint: memLang["cb"]["demo.001"].itemData.hint,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.006",
    type: "items",
    timer: {},
    items: corsiItems.map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.cb.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "cbItem";
      itemObject.canGoBack = false;
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        ...item,
      };
      itemObject.timer = {};
      return { ...itemObject };
    }),
  },
  {
    id: "block.007",
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
