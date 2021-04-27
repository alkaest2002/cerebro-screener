import { att as i18n } from "@/i18n/it/tasks";
import { leftPadValue, shuffle, clone } from "@/utils/utilityFns";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// init vars
const gridSizes = [16 * 3, 25 * 2, 36 * 2];
const baseSequence = Array.from(new Array(150), (val, index) => index + 1);

// items
const items = gridSizes.map((gridSize) => {
  let currentItem = {};
  let numbers = [...baseSequence].slice(0, gridSize);
  const sliceSize =
    numbers.length % 36 == 0 ? 36 : numbers.length % 25 == 0 ? 25 : 16;
  let final = [];
  for (let i = 0; i < numbers.length / sliceSize; i++) {
    const shuffled = shuffle(numbers.slice(i * sliceSize, (i + 1) * sliceSize));
    final = [...final, shuffled];
  }
  currentItem.numbers = final.flat();
  currentItem.errors = 0;
  currentItem.isCorrect = false;
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
          description: i18n["instruction.001"].itemData.description,
          scoring: i18n["instruction.001"].itemData.scoring,
          duration: 0,
          items: 3,
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
          numbers: [
            1,
            3,
            4,
            2,
            8,
            5,
            7,
            6,
            9,
            15,
            14,
            17,
            18,
            16,
            10,
            11,
            13,
            12,
          ],
          errors: 0,
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
        ...item,
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
  // return blocks and presenters
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
