export const battery = {
  // views
  bio:  {
    title: "Sezione anagrafica",
    buttons: {
      continue: "continua",
    },
    fields: {
      id: {
        label: "Codice identificativo",
        placeholder: "Inserisci codice identificativo",
        errors: {
          required: "Codice identificativo obbligatorio",
        }
      },
      age: {
        label: "Età",
        placeholder: "Inserisci età in cifre",
        errors: {
          required: "Età obbligatoria",
          range: "L'età deve essere compresa nell'intervallo 13-99"
        }
      },
      gender: {
        label: "Genere",
        options: [
          "maschio",
          "femmina",
        ],
        errors: {
          required: "Genere obbligatorio",
        }
      },
      edu: {
        label: "Titolo di studio",
        options: [
          "scuola obbligo",
          "diploma",
          "laurea breve",
          "laurea magistrale",
          "post laurea"
        ],
        errors: {
          required: "Titolo di studio obbligatorio",
        }
      },
    }
  },
  tasks: {
    title: "Batteria di task"
  },
  end: {
    title: "Fine della batteria",
    messageOne: "Clicca sul pulsante qui sotto per registrare i tuoi dati.",
    messageTwo: "Conclusa la registrazione, il sistema si riavverà automaticamente.",
    waitingStatus: "in attesa",
    buttons: {
      save: "registra le tue risposte"
    }
  },
  // components
  taskCard: {
    task: "task",
    items: "Quesiti",
    duration: "Durata",
    noTimeLimit: "senza limiti temporali",
    minutes: "minuti",
    buttons: {
      completed: "completato",
      waiting: "in attesa",
      continue: "continua"
    },
  },
}