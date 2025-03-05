// Intelli-Park Main JavaScript File
// This file consolidates all JavaScript functionality for the application

// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page-specific functionality based on current page
    const currentPage = getCurrentPage();
    
    if (currentPage === 'index') {
        initHomePage();
    } else if (currentPage === 'profile') {
        initProfilePage();
    } else if (currentPage === 'bookings') {
        initBookingsPage();
    } else if (currentPage === 'parking-search') {
        initParkingSearchPage();
    }
});

// Helper function to determine current page
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    
    if (page === '' || page === 'index') {
        return 'index';
    }
    return page;
}

// ===== HOME PAGE FUNCTIONALITY =====
function initHomePage() {
    // Handle pill selection
    const pills = document.querySelectorAll('.pill');
    if (pills.length > 0) {
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    // Populate time picker options
    const timePickers = document.querySelectorAll('.time-picker');
    if (timePickers.length > 0) {
        timePickers.forEach(picker => {
            // Clear existing options
            picker.innerHTML = '';
            
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
    }

    // Set min date to today for date pickers
    const datePickers = document.querySelectorAll('.date-picker');
    if (datePickers.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        datePickers.forEach(picker => {
            picker.min = today;
        });
    }
}

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

// ===== PROFILE PAGE FUNCTIONALITY =====
function initProfilePage() {
    // Sidebar Navigation
    initSidebarNavigation('profile');
    
    // Vehicle Type Selection
    const vehicleButtons = document.querySelectorAll('.vehicle-btn');
    
    if (vehicleButtons.length > 0) {
        vehicleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                vehicleButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update dropdown options based on vehicle type
                const vehicleType = this.textContent.trim();
                updateVehicleDropdown(vehicleType);
            });
        });
    }
    
    // Save Changes Button for Profile
    const profileSaveBtn = document.querySelector('.profile-form-section .save-btn');
    if (profileSaveBtn) {
        profileSaveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            // Validate form (simple validation)
            if (!firstName || !lastName || !email || !phone) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send data to backend
            // For now, we'll just show a success message
            alert('Profile updated successfully!');
        });
    }
    
    // Save Changes Button for Password
    const passwordSaveBtn = document.querySelector('.password-form .save-btn');
    if (passwordSaveBtn) {
        passwordSaveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get password values
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all password fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New password and confirm password do not match');
                return;
            }
            
            // Here you would typically verify current password and update with new one
            // For now, we'll just show a success message
            alert('Password updated successfully!');
            
            // Clear password fields
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        });
    }
    
    // Add Vehicle Button
    const addVehicleBtn = document.querySelector('.add-vehicle-btn');
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', function() {
            const vehicleInput = document.querySelector('.vehicle-input').value;
            const vehicleType = document.querySelector('.vehicle-dropdown').value;
            
            if (!vehicleInput) {
                alert('Please enter a vehicle registration plate');
                return;
            }
            
            // Here you would typically add the vehicle to user's profile
            // For now, we'll just show a success message
            alert(`Vehicle added successfully! Plate: ${vehicleInput}, Type: ${vehicleType}`);
            
            // Clear input field
            document.querySelector('.vehicle-input').value = '';
        });
    }
    
    // Initialize the profile page with sample data
    initializeProfileData();
}

// Function to update vehicle dropdown options based on selected vehicle type
function updateVehicleDropdown(vehicleType) {
    const dropdown = document.querySelector('.vehicle-dropdown');
    if (!dropdown) return;
    
    // Clear existing options
    dropdown.innerHTML = '';
    
    // Add new options based on vehicle type
    if (vehicleType.includes('Car')) {
        addOption(dropdown, 'car', 'Car');
        addOption(dropdown, 'suv', 'SUV');
        addOption(dropdown, 'sedan', 'Sedan');
        addOption(dropdown, 'hatchback', 'Hatchback');
    } else if (vehicleType.includes('Bike')) {
        addOption(dropdown, 'motorcycle', 'Motorcycle');
        addOption(dropdown, 'scooter', 'Scooter');
        addOption(dropdown, 'electric', 'Electric Bike');
    }
}

