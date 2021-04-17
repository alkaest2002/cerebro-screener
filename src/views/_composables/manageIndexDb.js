import Worker from "worker-loader!@/workers/indexDbWorker.js";

export default () => {
  // handle execute action
  const indexDbExecute = (payload) => {
    // setup new worker
    const worker = new Worker();
    // return promise
    return new Promise((resolve, reject) => {
      // listen to worker on message
      worker.onmessage = (evt) => {
        // terminate worker
        worker.terminate();
        // return event data
        return resolve(evt.data);
      };
      // listen to worker error
      worker.onerror = (err) => {
        // return data
        return reject({
          isOk: false,
          status: "finished",
          message: err.message,
        });
      };
      // start worker
      worker.postMessage(payload);
    });
  };
  // return setup object
  return {
    indexDbExecute,
  };
};
