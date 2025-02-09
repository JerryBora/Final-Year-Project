// Handle pill selection
const pills = document.querySelectorAll('.pill');
pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
    });
});

// Populate time picker options
const timePickers = document.querySelectorAll('.time-picker');
timePickers.forEach(picker => {
    for(let i = 0; i < 24; i++) {
        for(let j = 0; j < 60; j += 15) {
            const hour = i.toString().padStart(2, '0');
            const minute = j.toString().padStart(2, '0');
            const ampm = i < 12 ? 'AM' : 'PM';
            const hour12 = i % 12 || 12;
            const option = document.createElement('option');
            option.value = `${hour}:${minute}`;
            option.textContent = `${hour12}:${minute} ${ampm}`;
            picker.appendChild(option);
        }
    }
});

// Set min date to today for date pickers
const datePickers = document.querySelectorAll('.date-picker');
const today = new Date().toISOString().split('T')[0];
datePickers.forEach(picker => {
    picker.min = today;
}); 