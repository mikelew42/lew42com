import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";


app.$root.ac("pad");

el("style", `

`);

h1("Login");
console.log("making button");

// div().attr("id", "g_id_onload")
//     .attr("data-client_id", "722949407087-g0kagkteln7gifhndpifetv5j2prn5a9.apps.googleusercontent.com")
//     .attr("data-callback", "handleCredentialResponse")
//     .attr("data-auto_prompt", "false")
//     .attr("data-ux_mode", "popup");

const btn = div.c("my-google-button");

window.handleCredentialResponse = function handleCredentialResponse(response) {
    console.log("handleCredentialResponse response:", response);
    decode(response.credential);
    // response.credential contains the ID token JWT
    fetch('/auth/google-one-tap', { // Send the token to your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ credential: response.credential })
    })
    .then(response => response.json())
    .then(data => {
        console.log("my server response data", data);
      // Handle success (e.g., redirect to dashboard)
    //   if (data.success) {
    //     window.location.href = '/dashboard';
    //   }
    });
  }


// setTimeout(() => {
    console.log("requesting script");
    el("script").attr("src", "https://accounts.google.com/gsi/client").attr("async", "").attr("defer", "").append_to(document.body).el.addEventListener("load", () => {
        console.log("google script loaded");
        google.accounts.id.initialize({
            client_id: "722949407087-g0kagkteln7gifhndpifetv5j2prn5a9.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(btn.el, {})
    });
// }, 100);


  function decode(credential){
    // --- Client-side decoding (for display/debugging ONLY) ---
            // DO NOT trust client-side data for security-critical functions.
            const base64Url = credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const responsePayload = JSON.parse(jsonPayload);
            console.log(responsePayload);
  }