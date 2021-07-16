import { srv as i18n } from "@/i18n/it/tasks";
import { clone } from "@/utils/utilityFns";
import {
  computeTotalItems,
  computeTotalDuration,
} from "@/views/tasks/_composables/taskSetupUtilityFunctions";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// base items
const questions = {
  q1: null,
  q2: null,
  q3: null,
};

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
          items: Object.keys(questions).length,
          images: [],
          actions: 0,
        },
        timer: {},
      },
    ],
  },
  {
    id: "block.002",
    type: "survey",
    timer: {},
    items: [
      {
        id: "survey.001",
        component: "survey",
        canGoBack: false,
        canGoForth: false,
        isLocked: false,
        itemData: questions,
        timer: {},
      },
    ],
  },
];

// export total number of items
export const totalItems = computeTotalItems(
  blocks,
  "survey",
  (e) => Object.keys(e.items[0].itemData).length
);

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
