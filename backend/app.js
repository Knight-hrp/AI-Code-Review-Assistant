const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("AI Code Review Assistant Backend Running 🚀");
});

app.use("/api/reviews", reviewRoutes);

module.exports = app;