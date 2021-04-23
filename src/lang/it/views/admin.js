export const admin  = {
  // views
  login: {
    buttons: {
      battery: "batteria",
      data: "dti"
    },
    fields: {
      password: {
        placeHolder: "inserisci password",
        errorMessage: "password non corretta"
      }
    }
  },
  batteryCreate: {
    title: "Batteria",
    administerHeader: "1. task da somministrare",
    randomizeHeader: " 2. Randomizzazione dei task",
    randomizeNote: "nota: clicca sui task che vuoi mantenere in posizione",
    buttons: {
      reset: "reset",
      administer: "somministra"
    },
    fields: {
      randomize: {
        optionLabel: [
          "non randomizzare",
          "randomizza"
        ]
      }
    }
  },
  // components
  batteryTable: {
    duration: "durata"
  },
}