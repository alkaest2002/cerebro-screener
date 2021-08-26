import { localOpMessages as i18n } from "@/i18n/it/workers";
import { computed } from "vue";
import { useStore } from "vuex";

export default (indexDb) => {
  // use store
  const store = useStore();

  // localOp
  const localOp = computed({
    get: () => store.state.answers.saveOp.local,
    set: (value) => {
      store.dispatch("answers/setSaveOp", { key: "local", data: value });
    },
  });

  // create temporary link with data:uri
  const _onSaveFile = (filename, jsonToWrite) => {
    // new blob
    const blob = new Blob([jsonToWrite], { type: "text/json" });
    // create link
    const link = document.createElement("a");
    // customize link attrs
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );
    // create event that will trigger download
    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    // fire event
    link.dispatchEvent(evt);
    // remove temporary link
    link.remove();
  };

  // handle on download data
  const onDownload = async () => {
    // try
    try {
      // update localOp
      localOp.value = {
        isOk: true,
        status: "running",
        message: i18n.download.running,
      };
      // get indexDB documents
      const { result: jsonToWrite } = await indexDb({
        action: "getAll",
      });
      // download json file
      _onSaveFile("dati.json", JSON.stringify(jsonToWrite));
      // clear indexDb collection
      await indexDb({ action: "clear" });
      // reset indexDbCount
      store.dispatch("answers/resetIndexDbCount");
      // update localOp
      localOp.value = {
        isOk: true,
        status: "finished",
        message: i18n.download.finished,
      };
      // on error
    } catch (err) {
      // update localOp
      localOp.value = {
        isOk: false,
        status: "finished",
        message: err.message,
      };
    }
  };

  // handle on archive data
  const onArchive = async (batteryData) => {
    // do nothing under these condistions
    if (!localOp.value.hasFinished && localOp.value.isOk) return;
    // try
    try {
      // add document to indexDB
      await indexDb({ action: "add", document: batteryData });
      // update localOp
      localOp.value = {
        isOk: true,
        status: "finished",
        message: i18n.archive.finished,
      };
      // on error
    } catch (err) {
      // update localOp
      localOp.value = {
        isOk: false,
        status: "finished",
        message: err.message,
      };
    }
  };

  // return setup object
  return {
    localOp,
    onDownload,
    onArchive,
  };
};
