import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// initialize firebase app
const firebaseApp = initializeApp(firebaseConfig);

// export firebase auth
export const firebaseAuth = getAuth(firebaseApp);

// export firestore db
export const firestoreDb = getFirestore();