// Helper function to add options to dropdown
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// Initialize the profile page with sample data (for demonstration)
function initializeProfileData() {
    const firstNameInput = document.getElementById('firstName');
    if (!firstNameInput) return;
    
    // Set sample user data
    firstNameInput.value = 'John';
    document.getElementById('lastName').value = 'Doe';
    document.getElementById('email').value = 'john.doe@example.com';
    document.getElementById('phone').value = '+91 98765 43210';
    
    // Set Car as default vehicle type
    const carBtn = document.querySelector('.car-btn');
    if (carBtn) {
        carBtn.classList.add('active');
        updateVehicleDropdown('Car');
    }
}

// ===== BOOKINGS PAGE FUNCTIONALITY =====
function initBookingsPage() {
    // Sidebar Navigation
    initSidebarNavigation('bookings');
    
    // Pagination Dots
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    if (paginationDots.length > 0) {
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Remove active class from all dots
                paginationDots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                this.classList.add('active');
                
                // Here you would typically implement pagination logic
                console.log('Pagination page selected:', index + 1);
                
                // For demo purposes, we'll just show a message
                if (index > 0) {
                    alert('This is a demo. Additional booking history would be shown on page ' + (index + 1));
                }
            });
        });
    }
}

// ===== PARKING SEARCH PAGE FUNCTIONALITY =====
function initParkingSearchPage() {
    // Parking Complex Selection
    const complexCards = document.querySelectorAll('.parking-complex-card');
    const proceedToBookBtn = document.querySelector('.parking-complex-section .btn-proceed');
    const parkingPlotSection = document.querySelector('.parking-plot-section');
    
    let selectedComplex = null;
    
    if (complexCards.length > 0) {
        complexCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selected class from all cards
                complexCards.forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked card
                this.classList.add('selected');
                
                // Store selected complex name
                selectedComplex = this.querySelector('.complex-name').textContent;
                
                // Enable proceed button
                if (proceedToBookBtn) {
                    proceedToBookBtn.removeAttribute('disabled');
                }
            });
        });
    }
    
    // Proceed to Book button
    if (proceedToBookBtn) {
        proceedToBookBtn.addEventListener('click', function() {
            if (selectedComplex) {
                // Scroll to parking plot section
                parkingPlotSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update plot section title to include selected complex
                const sectionTitle = document.querySelector('.parking-plot-section .section-title');
                if (sectionTitle) {
                    sectionTitle.textContent = `Choose your Parking Plot at ${selectedComplex}`;
                }
            } else {
                alert('Please select a parking complex first');
            }
        });
    }
    
    // Parking Plot Selection
    const plotButtons = document.querySelectorAll('.plot-btn:not(.booked)');
    const proceedToCheckoutBtn = document.querySelector('.parking-plot-section .btn-proceed');
    
    let selectedPlot = null;
    
    if (plotButtons.length > 0) {
        plotButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove selected class from all plot buttons
                plotButtons.forEach(b => b.classList.remove('selected'));
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Store selected plot
                selectedPlot = this.textContent;
                
                // Get the section title (for pricing info)
                const sectionTitle = this.closest('.plot-section').querySelector('.plot-section-title').textContent;
                const priceMatch = sectionTitle.match(/₹(\d+\.\d+)\/hour/);
                const pricePerHour = priceMatch ? priceMatch[1] : '0.00';
                
                // Enable proceed to checkout button
                if (proceedToCheckoutBtn) {
                    proceedToCheckoutBtn.removeAttribute('disabled');
                    
                    // Update button text with selected plot and price
                    proceedToCheckoutBtn.textContent = `BOOK ${selectedPlot} - ₹${pricePerHour}/hour`;
                }
            });
        });
    }
    
    // Proceed to Checkout button
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', function() {
            if (selectedPlot) {
                // Get booking details from the summary section
                const city = document.querySelector('.summary-selectors .summary-select:first-child').textContent.trim();
                const area = document.querySelector('.summary-selectors .summary-select:last-child').textContent.trim();
                const checkInDate = document.querySelector('.summary-group:nth-child(2) .summary-datetime span:first-child').textContent.trim();
                const checkInTime = document.querySelector('.summary-group:nth-child(2) .summary-datetime span:last-child').textContent.trim();
                const checkOutDate = document.querySelector('.summary-group:nth-child(3) .summary-datetime span:first-child').textContent.trim();
                const checkOutTime = document.querySelector('.summary-group:nth-child(3) .summary-datetime span:last-child').textContent.trim();
                
                // Create booking summary
                const bookingSummary = {
                    complex: selectedComplex,
                    plot: selectedPlot,
                    location: `${city}, ${area}`,
                    checkIn: `${checkInDate} ${checkInTime}`,
                    checkOut: `${checkOutDate} ${checkOutTime}`
                };
                
                // Store booking details in localStorage for checkout page
                localStorage.setItem('bookingSummary', JSON.stringify(bookingSummary));
                
                // For demo purposes, show an alert
                alert(`Booking confirmed for ${selectedPlot} at ${selectedComplex}!`);
                
                // In a real application, you would redirect to a checkout or confirmation page
                // window.location.href = 'checkout.html';
            } else {
                alert('Please select a parking plot first');
            }
        });
    }
    
    // Initialize the page with URL parameters
    initializeFromURL();
}

