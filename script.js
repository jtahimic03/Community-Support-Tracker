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
