import { leftPadValue, clone } from "@/utils/utilityFns";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// items
const items = [[1], [2], [3]];

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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          scoring: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          duration: 60,
          items: 3,
          images: [],
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
        canGoForth: true,
        isLocked: false,
        itemData: {
          actions: 0,
          hint: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.003",
    type: "items",
    timer: {
      timeLimit: 60,
      alertThreshold: 3,
    },
    items: items.map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "item";
      itemObject.canGoBack = true;
      itemObject.canGoForth = true;
      itemObject.isLocked = false;
      itemObject.itemData = {
        fakeProp: item,
        actions: 0,
        isCorrect: false,
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          scoring: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          duration: 30,
          items: 3,
          images: [],
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
        component: "demo",
        canGoBack: true,
        canGoForth: true,
        isLocked: false,
        itemData: {
          actions: 0,
          hint: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.006",
    type: "items",
    timer: {
      timeLimit: 10,
      alertThreshold: 3,
    },
    items: items.map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "item";
      itemObject.canGoBack = true;
      itemObject.canGoForth = true;
      itemObject.isLocked = false;
      itemObject.itemData = {
        fakeProp: item,
        actions: 0,
        isCorrect: false,
      };
      itemObject.timer = {};
      return { ...itemObject };
    }),
  },
  {
    id: "block.007",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          scoring: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          duration: 15,
          items: 3,
          images: [],
          actions: 0,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.008",
    type: "demo",
    timer: {},
    items: [
      {
        id: "demo.001",
        component: "demo",
        canGoBack: true,
        canGoForth: true,
        isLocked: false,
        itemData: {
          actions: 0,
          hint: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.009",
    type: "items",
    timer: {},
    items: items.map((item, index) => {
      let itemObject = {};
      itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
      itemObject.component = "item";
      itemObject.canGoBack = false;
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        fakeProp: item,
        isCorrect: false,
        actions: 0,
      };
      itemObject.timer = {
        timeLimit: 5,
        alertThreshold: 3,
      };
      return { ...itemObject };
    }),
  },
  {
    id: "block.010",
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
    id: "block.011",
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
