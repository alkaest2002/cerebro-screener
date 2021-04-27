import { mul as i18n } from "@/i18n/it/tasks";
import { leftPadValue, clone } from "@/utils/utilityFns";
import makePresenters from "../_composables/makePresenters";
import processAnswers from "../_composables/processAnswers";

// items
let items = [
  
];

items = items.map((item) => {
  let currentItem = {};
  currentItem.userFigure = {
    isLocked: false,
    figureType: `tiles-${item.tiles.length}`,
    figureTiles: ((numTiles) => {
      const tiles = [];
      for (let i = 0; i < numTiles; i++) {
        tiles.push({
          tileIndex: i,
          tileType: "figure",
          tileColor: "void",
          tileRotation: "clock-0",
        });
      }
      return [...tiles];
    })(item.tiles.length),
  };
  currentItem.endFigure = {
    isLocked: true,
    figureType: `tiles-${item.tiles.length}`,
    figureTiles: item.tiles.map((i) =>
      Object.assign({}, i, { tileType: "figure" })
    ),
  };
  currentItem.timer = item.timer;

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
          duration: i18n["instruction.001"].duration,
          items: 10,
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
          userFigure: {
            isLocked: false,
            figureType: "tiles-4",
            figureTiles: [
              {
                tileIndex: 0,
                tileType: "figure",
                tileColor: "void",
                tileRotation: "clock-0",
              },
              {
                tileIndex: 1,
                tileType: "figure",
                tileColor: "void",
                tileRotation: "clock-0",
              },
              {
                tileIndex: 2,
                tileType: "figure",
                tileColor: "void",
                tileRotation: "clock-0",
              },
              {
                tileIndex: 3,
                tileType: "figure",
                tileColor: "void",
                tileRotation: "clock-0",
              },
            ],
          },
          endFigure: {
            isLocked: true,
            figureType: "tiles-4",
            figureTiles: [
              {
                tileIndex: 0,
                tileType: "figure",
                tileColor: "yellow-blue",
                tileRotation: "clock-90",
              },
              {
                tileIndex: 1,
                tileType: "figure",
                tileColor: "yellow",
                tileRotation: "clock-0",
              },
              {
                tileIndex: 2,
                tileType: "figure",
                tileColor: "yellow",
                tileRotation: "clock-0",
              },
              {
                tileIndex: 3,
                tileType: "figure",
                tileColor: "yellow",
                tileRotation: "clock-0",
              },
            ],
          },
          isCorrect: false,
          actions: 0,
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
        endFigure: item.endFigure,
        userFigure: item.userFigure,
        isCorrect: false,
        actions: 0,
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
