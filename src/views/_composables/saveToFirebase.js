import { computed } from "vue";
import { useStore } from "vuex";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writeBatch, collection, doc } from "firebase/firestore";
import { firebaseAuth, firestoreDb } from "@/services/firebase";
import { serverOpMessages as i18n } from "@/i18n/it/views/admin";

// import firebase user
const firebaseUser = require("@/firebaseUser.json");

// build document to put into firestore
const _buildDocument = (data) => {
  // destructure data
  const { isoTime, testee, answers } = data;
  // build document
  const document = {
    isoTime,
    testee,
    answers: Object.keys(answers).reduce((acc, itr) => {
      const task = {
        [itr]: JSON.stringify(answers[itr]),
      };
      acc = { ...acc, ...task };
      return acc;
    }, {}),
  };
  // return document
  return document;
};

// function to handle document upload to firestore
const _uploadData = async (documents, serverOp) => {
  // update serverOp
  serverOp.value = {
    isOk: true,
    status: "running",
    message: i18n.running,
  };
  // try to
  try {
    // signin to firebase
    await signInWithEmailAndPassword(
      firebaseAuth,
      firebaseUser.email,
      firebaseUser.password
    );
    // init documents batch
    const documentsBatch = writeBatch(firestoreDb);
    // loop through documents
    documents.forEach((document, index) => {
      // update serverOp
      serverOp.value = {
        isOk: true,
        status: "running",
        message: `${i18n.running} ${index + 1}/${documents.length}`,
      };
      // generate firestore document id
      const docRef = doc(
        collection(firestoreDb, `cerebro-${firebaseUser.collection}`)
      );
      // add document to batch
      documentsBatch.set(docRef, {
        timpestamp: Date.now(),
        data: _buildDocument(document),
      });
    });
    // commit documents batch
    await documentsBatch.commit();
    // update serverOp
    serverOp.value = {
      isOk: true,
      status: "finished",
      message: i18n.finished,
    };
    // on error
  } catch (error) {
    // update serverOp
    return (serverOp.value = {
      isOk: false,
      status: "finished",
      message: error.message,
    });
    // finally
  } finally {
    // signout from firebase
    signOut(firebaseAuth);
  }
};

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
      // upload records to firebase
      await _uploadData(documents, serverOp);
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
      serverOp.value = err;
    }
  };
  // return setup object
  return {
    serverOp,
    onUpload,
  };
};
