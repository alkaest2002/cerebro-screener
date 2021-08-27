import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, writeBatch, collection, doc } from "firebase/firestore";
import { serverOpMessages as i18n } from "@/i18n/it/views/admin";

// import firebase user
const firebaseUser = require("@/firebaseUser.json");

// firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCe0tGMHubZnvE4p0jl5ZUL7RpWp9fWtIs",
  authDomain: "cerebro-screen.firebaseapp.com",
  databaseURL:
    "https://cerebro-screen-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cerebro-screen",
  storageBucket: "cerebro-screen.appspot.com",
  messagingSenderId: "818846195885",
  appId: "1:818846195885:web:29a7f7d2ae41b13cdd6624",
};

// init firebase app
const firebaseApp = initializeApp(firebaseConfig);

// init firebase auth
const firebaseAuth = getAuth(firebaseApp);

// init firestore
const firestoreDb = getFirestore();

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
export const uploadData = async (documents, serverOp) => {
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
  } catch (err) {
    // update serverOp
    return (serverOp.value = {
      isOk: false,
      status: "finished",
      message: err.message,
    });
    // finally
  } finally {
    // signout from firebase
    signOut(firebaseAuth);
  }
};
