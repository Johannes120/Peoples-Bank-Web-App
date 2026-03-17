
function calculateSavings() {

const goal = parseFloat(document.getElementById('goal').value);
const months = parseInt(document.getElementById('months').value);
const current = parseFloat(document.getElementById('current').value);

const result = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');

localStorage.setItem('goal', goal);
localStorage.setItem('months', months);
localStorage.setItem('current', current);

if (isNaN(goal) || isNaN(months) || isNaN(current) || goal <= 0 || months <= 0) {

result.innerHTML = "⚠️ Please enter valid positive numbers for all fields.";

progressBar.style.width = "0%";
progressBar.textContent = "0%";

return;

}

if (current >= goal) {

result.innerHTML = "🎉 Congratulations! You've already reached your savings goal!";

progressBar.style.width = "100%";
progressBar.textContent = "100%";

return;

}

const remaining = goal - current;

const monthly = remaining / months;

const rounded = monthly.toFixed(2);

const progress = ((current / goal) * 100).toFixed(1);

progressBar.style.width = progress + "%";

progressBar.textContent = progress + "%";

result.innerHTML =
`💡 You need to save <strong>R${rounded}</strong> every month
to reach your goal of <strong>R${goal}</strong> in <strong>${months}</strong> months.`;

}


window.onload = function(){

const savedGoal = localStorage.getItem('goal');
const savedMonths = localStorage.getItem('months');
const savedCurrent = localStorage.getItem('current');

if(savedGoal && savedMonths && savedCurrent){

document.getElementById('goal').value = savedGoal;
document.getElementById('months').value = savedMonths;
document.getElementById('current').value = savedCurrent;

calculateSavings();

}

};

// ===============================
// MENU TOGGLE
// ===============================
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active'); // Show/hide sidebar
});

// Close sidebar when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// ===============================
// HIGHLIGHT ACTIVE LINK
// ===============================
const sidebarLinks = document.querySelectorAll('.sidebar a');
const currentPage = window.location.pathname.split('/').pop();

sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active-link');
    }
});

// ===============================
// LOGOUT BUTTON
// ===============================
const logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
        // Remove logged-in user from localStorage
        localStorage.removeItem('PB_loggedUser');

        // Optional: close the sidebar
        sidebar.classList.remove('active');

        // Redirect back to login page
        window.location.href = 'index.html';
    });
}