// Initialize the parking search page with URL parameters
function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city') || 'Guwahati';
    const area = urlParams.get('area') || 'Six Mile';
    const checkInDate = urlParams.get('checkInDate') || '2025-03-06';
    const checkInTime = urlParams.get('checkInTime') || '09:45 AM';
    const checkOutDate = urlParams.get('checkOutDate') || '2025-03-06';
    const checkOutTime = urlParams.get('checkOutTime') || '11:45 AM';
    
    // Set summary values
    const cityElement = document.querySelector('.summary-selectors .summary-select:first-child');
    const areaElement = document.querySelector('.summary-selectors .summary-select:last-child');
    const checkInDateElement = document.querySelector('.summary-group:nth-child(2) .summary-datetime span:first-child');
    const checkInTimeElement = document.querySelector('.summary-group:nth-child(2) .summary-datetime span:last-child');
    const checkOutDateElement = document.querySelector('.summary-group:nth-child(3) .summary-datetime span:first-child');
    const checkOutTimeElement = document.querySelector('.summary-group:nth-child(3) .summary-datetime span:last-child');
    
    if (cityElement) cityElement.textContent = city;
    if (areaElement) areaElement.textContent = area;
    if (checkInDateElement) checkInDateElement.textContent = checkInDate;
    if (checkInTimeElement) checkInTimeElement.textContent = checkInTime;
    if (checkOutDateElement) checkOutDateElement.textContent = checkOutDate;
    if (checkOutTimeElement) checkOutTimeElement.textContent = checkOutTime;
}

// ===== COMMON FUNCTIONALITY =====

// Initialize sidebar navigation
function initSidebarNavigation(currentPage) {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    if (sidebarItems.length > 0) {
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                sidebarItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                const sectionName = this.querySelector('span').textContent;
                
                // Handle navigation based on sidebar item clicked and current page
                if (sectionName === 'Parking Lots') {
                    if (currentPage !== 'profile') {
                        window.location.href = 'profile.html';
                    }
                } else if (sectionName === 'Bookings' || sectionName === 'Past Bookings') {
                    if (currentPage !== 'bookings') {
                        window.location.href = 'bookings.html';
                    } else {
                        // Already on bookings page, scroll to relevant section
                        const targetSection = sectionName === 'Bookings' ? 
                            document.querySelector('.bookings-section-container:first-of-type') : 
                            document.querySelector('.bookings-section-container:last-of-type');
                        
                        if (targetSection) {
                            // Scroll to the section
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            });
        });
    }
}
