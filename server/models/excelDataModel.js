const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  EmpID: { type: Number, required: true },
  Name: { type: String, required: true },
  DOB: { type: Date, required: true },
  Designation: { type: String, required: true },
  DOJ: { type: Date, required: true },
  Status: { type: String, required: true },
  Type: { type: String, required: true },
  'Reporting Manager': { type: String, required: true },
  'Notice Period': { type: String, required: true },
  'Work Location': { type: String, required: true },
  'Primary Skill': { type: String, required: true },
  Email: { type: String, required: true },
  Gender: { type: String, required: true },
  'Marital Status': { type: String, required: true },
  'Blood Group': { type: String, required: true },
  'Mobile #': { type: String, required: true },
  'Work Timing': { type: String, required: true },
  Flexibility: { type: Number, required: true },
  'Rest Day': { type: String, required: true },
  'Optional Working Day': { type: String, required: true },
});

const ExcelData = mongoose.model('ExcelData', excelDataSchema);

module.exports = ExcelData;