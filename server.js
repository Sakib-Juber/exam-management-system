const express = require("express");
const path = require("path");

const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exams");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});