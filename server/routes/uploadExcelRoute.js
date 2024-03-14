const express = require('express');
const bodyParser = require('body-parser');
const Filter = require('../models/filterModel');
const router = express.Router();

const app = express(); // Initialize Express app
app.use(bodyParser.json());

router.post('/save-filters', async (req, res) => {
  try {
    console.log('Request body:', req.body);

    if (!req.body || typeof req.body !== 'object') {
      console.error('No filters received or invalid formats');
      return res.status(400).json({ error: 'No filters received or invalid format' });
    }

    const filters = req.body;

    // Handle filters as needed
    console.log('Filters received from the frontend:', filters);

    // Example of saving filters to the database
    // filters.forEach(async filter => {
    //   const filterInstance = new Filter({
    //     field: filter.field,
    //     filterType: filter.filterType
    //   });
    //   await filterInstance.save();
    // });

    res.status(200).send('Filters saved successfully');
  } catch (error) {
    console.error('Error saving filters to the database:', error);
    res.status(500).json({ error: 'Error saving filters to the database' });
  }
});

module.exports = router;
