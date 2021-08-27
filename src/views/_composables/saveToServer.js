import { computed } from "vue";
import { useStore } from "vuex";
import { uploadData } from "@/services/firebase";

export default (indexDb) => {
  // use store
  const store = useStore();

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
      // get indexDb records
      const { result: documents } = await indexDb({
        action: "getAll",
        data: null,
      });
      // upload records to server
      await uploadData(documents, serverOp);
      // if upload was successful
      if (serverOp.value.isOk) {
        // clear indexDb collection
        await indexDb({ action: "clear" });
        // reset indexDbCount
        store.dispatch("answers/resetIndexDbCount");
      }
      // on error
    } catch (err) {
      // update serverOp
      serverOp.value = {
        isOk: false,
        status: "finished",
        message: err.message,
      };
    }
  };
  // return setup object
  return {
    serverOp,
    onUpload,
  };
};
