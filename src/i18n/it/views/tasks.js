// -------------------------------------------------
// navigation
// -------------------------------------------------
export const navigation = {
  buttons: {
    next: "succ",
    prev: "prec",
    end: "fine",
  },
};

// -------------------------------------------------
// lock block
// -------------------------------------------------
export const lockBlock = {
  title: "tempo scaduto",
  message: "Premi continua per procedere oltre.",
  buttons: {
    continue: "continua",
  }, 
};

// -------------------------------------------------
// lock item
// -------------------------------------------------
export const lockItem = {
  title: "Quesito bloccato",
  message: "Non puoi modifiare questo quesito",  
};

// carousel
export const carousel = {
  fig: "fig",
  buttons: {
    close: "chiudi",
  },
};


// -------------------------------------------------
// instructions
// -------------------------------------------------
export const instructions = {
  title: "Istruzioni",
  items: "Numero di quesiti",
  duration: "Tempo a disposizione",
  description: "Descrizione",
  scoring: "Variabili considerate nel calcolo del punteggio",
};

// -------------------------------------------------
// demo
// -------------------------------------------------
export const  demo = {
  title: "Versione demo",
};

// -------------------------------------------------
// tasks
// -------------------------------------------------
export const  tasks = {
    task: "Quesito",
};

// -------------------------------------------------
// att
// -------------------------------------------------
export const att = {
  task: "Quesito",
  nextNumberToClick: "Prossimo numero",
};

// -------------------------------------------------
// col
// -------------------------------------------------
export const col = {
  task: "Quesito",
  tableInfo: {
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
  },
};

// -------------------------------------------------
// dom
// -------------------------------------------------
export const dom = {
  task: "Quesito",
  useTheseNumbers:
    "trascina questi numeri per<br />completare la tessera mancante",
};

// -------------------------------------------------
// fak
// -------------------------------------------------
export const fak = {
  task: "Quesito",
  buttons: {
    simulateAction: "simula azione",
  },
};

// -------------------------------------------------
// iow
// -------------------------------------------------
export const iow = {
  task: "Quesito",
  netAmount: "Bilancio",
  lastWin: "Guadagno ultima carta",
  lastLoss: "Perdita ultima carta",
  remainingCards: "carte rimamanenti",
};

// -------------------------------------------------
// koh
// -------------------------------------------------
export const koh = {
  task: "Quesito",
  legend:
    "<em>ruota in senso orario</em> click sinistro su tessera<br /><em>ruota in senso anti-orario</em> click destro su tessera<br /><em>rimuovi</em> trascina tessera fuori dal riquadro",
  boxA: "riquadro A",
  boxB: "riquadro B",
  tiles: "tessere trascinabili nel riquadro B",
};

// -------------------------------------------------
// mem
// -------------------------------------------------
export const mem = {
  task: "Quesito",
  startAnimation: "clicca per avviare l'animazione",
  animationStarted: "animazione avviata",
  ds: {
    clickNumbersOne: "clicca in sequenza i",
    clickNumberTwo: "numeri",
    buttons: {
      reset: "reset",
    },
  },
  cb: {
    clickCirclesOne: "clicca in sequenza i",
    clickCirclesTwo: "circoletti",
  },
};

// -------------------------------------------------
// srv
// -------------------------------------------------
export const srv = {
  task: "Quesito",
  message:
    " Rifletti con calma su <b>Tutte le prove che hai svolto</b> e suoi tuoi stati d'animo. Ti chiediamo di rispondere alle seguenti domande, trascinando con il mouse il circoletto centrale nella direzione voluta.",
};

// -------------------------------------------------
// tol
// -------------------------------------------------
export const tol = {
  task: "Quesito",
  figureA: "Forma bersaglio A",
  figureB: "Forma B",
  figureHint: "sposta i dischi per ottenere la figura A",
};

// -------------------------------------------------
// wcs
// -------------------------------------------------
export const wcs = {
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
export const survey = {
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
export const end = {
  task: "Quesito",
  title: "Fine del task",
  message:
    "Complimenti! Hai ultimato la prova.<br />Rilassati per qualche secondo e poi vai avanti.",
};
