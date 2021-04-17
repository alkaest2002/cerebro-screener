/*global importScripts, firebase*/

importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-firestore.js");

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

// user
const user = {
  email: "lab1@cerebro.com",
  password: "lab1@xyz#99",
  collection: "lab1",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
// get reference to firestore db
const db = firebase.firestore();
// get reference to collection
const collection = db.collection(`cerebro-${user.collection}`);

// build document to put into firestore
const buildDocument = (data) => {
  // destructure
  const { isoTime, testee, answers } = data;
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
  console.log(data, document);
  return document;
};

// function to handle document upload to firestore
const uploadData = async (documents) => {
  // try to
  try {
    // sign in to firebae
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    // init batch
    const batch = db.batch();
    // loop through documents
    documents.forEach((document, index) => {
      // notify
      postMessage({
        isOk: true,
        status: "running",
        message: `upload dati ${index + 1} di ${documents.length}`,
      });
      // generate id
      const docRef = collection.doc();
      // add doc
      batch.set(docRef, {
        timpestamp: Date.now(),
        data: buildDocument(document),
      });
    });
    // commit batch
    await batch.commit();
    // signout
    firebase.auth().signOut();
    // resolve with success message
    return Promise.resolve({
      isOk: true,
      status: "finished",
      message: "upload concluso con successo",
    });
  } catch (error) {
    // on error
    // resolve with error message
    return Promise.reject({
      isOk: false,
      status: "finished",
      message: error.message,
    });
  }
};

// event handler
onmessage = async function (e) {
  // init var
  let opStatus;
  // try to
  try {
    // upload data to firebase
    opStatus = await uploadData(e.data);
    // on error
  } catch (err) {
    // update opStatus
    opStatus = err;
    // finally
  } finally {
    // send message
    postMessage(opStatus);
  }
};
