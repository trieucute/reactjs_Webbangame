import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
// import 'firebase/storage';
const firebaseConfig = {
  // Thay đổi thông tin kết nối tới Firebase của bạn ở đây
  apiKey: "AIzaSyDPQrO2TkLujvYN_gjpg4FFD-ZR8q5YrXU",
  authDomain: "asmreact-9acad.firebaseapp.com",
  projectId: "asmreact-9acad",
  storageBucket: "asmreact-9acad.appspot.com",
  messagingSenderId: "793548992773",
  appId: "1:793548992773:web:0ff47f651c2ec9bb78476c",
  measurementId: "G-D0E3KFRKMW"
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()
export default firebase;
