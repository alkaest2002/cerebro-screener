import { leftPadValue, clone } from "@/utils/utilityFns";
import makePresenters from "@/views/tasks/_composables/makePresenters";
import processAnswers from "@/views/tasks/_composables/processAnswers";

// items
const items = [
  {
    tiles: [
      [3, 2],
      [5, 4],
      [0, 6],
      [2, 1],
      [4, 3],
      [6, 5],
    ],
    targetTile: [1, 0],
  },
  {
    tiles: [
      [2, 1],
      [0, 6],
      [5, 4],
      [3, 2],
      [1, 0],
      [6, 5],
    ],
    targetTile: [4, 3],
  },
  {
    tiles: [
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
    ],
    targetTile: [0, 2],
  },
  {
    tiles: [
      [1, 1],
      [2, 2],
      [1, 3],
      [2, 4],
      [1, 5],
      [2, 6],
    ],
    targetTile: [1, 0],
  },
  {
    tiles: [
      [4, 6],
      [3, 0],
      [2, 1],
      [1, 2],
      [0, 3],
      [6, 4],
    ],
    targetTile: [5, 5],
  },
  {
    tiles: [
      [2, 4],
      [5, 0],
      [1, 3],
      [4, 6],
      [0, 2],
      [3, 5],
    ],
    targetTile: [6, 1],
  },
  {
    tiles: [
      [2, 6],
      [4, 4],
      [6, 2],
      [0, 0],
      [4, 2],
      [2, 4],
    ],
    targetTile: [0, 6],
  },
  {
    tiles: [
      [0, 3],
      [4, 0],
      [1, 4],
      [5, 1],
      [2, 5],
      [6, 2],
    ],
    targetTile: [3, 6],
  },
  {
    tiles: [
      [4, 6],
      [1, 3],
      [5, 5],
      [2, 4],
      [6, 4],
      [3, 5],
    ],
    targetTile: [0, 3],
  },
  {
    tiles: [
      [4, 3],
      [2, 2],
      [1, 0],
      [6, 6],
      [5, 4],
      [3, 3],
    ],
    targetTile: [2, 1],
  },
  {
    tiles: [
      [6, 5],
      [5, 4],
      [3, 3],
      [2, 1],
      [1, 0],
      [6, 6],
    ],
    targetTile: [5, 4],
  },
  {
    tiles: [
      [2, 5],
      [4, 0],
      [6, 2],
      [1, 4],
      [3, 6],
      [5, 1],
    ],
    targetTile: [0, 3],
  },
  {
    tiles: [
      [4, 6],
      [4, 6],
      [5, 5],
      [1, 3],
      [4, 0],
      [1, 3],
    ],
    targetTile: [6, 5],
  },
  {
    tiles: [
      [4, 0],
      [2, 1],
      [2, 3],
      [2, 2],
      [1, 5],
      [5, 0],
    ],
    targetTile: [0, 0],
  },
  {
    tiles: [
      [6, 6],
      [3, 4],
      [5, 1],
      [0, 0],
      [2, 5],
      [4, 3],
    ],
    targetTile: [1, 2],
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a neque magna. Pellentesque ut turpis finibus, placerat nisl sed, dictum sapien. Integer at turpis libero. Etiam sagittis euismod velit, eu lacinia quam rutrum pellentesque. Quisque dolor metus, egestas et placerat imperdiet, semper ac eros. Pellentesque a leo a nulla cursus accumsan at eu ante. Phasellus nec pharetra justo. Curabitur in lobortis elit. Morbi scelerisque mauris eu sagittis pellentesque. In hac habitasse platea dictumst. Quisque et scelerisque elit, eget efficitur elit. Aliquam luctus purus eu diam fermentum finibus. Sed quis ante enim. Curabitur iaculis porttitor ante, eu tempor elit vulputate ac. Aliquam vel porta leo, sed vehicula ex. Nunc felis odio, semper eget eros id, porttitor gravida ligula. Vestibulum sed nulla id risus egestas maximus. Nullam fermentum elit non nisl volutpat, vitae molestie nisl viverra. Curabitur elementum egestas pellentesque. Aliquam eget lectus varius, lacinia neque ut, auctor turpis. Sed lacinia nunc eget dolor laoreet aliquam. Nullam vitae rutrum diam.",
          scoring: "il punteggio dipende da...",
          items: 30,
          duration: 15 * 60,
          images: [
            {
              src: "dom/fig1.png",
              description:
                "In alto, è presentata una sequenza di tessere con l'ultima da indovinare; In basso, sono elencati i numeri da trascinare sulle facce della tessera mancante",
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
          tiles: [
            [3, 0],
            [2, 1],
            [3, 0],
            [2, 1],
            [3, 0],
          ],
          userTile: [-1, -1],
          targetTile: [2, 1],
          isCorrect: false,
          actions: 0,
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
      itemObject.canGoBack = true;
      itemObject.canGoForth = true;
      itemObject.isLocked = false;
      itemObject.itemData = {
        ...item,
      };
      itemObject.itemData.userTile = [-1, -1];
      itemObject.itemData.isCorrect = false;
      itemObject.itemData.actions = 0;
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
