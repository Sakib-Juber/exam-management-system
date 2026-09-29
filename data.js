const users = [
    {
        id: "1",
        name: "Admin",
        email: "admin@test.com",
        password: "admin123",
        role: "admin"
    },
    {
        id: "2",
        name: "Test Student",
        email: "student@test.com",
        password: "student123",
        role: "student",
        year: "2",
        section: "A"
    }
];

const exams = [
    {
        id: "1",
        subject: "Computer Networks",
        year: "2",
        section: "A",
        examDate: "2026-10-10",
        startTime: "10:00",
        endTime: "12:00"
    }
];

module.exports = { users, exams };