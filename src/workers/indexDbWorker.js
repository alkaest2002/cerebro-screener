const INDEXDB = "cerebro-db";
const COLLECTION = "documents";
let db;

self.onmessage = async (evt) => {
  // destructure evt data
  const { action, document } = evt.data;
  // try
  try {
    // cache db
    db = await _init();
    // do count action
    if (action == "count") return _query("count");
    // do get action
    if (action == "getAll") return _query("getAll");
    // do add action
    if (action == "add") return _add(document);
    // do clear action
    if (action == "clear") return _clear();
    // on error
  } catch (err) {
    // throw init error
    throw new Error(err.message);
  }
};

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

const _query = (command) => {
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
    txn.oncomplete = () => postMessage({ result });
    // on transaction failure
    txn.onerror = (evt) => {
      throw new Error(evt.target.error);
    };
  }
};

const _add = (document) => {
  // start transaction
  const txn = db.transaction(COLLECTION, "readwrite");
  // add document to collection
  txn.objectStore(COLLECTION).add(document);
  // on transaction complete
  txn.oncomplete = () => postMessage({ result: document });
  // on transaction failure
  txn.onerror = (evt) => {
    throw new Error(evt.target.error);
  };
};

const _clear = () => {
  // start transaction
  const txn = db.transaction(COLLECTION, "readwrite");
  // clear collection
  txn.objectStore(COLLECTION).clear();
  // on transaction complete
  txn.oncomplete = () => postMessage({ result: null });
  // on transaction failure
  txn.onerror = (evt) => {
    throw new Error(evt.target.error);
  };
};
