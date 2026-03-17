// dashboard.js

// ===============================
// SIDEBAR TOGGLE FOR MOBILE
// ===============================
const menuBtn = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// ===============================
// WELCOME MESSAGE DYNAMIC
// ===============================
const welcomeMessage = document.getElementById('welcomeMessage');

function updateWelcomeMessage() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = 'Welcome to People\'s Bank';

    if (hours >= 5 && hours < 12) {
        greeting = 'Good Morning! Welcome to People\'s Bank';
    } else if (hours >= 12 && hours < 17) {
        greeting = 'Good Afternoon! Welcome to People\'s Bank';
    } else if (hours >= 17 && hours < 21) {
        greeting = 'Good Evening! Welcome to People\'s Bank';
    } else {
        greeting = 'Welcome! Hope you are having a great night';
    }

    welcomeMessage.textContent = greeting;
}

// Initial call
updateWelcomeMessage();

// ===============================
// OPTIONAL: Highlight Active Sidebar Link
// ===============================
const sidebarLinks = document.querySelectorAll('.sidebar a');
const currentPage = window.location.pathname.split('/').pop();

sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active-link');
    }
});
// Add this to your existing dashboard.js
const logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
        // Remove logged-in user from localStorage
        localStorage.removeItem('PB_loggedUser');

        // Redirect back to login page
        window.location.href = 'index.html';
    });
}