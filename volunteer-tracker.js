document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const form = document.getElementById('volunteerTrackerForm');
    
    const table = document.createElement('table');
    table.id = 'volunteerTable';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Charity Name</th>
                <th>Hours Volunteered</th>
                <th>Date</th>
                <th>Experience Rating</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    // Insert the table before the form
    main.insertBefore(table, form);

    displayTable(); // Display saved data on page load
});

// Form validation logic
const form = document.getElementById('volunteerTrackerForm');
const charityNameInput = document.getElementById('charity-name');
const hoursVolunteeredInput = document.getElementById('hours-volunteered');
const volunteeringDateInput = document.getElementById('volunteering-date');
const experienceRatingInput = document.getElementById('experience-rating');

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateFormData = () => {
    const charityNameValue = charityNameInput.value.trim();
    const hoursVolunteeredValue = hoursVolunteeredInput.value.trim();
    const volunteeringDateValue = volunteeringDateInput.value.trim();
    const experienceRatingValue = experienceRatingInput.value.trim();

    let isValid = true;

    // Validate Charity Name
    if (charityNameValue === '') {
        setError(charityNameInput, 'Charity name is required');
        isValid = false;
    } else {
        setSuccess(charityNameInput);
    }

    // Validate Hours Volunteered
    if (hoursVolunteeredValue === '') {
        setError(hoursVolunteeredInput, 'Hours volunteered are required');
        isValid = false;
    } else {
        setSuccess(hoursVolunteeredInput);
    }

    // Validate Volunteering Date
    if (volunteeringDateValue === '') {
        setError(volunteeringDateInput, 'Date is required');
        isValid = false;
    } else {
        setSuccess(volunteeringDateInput);
    }

    // Validate Experience Rating
    if (experienceRatingValue === '') {
        setError(experienceRatingInput, 'Rating is required');
        isValid = false;
    } else {
        setSuccess(experienceRatingInput);
    }

    return isValid;
};

// Function to display the logged hours in the table
function displayTable() {
    const formData = JSON.parse(localStorage.getItem('volunteerLogs')) || [];
    const table = document.getElementById('volunteerTable');

    // Clear existing rows in the table body
    const tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';

    formData.forEach((entry, index) => {
        const row = document.createElement('tr');

        // Create and append table cells
        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Create and append delete button
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            formData.splice(index, 1); // Remove the selected entry
            localStorage.setItem('volunteerLogs', JSON.stringify(formData));
            displayTable(); // Refresh the table
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

// Function to handle form submission and save data
function saveFormData() {
    const formData = JSON.parse(localStorage.getItem('volunteerLogs')) || [];

    const newEntry = {
        charityName: charityNameInput.value,
        hoursVolunteered: hoursVolunteeredInput.value,
        volunteeringDate: volunteeringDateInput.value,
        experienceRating: experienceRatingInput.value,
    };

    formData.push(newEntry);
    localStorage.setItem('volunteerLogs', JSON.stringify(formData));

    // Clear the form inputs
    charityNameInput.value = '';
    hoursVolunteeredInput.value = '';
    volunteeringDateInput.value = '';
    experienceRatingInput.value = '';

    displayTable(); // Refresh the table
}

// Attach saveFormData to the form submission event after validation
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent form submission
    if (validateFormData()) { // Only save data if validation passes
        saveFormData();
    }
});