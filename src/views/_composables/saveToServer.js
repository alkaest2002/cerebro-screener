import { computed } from "vue";
import { useStore } from "vuex";
import Worker from "worker-loader!@/workers/firebaseUploadWorker.js";

export default (indexDbExecute) => {
  // use store
  const store = useStore();

  // isOnline
  const isOnline = computed(() => store.state.main.isOnline);

  // serverOp
  const serverOp = computed({
    get: () => store.state.answers.saveOp.server,
    set: (value) =>
      store.dispatch("answers/setSaveOp", { key: "server", data: value }),
  });

  // handle upload to server
  const onUpload = async () => {
    // do nothing under these condistions
    if (!serverOp.value.hasFinished && serverOp.value.isOk) return;
    // try
    try {
      // get indexDbData records
      const { result: data } = await indexDbExecute({
        action: "getAll",
        data: null,
      });
      // setup new worker
      const worker = new Worker();
      // listen to worker
      worker.onmessage = async (evt) => {
        // update serverOp
        serverOp.value = evt.data;
        // when finished
        if (evt.data.hasFinished) {
          // terminate worker
          worker.terminate();
        }
        // if server oP was ok
        if (serverOp.value.status == "finished" && serverOp.value.isOk) {
          // clear indexDb collection
          await indexDbExecute({ action: "clear" });
          // reset indexDbCount
          store.dispatch("answers/resetIndexDbCount");
        }
      };
      // start worker
      worker.postMessage(data);
      // on error
    } catch (err) {
      // update serverOp
      serverOp.value = err;
    }
  };
  // return setup object
  return {
    isOnline,
    serverOp,
    onUpload,
  };
};
