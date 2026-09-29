const express = require("express");

const { exams } = require("../data");
const { authenticate, requireAdmin } = require("../middleware/auth");

const router = express.Router();


// Admin: get all exams
router.get("/", authenticate, requireAdmin, (req, res) => {
    res.json(exams);
});


// Student: get only their own year + section
router.get("/my", authenticate, (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({
            message: "Student access required."
        });
    }

    const studentExams = exams.filter(exam =>
        exam.year === req.user.year &&
        exam.section === req.user.section
    );

    res.json(studentExams);
});


// Admin: add exam
router.post("/", authenticate, requireAdmin, (req, res) => {
    const {
        subject,
        year,
        section,
        examDate,
        startTime,
        endTime
    } = req.body;

    if (
        !subject ||
        !year ||
        !section ||
        !examDate ||
        !startTime ||
        !endTime
    ) {
        return res.status(400).json({
            message: "All exam fields are required."
        });
    }

    if (endTime <= startTime) {
        return res.status(400).json({
            message: "Exam end time must be after start time."
        });
    }

    const exam = {
        id: Date.now().toString(),
        subject,
        year,
        section: section.toUpperCase(),
        examDate,
        startTime,
        endTime
    };

    exams.push(exam);

    res.status(201).json({
        message: "Exam added successfully.",
        exam
    });
});


// Admin: delete exam
router.delete("/:id", authenticate, requireAdmin, (req, res) => {
    const index = exams.findIndex(
        exam => exam.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Exam not found."
        });
    }

    exams.splice(index, 1);

    res.json({
        message: "Exam deleted successfully."
    });
});

module.exports = router;