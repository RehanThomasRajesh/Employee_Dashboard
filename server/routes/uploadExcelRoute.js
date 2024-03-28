const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const Filter = require('../models/filterModel'); // Assuming filter model is already defined
const ExcelData = require('../models/excelDataModel'); // Assuming Excel data model is already defined
const { mongoose } = require('./db'); // Import mongoose from your db.js file
const router = express.Router();

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/upload-excel', upload.single('excelFile'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet);

    await saveExcelData(excelData);

    saveFilters(req.body.filters);

    res.status(200).send('Excel data uploaded and saved successfully');
  } catch (error) {
    console.error('Error uploading Excel data:', error);
    res.status(500).json({ error: 'Error uploading Excel data' });
  }
});

async function saveExcelData(data) {
  try {
    await ExcelData.insertMany(data);
    console.log('Excel data saved to the database');
  } catch (error) {
    console.error('Error saving Excel data:', error);
    throw error;
  }
}

router.post('/save-filters', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      console.error('No filters received or invalid format');
      return res.status(400).json({ error: 'No filters received or invalid format' });
    }

    saveFilters(req.body);

    res.status(200).send('Filters saved successfully');
  } catch (error) {
    console.error('Error saving filters to the database:', error);
    res.status(500).json({ error: 'Error saving filters to the database' });
  }
});

async function saveFilters(filters) {
  console.log('Filters received from the frontend:', filters);
  const filterEntries = Object.entries(filters);
  for (const [field, filterType] of filterEntries) {
    const filterInstance = new Filter({
      field,
      filterType,
    });
    await filterInstance.save();
  }
}

module.exports = router;
