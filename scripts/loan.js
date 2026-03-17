function calculateLoan(){

const amount = parseFloat(document.getElementById("amount").value);
const rate = parseFloat(document.getElementById("rate").value);
const months = parseFloat(document.getElementById("months").value);

if(isNaN(amount) || isNaN(rate) || isNaN(months)){

alert("Please enter valid numbers");
return;

}

const monthlyRate = rate / 100 / 12;

const monthlyPayment =
(amount * monthlyRate) /
(1 - Math.pow(1 + monthlyRate, -months));

const totalPayment = monthlyPayment * months;

const totalInterest = totalPayment - amount;

document.getElementById("monthly").innerText =
"R" + monthlyPayment.toFixed(2);

document.getElementById("interest").innerText =
"R" + totalInterest.toFixed(2);

document.getElementById("total").innerText =
"R" + totalPayment.toFixed(2);

}

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
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