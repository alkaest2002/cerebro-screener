export const admin = {
  // views
  login: {
    buttons: {
      battery: "batteria",
      data: "dti",
    },
    fields: {
      password: {
        placeholder: "inserisci password",
        errors: {
          mismatch: "password non corretta" 
        },
      },
    },
  },
  batteryCreate: {
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
  },
  batteryManage: {
    title: "Sessione in corso",
    buttons: {
      reset: "reset sessione"
    }
  },
  // components
  batteryTable: {
    duration: "durata",
  },
  manageTask: {
    task: "task",
    block: "blocco",
    item: "quesito",
    timer: "timer",
    links: {
      reset: "reset blocco corrente",
      next: "blocco successivo"
    }
  },
  manageBattery: {
    battery: "Batteria",
    links: {
      current: "riprendi task",
      next: "prossimo task",
      end: "fine della batteria"
    }
  },
  manageTestee: {
    testee: "Dati anagrafici",
    data: {
      id: "id",
      gender: "genere",
      age: "età",
      edu: "titolo di studio",
    },
    links: {
      bio: "anagrafica",
    }
  },
};
