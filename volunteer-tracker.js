document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('volunteerTrackerForm');

    form.addEventListener('submit', e => {
        e.preventDefault(); // Prevent form from submitting
        validateFormData(); // Call your validate function
    });

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

        // If all validations pass, you can proceed with submitting the form via AJAX or other methods
        if (isValid) {
            console.log('Form is valid!'); // Process the form or send it via AJAX here
            // If you want to submit via JavaScript, you can use an XMLHttpRequest or Fetch API here.
        }
    };
});