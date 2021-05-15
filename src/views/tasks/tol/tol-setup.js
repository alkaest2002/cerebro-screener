import { tol as i18n } from "@/i18n/it/tasks";
import { leftPadValue, clone } from "@/utils/utilityFns";
import {
  computeTaskTotalItems,
  computeTaskTotalDuration,
} from "@/views/tasks/_composables/taskSetupUtilityFunctions";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// items
const items = [
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [[], ["green", "blue"], ["red"]],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["green"], ["red"], ["blue"]],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["blue", "green"], ["red"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["green"], ["blue", "red"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["green", "red"], ["blue"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["blue", "green"], ["red"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["blue", "red"], [], ["green"]],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [[], ["blue", "red"], ["green"]],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["blue", "green", "red"], [], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["green", "blue", "red"], [], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["green", "blue"], ["red"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["blue", "red"], ["green"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["red", "green", "blue"], [], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["red"], ["blue", "green"], []],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [["blue"], ["green"], ["red"]],
    ],
    timer: {},
  },
  {
    towers: [
      [["red", "green"], ["blue"], []],
      [[], ["red", "green"], ["blue"]],
    ],
    timer: {},
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
          description: i18n["instruction.001"].itemData.description,
          scoring: i18n["instruction.001"].itemData.scoring,
          duration: 0,
          items: 16,
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
    items: [
      {
        id: "demo.001",
        component: "demo",
        canGoBack: true,
        canGoForth: false,
        isLocked: false,
        itemData: {
          startTower: [["blue", "red"], [], ["green"]],
          endTower: [["red"], ["blue"], ["green"]],
          userTower: [[], [], []],
          actions: 0,
          isCorrect: false,
          hint: i18n["demo.001"].itemData.hint,
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
      itemObject.canGoBack = false;
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        startTower: item.towers[0],
        endTower: item.towers[1],
        userTower: [[], [], []],
        actions: 0,
        isCorrect: false,
      };
      itemObject.timer = item.timer;
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

// export build answers data function
export const buildAnswersFn = (answers) => {
  // process answers
  const processedAnswers = processAnswers
    .chain(answers)
    .keepDefaultProps()
    .computeDuration()
    .omitSpecifiedItemDataProps(["towerStart"])
    .flatten()
    .getData();
  // return processed answers
  return processedAnswers;
};
