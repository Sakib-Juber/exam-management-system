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
4. The system valid
