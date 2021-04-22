export const domLang = {
  "instruction.001" : {
    itemData: {
      description: "<p>Questa prova è basata sulle tessere del gioco del domino. Ogni tessera si compone di due facce in ciascuna delle quali vi è un numero che può andare da 0 a 6. Per ogni quesito, viene presentata una serie di tessere che termina con una tessera sulle cui facce sono rappresentati dei punti interrogativi vedi fig 1).</p><p>Le tessere della serie sono legate tra loro da un criterio di natura logico-numerica. Il tuo compito è di comprendere tale criterio e dedurre  onseguentemente i numeri da mettere sulle facce dell'ultima tessera, quella mancante.</p><p>Tieni presente che il grado di difficoltà dei quesiti varia: alcuni sono facili da risolvere: per questi, troverai abbastanza rapidamente una soluzione; altri invece richiedono uno sforzo di pensiero superiore e la capacità di cogliere relazioni numeriche non scontate.</p>",
      scoring: "correttezza della risposta, numero di mosse compiute, tempo impiegato.",
      duration: "nessun limite di tempo",
      images: [
        {
          description: "In alto, è presentata una sequenza di tessere con l'ultima da indovinare; In basso, sono elencati i numeri da trascinare sulle facce della tessera mancante."
        }
      ]
    }
  },
  "demo.001": {
    itemData: {
      hint: "<b>Come devi procedere</b>: individua il criterio che lega tra loro le tessere in alto e completa la tessera mancante. Trascina e rilascia sulle facce dell'ultima tessera (quella con i punti interrogativi), i numeri che ritieni completino la serie. Se sbagli, puoi trascinare nuovi numeri su quelli che intendi cambiare"
    }
  }
}

export const kohLang = {
  "instruction.001" : {
    itemData: {
      description: "In questo compito, vengono presentati due riquadri, A e B. Il primo è riempito di tessere colorate che nel loro insieme compongono una figura. Il secondo è inizialmente vuoto (vedi fig 1).</p><p>Il tuo compito è di utilizzare le tessere messe a tua disposizione per riprodure nel riquadro B la medesima configurazione del riquadro A.</p><p>Usa il mouse per trascinare le tessere nel riquadro B. Una volta inserite nel riquadro, le tessere possono essere ruotate in senso orario (click sinistro del mouse) o anti-orario (click destro del mouse). In caso di errore, è possibile rimuovere una tessera trascinandola fuori dal riquadro.</p><p>Cerca di ottenere il risultato finale compiendo il minor numero di mosse.</p>",
      scoring: "correttezza della risposta, numero di mosse compiute, tempo impiegato.",
      duration: "nessun limite di tempo",
      images: [
        {
          description: "A sinistra, le tessere colorate del riquadro A compongono una figura che deve essere riprodotta fedelmente nel riquadro B, usando le tessere che si trovano sotto i due riquadri."
        }
      ]
    }
  },
  "demo.001": {
    itemData: {
      hint: "<b>Come devi procedere</b>: il riquadro B deve esser uguale al riquadro A. Per ottenere questo risultato, trascina nel riquadro B le tessere che hai a disposizione e ruotale in modo opportuno.`"
    }
  }
}

export const tolLang = {
  "instruction.001" : {
    itemData: {
      description: "`<p>In questa prova, vengono presentate due forme, A e B. Ogni forma è composta da tre torri di altezza decrescente, una accanto all'altra. In ogni torre si trovano dei dischi colorati (vedi fig 1).</p><p>Il tuo compito è di spostare i dischi colorati tra le torri della forma B, per ottenere la stessa configurazione della forma A.</p><p>Usa il mouse per trascinare i dischi da una torre all'altra della forma B. Tieni presente che puoi spostare solo i dischi che si trovano in cima a ogni torre.</p><p>Cerca di ottenere il risultato finale compiendo il minor numero di mosse.</p>`",
      duration: "nessun limite di tempo",
      images: [
        {
          description: "A sinistra, si vede la forma bersaglio A, mentre a destra si vede la forma B, i cui dischi devono essere spostati tra le sue torri per ottenere la forma bersaglio A."
        }
      ]
    }
  },
  "demo.001": {
    itemData: {
      hint: "<b>Come devi procedere</b>: sposta i dischi tra le torri della forma B per ottenere la forma bersaglio A. Tieni presente che puoi spostare solo i dischi che si trovano in cima a ogni torre. Cerca di ottenere la forma bersaglio A compiendo il minor numero di mosse."
    }
  }
}