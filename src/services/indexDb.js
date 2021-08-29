const INDEXDB = "cerebro-db";
const COLLECTION = "documents";
let db;

const _init = () => {
  // retun promise
  return new Promise((resolve, reject) => {
    // start request
    const req = indexedDB.open(INDEXDB, 1);
    // in case db needs to be created
    req.onupgradeneeded = (evt) =>
      // create object store
      evt.target.result.createObjectStore(COLLECTION, { keyPath: "isoTime" });
    // on success request
    req.onsuccess = (evt) => resolve(evt.target.result);
    // throw error on request failure
    req.onerror = (evt) => reject({ message: evt.target.error });
  });
};

const _query = (command, resolve, reject) => {
  // if command is count or getAll
  if (["count", "getAll"].includes(command)) {
    // init var
    let result;
    // start transaction
    const txn = db.transaction(COLLECTION);
    // start request
    let req =
      command == "count"
        ? txn.objectStore(COLLECTION).count()
        : txn.objectStore(COLLECTION).getAll();
    // on request success
    req.onsuccess = (evt) => (result = evt.target.result);
    // on transaction complete
    txn.oncomplete = () => resolve({ result });
    // on transaction failure
    txn.onerror = (evt) => {
      reject({ message: evt.target.error });
    };
  } else {
    // reject
    reject({ message: "unrecognized command" });
  }
};

const _add = (document, resolve, reject) => {
  // start transaction
  const txn = db.transaction(COLLECTION, "readwrite");
  // add document to collection
  txn.objectStore(COLLECTION).add(document);
  // on transaction complete
  txn.oncomplete = () => resolve({ result: document });
  // on transaction failure
  txn.onerror = (evt) => {
    reject({ message: evt.target.error });
  };
};

const _clear = (resolve, reject) => {
  // start transaction
  const txn = db.transaction(COLLECTION, "readwrite");
  // clear collection
  txn.objectStore(COLLECTION).clear();
  // on transaction complete
  txn.oncomplete = () => resolve({ result: null });
  // on transaction failure
  txn.onerror = (evt) => {
    reject({ message: evt.target.error });
  };
};

// function to manage calls to worker
export default async (payload) => {
  // destructure payload
  const { action, document } = payload;
  // if db is not already initiated
  if (typeof db === "undefined") {
    // try to
    try {
      // init db
      db = await _init();
      // on error
    } catch ({ message }) {
      // reject with error
      return Promise.reject({ message });
    }
  }
  // return promise
  return new Promise((...promise) => {
    // count action
    if (action == "count") return _query("count", ...promise);
    // getAll action
    if (action == "getAll") return _query("getAll", ...promise);
    // add action
    if (action == "add") return _add(document, ...promise);
    // clear action
    if (action == "clear") return _clear(...promise);
  });
};
