# Exam Management System

A simple web-based college exam timetable management system built for the ClickInnovate PRMCEAM Assessment – Level 1 (B1).

## Features

### Admin

* Admin registration and login
* Add exam timetable entries
* View all created exams
* Delete exams
* Exam validation:

  * Subject is required
  * Year is required
  * Section is required
  * Exam date is required
  * Start time is required
  * End time is required
  * End time must be after start time

### Student

* Student registration and login
* Student selects their year and section
* View only exams matching their own year and section
* Informative message when no exams are available

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* JSON Web Token (JWT)
* bcryptjs

## Project Structure

```text
exam-management-system/
│
├── middleware/
│   └── auth.js
│
├── routes/
│   ├── auth.js
│   └── exams.js
│
├── public/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── style.css
│   ├── auth.js
│   └── dashboard.js
│
├── data.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd exam-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

The application will run at:

```text
http://localhost:5000
```

Open the address in a web browser.

## Test Credentials

### Admin

```text
Email: admin@test.com
Password: admin123
```

### Student

```text
Email: student@test.com
Password: student123
Year: 2
Section: A
```

These accounts are included as sample data for testing.

## How It Works

### Admin Flow

1. Admin logs in.
2. Admin dashboard is displayed.
3. Admin enters:

   * Subject
   * Year
   * Section
   * Exam date
   * Start time
   * End time
4. The system validates the entered exam details and creates the timetable entry if all required fields are valid.

### Project folder/ file structure
<img width="240" height="618" alt="WhatsApp Image 2026-09-29 at 1 57 08 PM" src="https://github.com/user-attachments/assets/e2776762-4113-4f40-9530-291fe22c2191" />

### Terminal
<img width="658" height="271" alt="WhatsApp Image 2026-09-29 at 1 57 50 PM" src="https://github.com/user-attachments/assets/143c1ac6-7da3-4626-be6a-968547d17448" />

### Admin Registration and Login
<img width="1600" height="802" alt="WhatsApp Image 2026-09-29 at 2 00 04 PM" src="https://github.com/user-attachments/assets/685d775b-9485-4559-b7fc-ed73a302ebbf" />
<img width="1600" height="798" alt="WhatsApp Image 2026-09-29 at 2 00 49 PM" src="https://github.com/user-attachments/assets/c61bf772-8cf9-438e-8dc3-a095602eecb4" />
<img width="1600" height="791" alt="WhatsApp Image 2026-09-29 at 2 01 30 PM" src="https://github.com/user-attachments/assets/4b72ad0d-4fc8-4b8b-8c53-8955995a3de0" />
<img width="1600" height="797" alt="WhatsApp Image 2026-09-29 at 2 01 55 PM" src="https://github.com/user-attachments/assets/ee0d5719-f118-450e-a385-3e53c4d5e9a1" />
<img width="1600" height="801" alt="WhatsApp Image 2026-09-29 at 2 02 06 PM" src="https://github.com/user-attachments/assets/f1655b73-8287-49d1-b930-da17dc043b71" />

### Student Registration and Login
<img width="1600" height="804" alt="WhatsApp Image 2026-09-29 at 2 03 17 PM" src="https://github.com/user-attachments/assets/7953a6aa-f3f7-4b0a-8b51-418baaf131cd" />
<img width="1600" height="809" alt="WhatsApp Image 2026-09-29 at 2 03 47 PM" src="https://github.com/user-attachments/assets/77963b23-ccdc-4f02-92a1-3bf61c833dc9" />
<img width="1600" height="798" alt="WhatsApp Image 2026-09-29 at 2 04 00 PM" src="https://github.com/user-attachments/assets/b872f02b-3b13-47a8-8558-31a3d7a32a01" />








