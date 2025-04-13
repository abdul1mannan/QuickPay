const express = require("express");
const { connectDB } = require("./db");
const apiRouter = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use(express.json());

// Route requests to /api/v1
app.use("/api/v1", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
