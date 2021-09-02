import {
  totalItems as domTotalItems,
  totalDurantion as domTotalDuration,
} from "@/views/tasks/dom/dom-setup";
import {
  totalItems as tolTotalItems,
  totalDurantion as tolTotalDuration,
} from "@/views/tasks/tol/tol-setup";
import {
  totalItems as kohTotalItems,
  totalDurantion as kohTotalDuration,
} from "@/views/tasks/koh/koh-setup";
import {
  totalItems as wcsTotalItems,
  totalDurantion as wcsTotalDuration,
} from "@/views/tasks/wcs/wcs-setup";
import {
  totalItems as mulTotalItems,
  totalDurantion as mulTotalDuration,
} from "@/views/tasks/mul/mul-setup";
import {
  totalItems as colTotalItems,
  totalDurantion as colTotalDuration,
} from "@/views/tasks/col/col-setup";
import {
  totalItems as memTotalItems,
  totalDurantion as memTotalDuration,
} from "@/views/tasks/mem/mem-setup";
import {
  totalItems as iowTotalItems,
  totalDurantion as iowTotalDuration,
} from "@/views/tasks/iow/iow-setup";
import {
  totalItems as attTotalItems,
  totalDurantion as attTotalDuration,
} from "@/views/tasks/att/att-setup";
import {
  totalItems as srvTotalItems,
  totalDurantion as srvTotalDuration,
} from "@/views/tasks/srv/srv-setup";
import {
  totalItems as fakTotalItems,
  totalDurantion as fakTotalDuration,
} from "@/views/tasks/fak/fak-setup";

export const jsonCatalogue = [
  {
    key: "dom",
    description: "Domino",
    type: "intelligenza (logica deduttiva)",
    items: domTotalItems,
    duration: domTotalDuration,
    isAvailable: true,
  },
  {
    key: "tol",
    description: "Torri",
    type: "intelligenza (pianificazione)",
    items: tolTotalItems,
    duration: tolTotalDuration,
    isAvailable: true,
  },
  {
    key: "koh",
    description: "Schemi di Kohs",
    type: "intelligenza (visuo-spaziale)",
    items: kohTotalItems,
    duration: kohTotalDuration,
    isAvailable: true,
  },
  {
    key: "wcs",
    description: "Ordina le carte",
    type: "intelligenza (flessibilità)",
    items: wcsTotalItems,
    duration: wcsTotalDuration,
    isAvailable: true,
  },
  {
    key: "mul",
    description: "Task Multipli",
    type: "multitrasking",
    items: mulTotalItems,
    duration: mulTotalDuration,
    isAvailable: true,
  },
  {
    key: "col",
    description: "Gira le carte",
    type: "propensione al rischio",
    items: colTotalItems,
    duration: colTotalDuration,
    isAvailable: true,
  },
  {
    key: "mem",
    description: "Memoria",
    type: "memoria",
    items: memTotalItems,
    duration: memTotalDuration,
    isAvailable: true,
  },
  {
    key: "iow",
    description: "Individua mazzi",
    type: "apprendimento",
    items: iowTotalItems,
    duration: iowTotalDuration,
    isAvailable: true,
  },
  {
    key: "att",
    description: "Cerca numeri",
    type: "attenzione",
    items: attTotalItems,
    duration: attTotalDuration,
    isAvailable: true,
  },
  {
    key: "srv",
    description: "Questionario fine batteria",
    type: "insight",
    items: srvTotalItems,
    duration: srvTotalDuration,
    isAvailable: true,
  },
  {
    key: "fak",
    description: "Questionario fake",
    type: "task app",
    items: fakTotalItems,
    duration: fakTotalDuration,
    isAvailable: true,
  },
];
