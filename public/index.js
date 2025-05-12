import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import app, { App, el, div, View, h1, h2, h3, p, is, Base } from "/module/app.js";



await app.ready;

const firebaseConfig = {
    apiKey: "AIzaSyBQuQDm9uolmuGe4YLQa3AYd4S8lqX-6ro",
    authDomain: "lew42com.firebaseapp.com",
    projectId: "lew42com",
    storageBucket: "lew42com.firebasestorage.app",
    messagingSenderId: "722949407087",
    appId: "1:722949407087:web:2de87119ec6ccb02d0689a",
    measurementId: "G-RKYEM5GCFP"
  };

const fapp = initializeApp(firebaseConfig);
window.auth = getAuth(fapp);
const analytics = getAnalytics(fapp);

const provider = new GoogleAuthProvider();

const profile = div.c("user-profile", {
    image: el.c("img", "profile-pic").style("width", "100px").style("height", "100px"),
    name: h2.c("name", "Name: First Last"),
    email: h2.c("email", "Email: name@domain.com"),
    uid: h2.c("uid", "UID: XYZ123456789"),
    sign_out: el("button", "Sign out").on("click", () => {
        auth.signOut().then(() => {
            console.log("User signed out");
            profile?.hide();
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    })
}).hide()

const sign_in = el("button", "Sign in with Google").on("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log("credential", credential);
            const token = credential.accessToken;
            console.log("token", token);
            window.user = result.user;
            console.log("user", user);
            updateProfile();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("error", error);
        });
}).hide();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    window.user = user;
    updateProfile();

  } else {
    console.log("No user signed in");
    // render sign-in button
    sign_in.show();
  }
});

function updateProfile(){
    profile.image.attr("src", user.photoURL);
    // debugger;
    profile.name.text("Name: " + user.displayName);
    profile.email.text("Email: " + user.email);
    profile.uid.text("UID: " + user.uid);
    profile.show();
    sign_in.hide();
}