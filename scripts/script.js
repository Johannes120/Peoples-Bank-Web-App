/* ============================= */
/* FORM TOGGLE (SIGN UP / SIGN IN) */
/* ============================= */
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

/* ============================= */
/* TOGGLE PASSWORD VISIBILITY */
/* ============================= */
function togglePassword(inputId, icon){
    const input = document.getElementById(inputId);
    if(input.type === "password"){
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}

/* ============================= */
/* CONTACT POPUP */
/* ============================= */
const popup = document.getElementById("contactPopup");
const contactLink = document.getElementById("contactLink");

contactLink.onclick = () => {
    popup.style.display = "block";
};

function closePopup(){
    popup.style.display = "none";
}

/* ============================= */
/* BASIC AUTH ENCRYPTION / DECRYPTION */
/* ============================= */
function encrypt(str) {
    return btoa(str);
}

function decrypt(str) {
    return atob(str);
}

/* ============================= */
/* SIGN UP LOGIC */
/* ============================= */
const signupFormEl = document.querySelector("#signupForm form");
signupFormEl.addEventListener("submit", function(e){
    e.preventDefault();

    const username = this.querySelector('input[type="username"]').value.trim();
    const password = this.querySelector('#password').value.trim();
    const confirmPassword = this.querySelector('#confirmPassword').value.trim();

    if(password !== confirmPassword){
       showAlert("Passwords do not match!", "error");
        return;
    }

    if(!username || !password){
        showAlert("Please fill in all fields!", "error");
        return;
    }

    const userData = {
        username: encrypt(username),
        password: encrypt(password)
    };

    localStorage.setItem("PB_user", JSON.stringify(userData));
    showAlert("Account created successfully!", "success");
    signinBtn.click(); // switch to sign in form
});

/* ============================= */
/* SIGN IN LOGIC + DASHBOARD REDIRECT */
/* ============================= */
const signinFormEl = document.querySelector("#signinForm form");
signinFormEl.addEventListener("submit", function(e){
    e.preventDefault();

    const username = this.querySelector('input[type="username"]').value.trim();
    const password = this.querySelector('#loginPassword').value.trim();

    const storedData = JSON.parse(localStorage.getItem("PB_user"));

    if(!storedData){
        showAlert("No user found. Please sign up first.", "error");
        return;
    }

    if(decrypt(storedData.username) === username && decrypt(storedData.password) === password){
        showDashboard();
    } else {
        showAlert("Invalid username or password!", "error");
    }
});

function showDashboard(){
    const storedData = JSON.parse(localStorage.getItem("PB_user"));

    if(storedData){
        const user = decrypt(storedData.username);
        // Store logged-in username for dashboard usage
        localStorage.setItem("PB_loggedUser", user);

        // Redirect to dashboard
        window.location.href = "dashboard1.html";
    }
}

/* ============================= */
/* DASHBOARD JS INTERACTIVITY */
/* ============================= */

// SIDEBAR TOGGLE FOR DASHBOARD (mobile)
const menuBtn = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if(menuBtn && sidebar){
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// DYNAMIC WELCOME MESSAGE ON DASHBOARD
const welcomeMessage = document.getElementById('welcomeMessage');
if(welcomeMessage){
    function updateWelcomeMessage() {
        const now = new Date();
        const hours = now.getHours();
        let greeting = "Welcome to People's Bank";

        if(hours >= 5 && hours < 12){
            greeting = "Good Morning! Welcome to People's Bank";
        } else if(hours >= 12 && hours < 17){
            greeting = "Good Afternoon! Welcome to People's Bank";
        } else if(hours >= 17 && hours < 21){
            greeting = "Good Evening! Welcome to People's Bank";
        } else {
            greeting = "Welcome! Hope you are having a great night";
        }

        // Add username if logged in
        const user = localStorage.getItem("PB_loggedUser");
        if(user){
            greeting += `, ${user}`;
        }

        welcomeMessage.textContent = greeting;
    }

    updateWelcomeMessage();
}

// OPTIONAL: Highlight active sidebar link
const sidebarLinks = document.querySelectorAll('.sidebar a');
const currentPage = window.location.pathname.split('/').pop();

sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if(linkPage === currentPage){
        link.classList.add('active-link');
    }
});

// Show custom alert
function showAlert(message, type = "error") {
    const alertEl = document.getElementById("customAlert");
    alertEl.textContent = message; // set message
    alertEl.className = "alert " + type; // add type class (error or success)
    alertEl.style.display = "block";

    // auto-hide after 4 seconds
    setTimeout(() => {
        alertEl.style.display = "none";
    }, 4000);
}