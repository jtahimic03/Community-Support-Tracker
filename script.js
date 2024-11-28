document.getElementById("donation-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    
    // Collect form data
    const charityName = document.getElementById("charity-name").value.trim();
    const donationAmount = parseFloat(document.getElementById("donation-amount").value);
    const donationDate = document.getElementById("donation-date").value;
    const donorMessage = document.getElementById("donor-message").value.trim();

    // Validate inputs
    if (!charityName || isNaN(donationAmount) || donationAmount <= 0 || !donationDate) {
        alert("Please fill out all required fields correctly.");
        return;
    }

    // Temporary data object
    const donationData = {
        charityName,
        donationAmount,
        donationDate,
        donorMessage
    };

    console.log("Donation Data:", donationData); // Placeholder for further functionality
    alert("Donation successfully added!");
    this.reset(); // Clear the form after submission
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("eventSignupForm");
    const tableBody = document.getElementById("signupTable").querySelector("tbody");
 
    // Load existing signups from localStorage on page load
    const loadSignups = () => {
        const signups = JSON.parse(localStorage.getItem("eventSignups")) || [];
        tableBody.innerHTML = "";
        signups.forEach((signup, index) => addTableRow(signup, index));
    };
 
    // Add a new row to the table
    const addTableRow = (signup, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
<td>${signup.eventName}</td>
<td>${signup.representativeName}</td>
<td>${signup.representativeEmail}</td>
<td>${signup.role}</td>
<td><button data-index="${index}" class="delete-btn">Delete</button></td>
        `;
        tableBody.appendChild(row);
    };
 
    // Save signups to localStorage
    const saveToLocalStorage = (signup) => {
        const signups = JSON.parse(localStorage.getItem("eventSignups")) || [];
        signups.push(signup);
        localStorage.setItem("eventSignups", JSON.stringify(signups));
    };
 
    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
 
        const eventName = document.getElementById("eventName").value.trim();
        const representativeName = document.getElementById("representativeName").value.trim();
        const representativeEmail = document.getElementById("representativeEmail").value.trim();
        const role = document.getElementById("role").value;
 
        // Validation
        if (!eventName || !representativeName || !representativeEmail || !role) {
            alert("Please fill out all fields.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(representativeEmail)) {
            alert("Invalid email address.");
            return;
        }
 
        const signup = { eventName, representativeName, representativeEmail, role };
        saveToLocalStorage(signup);
        addTableRow(signup, JSON.parse(localStorage.getItem("eventSignups")).length - 1);
 
        form.reset();
    });
 
    // Handle delete button clicks
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            const signups = JSON.parse(localStorage.getItem("eventSignups")) || [];
            signups.splice(index, 1);
            localStorage.setItem("eventSignups", JSON.stringify(signups));
            loadSignups();
        }
    });
 
    loadSignups();
});