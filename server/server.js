// server.js
const express = require('express');
const app = express();

const dbConfig = require("./db");
const uploadExcelRoute = require('./routes/uploadExcelRoute');

// Routes
app.use('/api/upload', uploadExcelRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
app.listen(PORT, () => console.log(`Node app listening on port ${PORT}!`));
