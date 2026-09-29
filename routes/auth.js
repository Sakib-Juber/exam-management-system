const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { users } = require("../data");

const router = express.Router();

const JWT_SECRET = "exam-management-secret";

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, year, section } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        if (!["admin", "student"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role."
            });
        }

        if (role === "student" && (!year || !section)) {
            return res.status(400).json({
                message: "Year and section are required for students."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        if (users.some(user => user.email === normalizedEmail)) {
            return res.status(400).json({
                message: "Email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: Date.now().toString(),
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role
        };

        if (role === "student") {
            user.year = year;
            user.section = section.toUpperCase();
        }

        users.push(user);

        res.status(201).json({
            message: "Registration successful."
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error."
        });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const user = users.find(
            user => user.email === email.toLowerCase().trim()
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        if (user.role !== role) {
            return res.status(401).json({
                message: "Incorrect role selected."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                role: user.role,
                year: user.year,
                section: user.section
            },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                year: user.year,
                section: user.section
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error."
        });
    }
});

module.exports = router;