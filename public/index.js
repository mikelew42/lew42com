import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/module/App/App.js";

const firebaseConfig = {
    apiKey: "AIzaSyBQuQDm9uolmuGe4YLQa3AYd4S8lqX-6ro",
    authDomain: "lew42com.firebaseapp.com",
    projectId: "lew42com",
    storageBucket: "lew42com.firebasestorage.app",
    messagingSenderId: "722949407087",
    appId: "1:722949407087:web:2de87119ec6ccb02d0689a",
    measurementId: "G-RKYEM5GCFP"
  };

const app = initializeApp(firebaseConfig);
window.auth = getAuth(app);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

el("button", "Sign in with Google").on("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("user", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("error", error);
        });
})