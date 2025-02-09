# Parking Management App - Feature Overview & User Flow

## Table of Contents

1. [Introduction](#introduction)
2. [App Flow](#app-flow)
   - [Welcome &amp; Landing Screen](#welcome--landing-screen)
   - [User Authentication](#user-authentication)
   - [Dashboard](#dashboard)
   - [Parking Slot Booking Process](#parking-slot-booking-process)
   - [Payment Process](#payment-process)
   - [Upcoming Parking Details](#upcoming-parking-details)
3. [Future Backend Considerations](#future-backend-considerations)

---

## Introduction

This document outlines the flow and features of the **Parking Management App**, which allows users to book parking slots in different locations based on availability. The app ensures a seamless experience by providing real-time availability, payment integration, and upcoming booking details.

---

## App Flow

### Welcome & Landing Screen

- Upon opening the app, users see a **clean welcome screen** with branding.
- After a brief loading animation, they are redirected to the **Landing Screen**.
- The Landing Screen contains options to **Sign Up** or **Log In**.

### User Authentication

- Users can sign up using their **email and password**.
- Authentication is required to proceed to the **main dashboard**.
- If the user is already registered, they can log in directly.

### Dashboard

- After signing in, the user lands on the **Main Dashboard**, which consists of:
  - **Profile Section** – Displays user details and settings.
  - **Booking Section** – Allows users to book a parking slot.
  - **Upcoming Parking Details** (if a booking exists).

### Parking Slot Booking Process

1. **Choose City**
   - The user selects the city where they want to park.
2. **Choose Area**
   - After selecting a city, the user selects a specific area within the city.
3. **Choose Society/Building**
   - A list of available societies/buildings appears for selection.
4. **Select Parking Area & Slot**
   - The user sees the parking layout of the chosen building.
   - Available slots are highlighted based on real-time availability.
   - The user picks a slot by entering the **date and time**.
5. **Confirm Booking & Proceed to Payment**
   - The user confirms the slot selection and proceeds to payment.

### Payment Process

- Users can **pay the parking fee** through multiple payment options:
  - Credit/Debit Cards
  - UPI/Wallet Payments
  - Net Banking
- A confirmation receipt is generated after successful payment.

### Upcoming Parking Details

- If a user has already booked a parking slot, the **Dashboard** displays:
  - **Plot Number** (Assigned slot in the selected building)
  - **Arrival Time** (Based on user selection)
  - **Gate Navigation** (Directions to the exact parking location)
  - **Modify or Cancel Booking** (If within allowed time limit)

---

## Future Backend Considerations

- **User Authentication System:** Secure login and session management.
- **Database for Cities, Areas, and Buildings:** Structured data storage.
- **Real-Time Slot Availability:** API to check and update slot status.
- **Payment Gateway Integration:** Secure transaction handling.
- **Notifications:** Booking confirmations and reminders.
- **Admin Dashboard:** For managing parking slots and availability.

---

This structured overview provides a clear breakdown of how the app functions, ensuring that developers can follow the logic and implement features accordingly.


## Database Scheema

### Users Table

```sql
CREATE TABLE users (
user_id UUID PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
full_name VARCHAR(100) NOT NULL,
phone_number VARCHAR(15),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cities Table

```sql
CREATE TABLE cities (
    city_id UUID PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100),
    status BOOLEAN DEFAULT true
);
```

### Areas Table

```sql
CREATE TABLE areas (
    area_id UUID PRIMARY KEY,
    city_id UUID REFERENCES cities(city_id),
    area_name VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    status BOOLEAN DEFAULT true
);
```

### Buildings Table

```sql
CREATE TABLE buildings (
    building_id UUID PRIMARY KEY,
    area_id UUID REFERENCES areas(area_id),
    building_name VARCHAR(100) NOT NULL,
    total_slots INTEGER NOT NULL,
    address TEXT,
    status BOOLEAN DEFAULT true
);
```

### Parking_Slots Table

```sql
CREATE TABLE parking_slots (
    slot_id UUID PRIMARY KEY,
    building_id UUID REFERENCES buildings(building_id),
    slot_number VARCHAR(20) NOT NULL,
    slot_type VARCHAR(50), -- (car, bike, etc.)
    floor_number INTEGER,
    rate_per_hour DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'available' -- (available, occupied, maintenance)
);
```

### Bookings Table

```sql
CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    slot_id UUID REFERENCES parking_slots(slot_id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    booking_status VARCHAR(20), -- (confirmed, cancelled, completed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Payments Table

```sql
CREATE TABLE payments (
    payment_id UUID PRIMARY KEY,
    booking_id UUID REFERENCES bookings(booking_id),
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20), -- (pending, completed, failed, refunded)
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```plaintext
parking-management-app/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   └── features/
│   │       ├── auth/
│   │       ├── booking/
│   │       ├── payment/
│   │       └── profile/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Booking/
│   │   └── Payment/
│   ├── services/
│   │   ├── api/
│   │   ├── auth/
│   │   └── storage/
│   ├── utils/
│   │   ├── helpers/
│   │   ├── constants/
│   │   └── validators/
│   ├── hooks/
│   ├── context/
│   └── types/
├── public/
├── tests/
├── docs/
├── config/
└── package.json
```

### Key Directories Explanation

- **src/**: Main source code directory

  - **assets/**: Static files like images, icons, and global styles
  - **components/**: Reusable UI components
    - **common/**: Shared components like buttons, inputs
    - **layout/**: Layout-related components
    - **features/**: Feature-specific components
  - **pages/**: Main application pages/routes
  - **services/**: API calls and external service integrations
  - **utils/**: Helper functions, constants, and validators
  - **hooks/**: Custom React hooks
  - **context/**: React context providers
  - **types/**: TypeScript type definitions
- **public/**: Static files served directly
- **tests/**: Test files and test utilities
- **docs/**: Documentation files
- **config/**: Configuration files

This structure follows a feature-based organization pattern, making it easy to:

- Locate and maintain related code
- Scale the application with new features
- Maintain separation of concerns
- Share common components and utilities
- Test components and features independently
