// -------------------------------------------------
// login
// -------------------------------------------------
export const login = {
  buttons: {
    battery: "admin &middot; batteria",
    data: "admin &middot; dati",
  },
  fields: {
    password: {
      placeholder: "inserisci password",
      errors: {
        mismatch: "password non corretta",
      },
    },
  },
};

// -------------------------------------------------
// battery create
// -------------------------------------------------
export const batteryCreate = {
  title: "Batteria",
  administerHeader: "1. task da somministrare",
  randomizeHeader: " 2. Randomizzazione dei task",
  randomizeNote: "nota: clicca sui task che vuoi mantenere in posizione",
  buttons: {
    reset: "reset",
    administer: "somministra",
  },
  fields: {
    randomize: {
      optionLabel: ["non randomizzare", "randomizza"],
    },
  },
};

export const batteryTable = {
  duration: "durata",
};

// -------------------------------------------------
// battery manage
// -------------------------------------------------
export const batteryManage = {
  title: "Sessione in corso",
  buttons: {
    reset: "reset sessione",
  },
};

export const manageTask = {
  task: "task",
  block: "blocco",
  item: "quesito",
  timer: "timer",
  links: {
    reset: "reset blocco corrente",
    next: "blocco successivo",
  },
};

export const manageBattery = {
  battery: "Batteria",
  links: {
    current: "riprendi task",
    next: "prossimo task",
    end: "fine della batteria",
  },
};

export const manageTestee = {
  testee: "Dati anagrafici",
  data: {
    id: "id",
    gender: "genere",
    age: "età",
    edu: "titolo di studio",
  },
  links: {
    bio: "anagrafica",
  },
};

// -------------------------------------------------
// data save
// -------------------------------------------------
export const dataSave = {
  title: "Salva dati",
  protocolsHeader: "Protocolli in archivio",
  protocolsQuantity: "Numero di protocolli in archivio",
};

export const saveToLocal = {
  title: "Scarica dati in locale",
  message:
    "Per scaricare i dati in locale non hai bisogno di alcuna connessione a internet. Una volta scaricati i dati, dovrai inviare il file al seguente indirizzo di posta elettronica",
  buttons: {
    save: "scarica dati in locale",
  },
  status: {
    notDownloaded: "scaricamento non effettuato",
  },
};

export const saveToServer = {
  title: "Carica dati sul server",
  messageOne:
    "Per caricare i dati sul sever, il computer deve disporre di una connessione a internet che renda possibile l'accesso a",
  messageTwo:
    "Una volta avviato l'upload, ti chiediamo di attenderne il completamento senza interagire con il software",
  buttons: {
    save: "carica dati sul server",
  },
  status: {
    noConnection: "connessione internet assente",
    notUploaded: "upload dei dati non effettuato",
  },
};
