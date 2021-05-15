import { leftPadValue, clone } from "@/utils/utilityFns";
import {
  computeTaskTotalItems,
  computeTaskTotalDuration,
} from "@/views/tasks/_composables/taskSetupUtilityFunctions";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// base items
const baseItems = [[1], [2], [3]];

// task items - subtask one
const taskItemsSubtaskOne = baseItems.map((item, index) => {
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
});

// task items - subtask two
const taskItemsSubtaskTwo = [...taskItemsSubtaskOne];

// task items - subtask three
const taskItemsSubtaskThree = baseItems.map((item, index) => {
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
});

// demo items - subtask one
const demoItemsSubtaskOne = [
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
];

// demo items - subtasks two
const demoItemsSubtaskTwo = [...demoItemsSubtaskOne];

// demo items - subtasks three
const demoItemsSubtaskThree = [...demoItemsSubtaskOne];

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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          scoring: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          duration: 0,
          items: taskItemsSubtaskOne.length,
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
    items: demoItemsSubtaskOne,
  },
  {
    id: "block.003",
    type: "items",
    timer: {
      timeLimit: 60,
      alertThreshold: 3,
    },
    items: taskItemsSubtaskOne,
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
          duration: 0,
          items: taskItemsSubtaskTwo.length,
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
    items: demoItemsSubtaskTwo,
  },
  {
    id: "block.006",
    type: "items",
    timer: {
      timeLimit: 10,
      alertThreshold: 3,
    },
    items: taskItemsSubtaskTwo,
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
          duration: 0,
          items: taskItemsSubtaskThree.length,
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
    items: demoItemsSubtaskThree,
  },
  {
    id: "block.009",
    type: "items",
    timer: {},
    items: taskItemsSubtaskThree,
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

// export total number of items
export const totalItems = computeTaskTotalItems(blocks);

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
