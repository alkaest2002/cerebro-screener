import { leftPadValue, clone } from "@/utils/utilityFns";
import makePresenters from "@/views/tasks/_composables/makePresenters";
import processAnswers from "@/views/tasks/_composables/processAnswers";

// fn to generate cards
const generateCards = (amount) =>
  Array.from({ length: 25 }, () => {
    return { isCovered: true, amount };
  });

// items
const items = [
  {
    win: 15,
    lose: -300,
    loseCards: 1,
    loseAt: 14,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -300,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -300,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -300,
    loseCards: 1,
    loseAt: 6,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -300,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(25),
  },
  {
    win: 25,
    lose: -300,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -500,
    loseCards: 1,
    loseAt: 16,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -500,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 15,
    lose: -500,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(25),
  },
  {
    win: 25,
    lose: -500,
    loseCards: 1,
    loseAt: 12,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -500,
    loseCards: 1,
    loseAt: null,
    cards: generateCards(15),
  },
  {
    win: 25,
    lose: -500,
    loseCards: 3,
    loseAt: null,
    cards: generateCards(15),
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
          items: 12,
          duration: 12 * 45,
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
        canGoForth: false,
        isLocked: false,
        itemData: {
          win: 25,
          lose: -350,
          loseCards: 1,
          loseAt: 6,
          cards: generateCards(15),
          totalAmount: 0,
          flippedAmounts: [],
          outcome: null,
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
      itemObject.canGoForth = false;
      itemObject.isLocked = false;
      itemObject.itemData = {
        ...item,
        totalAmount: 0,
        flippedAmounts: [],
        outcome: null,
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
  // return data
  return {
    blocks: clonedBlocks,
    presenters,
    buildAnswersFn,
  };
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
