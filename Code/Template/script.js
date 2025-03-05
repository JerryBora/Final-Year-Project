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

// Function to handle parking search
function searchParking() {
    // Get form values
    const citySelect = document.querySelector('.location-selectors .location-select:first-child');
    const areaSelect = document.querySelector('.location-selectors .location-select:last-child');
    const checkInDate = document.querySelectorAll('.date-picker')[0];
    const checkInTime = document.querySelectorAll('.time-picker')[0];
    const checkOutDate = document.querySelectorAll('.date-picker')[1];
    const checkOutTime = document.querySelectorAll('.time-picker')[1];
    
    // Validate form
    if (!citySelect.value || citySelect.value === "") {
        alert('Please select a city');
        return;
    }
    
    if (!areaSelect.value || areaSelect.value === "") {
        alert('Please select an area');
        return;
    }
    
    if (!checkInDate.value) {
        alert('Please select a check-in date');
        return;
    }
    
    if (!checkOutDate.value) {
        alert('Please select a check-out date');
        return;
    }
    
    // Create URL with parameters
    const params = new URLSearchParams();
    params.append('city', citySelect.options[citySelect.selectedIndex].text);
    params.append('area', areaSelect.options[areaSelect.selectedIndex].text);
    params.append('checkInDate', checkInDate.value);
    params.append('checkInTime', checkInTime.options[checkInTime.selectedIndex].text);
    params.append('checkOutDate', checkOutDate.value);
    params.append('checkOutTime', checkOutTime.options[checkOutTime.selectedIndex].text);
    
    // Add animation to search button
    const searchBtn = document.querySelector('.btn-search');
    searchBtn.classList.add('clicked');
    
    // Redirect to parking search page with parameters
    setTimeout(() => {
        window.location.href = `parking-search.html?${params.toString()}`;
    }, 300);
}