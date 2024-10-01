import { initializeApp, } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_X1sJ3uBjaDuL4zZT9F-O1zdI8goqEds",
  authDomain: "event-website-6e4b2.firebaseapp.com",
  projectId: "event-website-6e4b2",
  storageBucket: "event-website-6e4b2.appspot.com",
  messagingSenderId: "142181130915",
  appId: "1:142181130915:web:2b9961089b7bb3ac449516"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app