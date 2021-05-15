import { mul as i18n } from "@/i18n/it/tasks";
import { leftPadValue, clone } from "@/utils/utilityFns";
import {
  computeTotalItems,
  computeTotalDuration,
} from "@/views/tasks/_composables/taskSetupUtilityFunctions";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// base items
let baseItems = [
  {
    gauges: [
      [10, 30, 20, 60, 40, 30],
      [12, 40, 10, 70, 50, 20],
      [30, 30, 20, 60, 40, 10],
      [20, 40, 30, 50, 50, 0],
      [60, 30, 20, 40, 40, 30],
      [70, 40, 60, 30, 50, 20],
      [60, 30, 50, 20, 40, 40],
      [20, 40, 30, 50, 50, 50],
      [10, 30, 40, 60, 40, 60],
      [20, 40, 10, 70, 50, 70],
    ],
    counter: [2.1, 2.2, 2.1, 3.2, 1.1, -1.2, 2.1, -3.2, 3.1, 3.2],
  },
  {
    gauges: [
      [10, 30, 20, 60, 40, 30],
      [12, 40, 10, 70, 50, 20],
      [30, 30, 20, 60, 40, 10],
      [20, 40, 30, 50, 50, 0],
      [60, 30, 20, 40, 40, 30],
      [70, 40, 60, 30, 50, 20],
      [60, 30, 50, 20, 40, 40],
      [20, 40, 30, 50, 50, 50],
      [10, 30, 40, 60, 40, 60],
      [20, 40, 10, 70, 50, 70],
    ],
    counter: [2.1, 2.2, 2.1, 3.2, 1.1, -1.2, 2.1, -3.2, 3.1, 3.2],
  },
  {
    gauges: [
      [10, 30, 20, 60, 40, 30],
      [12, 40, 10, 70, 50, 20],
      [30, 30, 20, 60, 40, 10],
      [20, 40, 30, 50, 50, 0],
      [60, 30, 20, 40, 40, 30],
      [70, 40, 60, 30, 50, 20],
      [60, 30, 50, 20, 40, 40],
      [20, 40, 30, 50, 50, 50],
      [10, 30, 40, 60, 40, 60],
      [20, 40, 10, 70, 50, 70],
    ],
    counter: [2.1, 2.2, 2.1, 3.2, 1.1, -1.2, 2.1, -3.2, 3.1, 3.2],
  },
];

// task items
const taskItems = baseItems.map((item, index) => {
  let itemObject = {};
  itemObject.id = `item.${leftPadValue(index + 1, 3, 0)}`;
  itemObject.component = "item";
  itemObject.canGoBack = false;
  itemObject.canGoForth = false;
  itemObject.isLocked = false;
  itemObject.itemData = {
    ...item,
    userGauges: null,
    userCounter: null,
    actions: 0,
  };
  itemObject.timer = item.timer;
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
      gauges: [
        [10, 30, 20, 60, 40, 30],
        [12, 40, 10, 70, 50, 20],
        [30, 30, 20, 60, 40, 10],
        [20, 40, 30, 50, 50, 0],
        [60, 30, 20, 40, 40, 30],
        [70, 40, 60, 30, 50, 20],
        [60, 30, 50, 20, 40, 40],
        [20, 40, 30, 50, 50, 50],
        [10, 30, 40, 60, 40, 60],
        [20, 40, 10, 70, 50, 70],
      ],
      counter: [2.1, 2.2, 2.1, 3.2, 1.1, -1.2, 2.1, -3.2, 3.1, 3.2],
      userGauges: null,
      userCounter: null,
      actions: 0,
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
