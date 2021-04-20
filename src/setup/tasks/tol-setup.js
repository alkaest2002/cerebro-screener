import { leftPadValue, clone } from "@/utils/utilityFns";
import makePresenters from "./_composables/makePresenters";
import processAnswers from "./_composables/processAnswers";

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
          description: `<p>In questo compito, vengono presentate due forme, A e B, 
              ciascuna delle quali è composta da tre torri di diversa altezza, 
              tra loro accostate; in ogni torre si trovano dei dischi 
              colorati (vedi fig 1).</p><p>Il tuo compito è di spostare i 
              dischi colorati tra le torri della forma B, per ottenere la 
              stessa configurazione della forma A.</p><p>Usa il mouse per 
              trascinare i dischi della forma B da una torre all'altra. Tieni 
              presente che puoi spostare solo i dischi che si trovano in cima 
              a ogni torre.</p><p>Cerca di ottenere il risultato finale 
              compiendo il minor numero di mosse.</p>`,
          scoring: `Il punteggio dipende dalla correttezza
            della risposta, dal numero di mosse e dal tempo impiegato per 
            giungere alla soluzione.`,
          items: 16,
          duration: "nessun limite di tempo.",
          images: [
            {
              src: "tol/fig1.png",
              description: `A sinistra, è presentata la forma bersaglio A. 
                A destra, la forma B i cui dischi devono essere spostati 
                per ottenere la figura bersaglio A.`,
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
          hint: `<b>Come devi procedere</b>: sposta i dischi tra le torri della 
            forma B per ottenere la forma bersaglio A. Tieni presente che puoi 
            spostare solo i dischi che si trovano in cima a ogni torre. 
            Cerca di ottenere la forma bersaglio A compiendo il minor 
            numero di mosse.`,
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
