// -------------------------------------------------
// navigation
// -------------------------------------------------
export const taskNavigation = {
  buttons: {
    next: "succ",
    prev: "prec",
    end: "fine",
  },
};

// -------------------------------------------------
// lock item
// -------------------------------------------------
export const itemLock = {
  title: "Quesito bloccato",
  message: "Non puoi modifiare questo quesito",
};

// -------------------------------------------------
// images carousel
// -------------------------------------------------
export const imagesCarousel = {
  fig: "fig",
  buttons: {
    close: "chiudi",
  },
};

// -------------------------------------------------
// task presenter
// -------------------------------------------------
export const taskPresenter = {
  title: "tempo scaduto",
  message: "Premi continua per procedere oltre.",
  buttons: {
    continue: "continua",
  },
};

// -------------------------------------------------
// task instructions
// -------------------------------------------------
export const taskInstructions = {
  title: "Istruzioni",
  items: "Numero di quesiti",
  duration: "Tempo a disposizione",
  noTimeLimit: "Senza limiti di tempo",
  description: "Descrizione",
  scoring: "Variabili considerate nel calcolo del punteggio",
};

// -------------------------------------------------
// demo
// -------------------------------------------------
export const demo = {
  title: "Versione demo",
};

// -------------------------------------------------
// att
// -------------------------------------------------
export const attItem = {
  task: "Quesito",
};

export const attGrid = {
  nextNumberToClick: "Prossimo numero",
};

// -------------------------------------------------
// col
// -------------------------------------------------
export const colItem = {
  task: "Quesito",
};

export const colTableInfo = {
  headerOne: "Informazioni mano corrente",
  headerTwo: "Informazioni da inizio task",
  runningAmount: "Totale generale",
  winAmount: "Valore carte vincenti",
  loseAmount: "Valore carte perdenti",
  loseCards: "Numero carte perdenti",
  flippedCards: "Carte girate",
  totalAmount: "Totale in questa mano",
  buttons: {
    collect: "blocca guadagno e scopri le carte",
  },
};

// -------------------------------------------------
// dom
// -------------------------------------------------
export const domItem = {
  task: "Quesito",
};

export const domTileFaces = {
  useTheseNumbers:
    "trascina questi numeri per<br />completare la tessera mancante",
};

// -------------------------------------------------
// fak
// -------------------------------------------------
export const fakItem = {
  task: "Quesito",
  buttons: {
    simulateAction: "simula azione",
  },
};

// -------------------------------------------------
// iow
// -------------------------------------------------
export const iowItem = {
  task: "Quesito",
  remainingCards: "carte rimamanenti",
};

export const iowInfo = {
  netAmount: "Bilancio",
  lastWin: "Guadagno ultima carta",
  lastLoss: "Perdita ultima carta",
};

// -------------------------------------------------
// koh
// -------------------------------------------------
export const kohItem = {
  task: "Quesito",
  legend:
    "<em>ruota in senso orario</em> click sinistro su tessera<br /><em>ruota in senso anti-orario</em> click destro su tessera<br /><em>rimuovi</em> trascina tessera fuori dal riquadro",
  boxA: "riquadro A",
  boxB: "riquadro B",
};

export const kohReferenceTiles = {
  tiles: "tessere trascinabili nel riquadro B",
};

// -------------------------------------------------
// mem
// -------------------------------------------------
export const memStarter = {
  startAnimation: "clicca per avviare l'animazione",
  animationStarted: "animazione avviata",
};

export const memDsItem = {
  task: "Quesito",
  clickNumbersOne: "clicca in sequenza i",
  clickNumberTwo: "numeri",
  buttons: {
    reset: "reset",
  },
};

export const memCbItem = {
  task: "Quesito",
  clickCirclesOne: "clicca in sequenza i",
  clickCirclesTwo: "circoletti",
};

// -------------------------------------------------
// mul
// -------------------------------------------------
export const mulItem = {
  task: "Quesito",
};

export const mulInputs = {
  startAnimation: "avvia animazione",
  animationStarted: "animazione avviata"
};

// -------------------------------------------------
// srv
// -------------------------------------------------
export const srvSurvey = {
  task: "Quesito",
  message:
    " Rifletti con calma su <b>Tutte le prove che hai svolto</b> e suoi tuoi stati d'animo. Ti chiediamo di rispondere alle seguenti domande, trascinando con il mouse il circoletto centrale nella direzione voluta.",
};

// -------------------------------------------------
// tol
// -------------------------------------------------
export const tolItem = {
  task: "Quesito",
  figureA: "Forma bersaglio A",
  figureB: "Forma B",
  figureHint: "sposta i dischi per ottenere la figura A",
};

// -------------------------------------------------
// wcs
// -------------------------------------------------
export const wcsItem = {
  task: "Quesito",
  cards: "carte",
  feedback: {
    right: "corretto",
    wrong: "sbagliato!",
  },
};

// -------------------------------------------------
// survey
// -------------------------------------------------
export const taskSurvey = {
  task: "Quesito",
  title: "Questionario",
  message:
    " Rifletti con calma sulla prova appena conclusa e sugli stati d'animo che provi in questo momento. Ti chiediamo di rispondere alle seguenti tre domande.",
  questions: [
    {
      question: "Come valuti la tua prestazione?",
      likert: "0 pessima, 10 eccellente",
    },
    {
      question: " In che misura ti senti soddisfatto della tua prestazione?",
      likert: "0 per nulla, 10 completamente",
    },
    {
      question:
        " Come credi di essere andato rispetto alle altre persone del tuo stesso genere, età e titolo di studio?",
      likert: " 0 decisamente peggio, 10 decisamente meglio",
    },
  ],
};

// -------------------------------------------------
// end
// -------------------------------------------------
export const taskEnd = {
  task: "Quesito",
  title: "Fine del task",
  message:
    "Complimenti! Hai ultimato la prova.<br />Rilassati per qualche secondo e poi vai avanti.",
};
