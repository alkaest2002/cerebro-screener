export const tasks = {
  // views
  instructions: {
    title: "Istruzioni",
    items: "Numero di quesiti",
    duration: "Tempo a disposizione",
    description: "Descrizione",
    scoring: "Variabili considerate nel calcolo del punteggio",
  },
  survey: {
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
  },
  tasks: {
    task: "Quesito",
    att: {
      nextNumberToClick: "Prossimo numero"
    },
    col: {},
    dom: {
      useTheseNumbers: "trascina questi numeri per<br />completare la tessera mancante"
    },
    iow: {},
    koh: {},
    mem: {
      ds: {},
      cb: {},  
    },
    srv: {},
    tol: {
      figureA: "Forma bersaglio A",
      figureB: "Forma B",
      figureHint: "sposta i dischi per ottenere la figura A"
    },
    wcs: {},
  },
  end: {
    title: "Fine del task",
    message: "Complimenti! Hai ultimato la prova.<br />Rilassati per qualche secondo e poi vai avanti.",
  },
  // components
  navigation: {
    buttons: {
      next: "succ",
      prev: "prec",
      end: "fine",
    },
  },
  lock: {
    block: {
      title: "tempo scaduto",
      message: "Premi continua per procedere oltre.",
      buttons: {
        continue: "continua",
      },
    },
    item: {
      title: "Quesito bloccato",
      message: "Non puoi modifiare questo quesito",
    },
  },
};
