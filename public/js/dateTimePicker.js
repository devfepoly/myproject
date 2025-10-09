// Optional: Add JavaScript for validation or other functionality
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');

endDateInput.addEventListener('change', () => {
    if (startDateInput.value && endDateInput.value && endDateInput.value < startDateInput.value) {
        // alert('End date cannot be before start date.');
        endDateInput.value = startDateInput.value; // Reset end date
    }
});

startDateInput.addEventListener('change', () => {
    if (startDateInput.value && endDateInput.value && startDateInput.value > endDateInput.value) {
        // alert('Start date cannot be after end date.');
        startDateInput.value = endDateInput.value; // Reset start date
    }
});