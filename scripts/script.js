import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBkiWhymnICIdCQsZQC-y4E45XRiYQOkio",
  authDomain: "people-s-bank-web.firebaseapp.com",
  projectId: "people-s-bank-web",
  storageBucket: "people-s-bank-web.firebasestorage.app",
  messagingSenderId: "789021638199",
  appId: "1:789021638199:web:66201c5b05b9aa5c0f49b2",
  measurementId: "G-BJXYPBBH1X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// FORM TOGGLE
const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

signupBtn.onclick = () => {
    signupForm.style.display = "block";
    signinForm.style.display = "none";
    signupBtn.classList.add("active");
    signinBtn.classList.remove("active");
};

signinBtn.onclick = () => {
    signupForm.style.display = "none";
    signinForm.style.display = "block";
    signinBtn.classList.add("active");
    signupBtn.classList.remove("active");
};

// TOGGLE PASSWORD
window.togglePassword = (inputId, icon) => {
    const input = document.getElementById(inputId);
    if(input.type === "password"){
        input.type = "text";
        icon.classList.replace("fa-eye-slash","fa-eye");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye","fa-eye-slash");
    }
};

// ALERT
function showAlert(msg, type="error"){
    const alertEl = document.getElementById("customAlert");
    alertEl.textContent = msg;
    alertEl.className = "alert " + type;
    alertEl.style.display = "block";
    setTimeout(()=>{ alertEl.style.display="none"; },4000);
}

// SIGN UP
document.querySelector("#signupForm form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if(password !== confirmPassword){
        showAlert("Passwords do not match!", "error");
        return;
    }

    createUserWithEmailAndPassword(auth,email,password)
    .then(()=>{ showAlert("Account created successfully!", "success"); signinBtn.click(); })
    .catch(err=>showAlert(err.message,"error"));
});

// SIGN IN
document.querySelector("#signinForm form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    signInWithEmailAndPassword(auth,email,password)
    .then(()=> window.location.href="dashboard1.html")
    .catch(err=> showAlert(err.message,"error"));
});

// CONTACT POPUP
const popup = document.getElementById("contactPopup");
document.getElementById("contactLink").onclick = ()=> popup.style.display="block";
window.closePopup = ()=> popup.style.display="none";
