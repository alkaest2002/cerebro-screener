import { leftPadValue, clone } from "@/utils/utilityFns";
import makePresenters from "@/views/tasks/_composables/makePresenters";
import processAnswers from "@/views/tasks/_composables/processAnswers";

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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a neque magna. Pellentesque ut turpis finibus, placerat nisl sed, dictum sapien. Integer at turpis libero. Etiam sagittis euismod velit, eu lacinia quam rutrum pellentesque. Quisque dolor metus, egestas et placerat imperdiet, semper ac eros. Pellentesque a leo a nulla cursus accumsan at eu ante. Phasellus nec pharetra justo. Curabitur in lobortis elit. Morbi scelerisque mauris eu sagittis pellentesque. In hac habitasse platea dictumst. Quisque et scelerisque elit, eget efficitur elit.<br>Aliquam luctus purus eu diam fermentum finibus. Sed quis ante enim. Curabitur iaculis porttitor ante, eu tempor elit vulputate ac. Aliquam vel porta leo, sed vehicula ex. Nunc felis odio, semper eget eros id, porttitor gravida ligula. Vestibulum sed nulla id risus egestas maximus. Nullam fermentum elit non nisl volutpat, vitae molestie nisl viverra. Curabitur elementum egestas pellentesque. Aliquam eget lectus varius, lacinia neque ut, auctor turpis. Sed lacinia nunc eget dolor laoreet aliquam. Nullam vitae rutrum diam.",
          scoring: "il punteggio dipende da...",
          items: 30,
          duration: 15 * 60,
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
          startTower: [["blue", "red"], [], ["green"]],
          endTower: [["red"], ["blue"], ["green"]],
          userTower: [[], [], []],
          actions: 0,
          isCorrect: false,
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
    .omitSpecifiedItemDataProps(["towerStart"])
    .flatten()
    .getData();
  // return processed answers
  return processedAnswers;
};
