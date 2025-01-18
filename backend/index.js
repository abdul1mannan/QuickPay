const express = require('express');
const { connectDB } = require('./db'); // Assuming db.js is in the same directory level
const apiRouter = require('./routes/index');
const cors = require('cors');


const app = express();


app.use(cors());



connectDB();


app.use(express.json());

// Route requests to /api/v1
app.use('/api/v1', apiRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});