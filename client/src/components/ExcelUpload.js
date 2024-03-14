import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

function ExcelUpload() {
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [excelData, setExcelData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      console.error('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(parsedData);
      setShowSuccessMessage(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddFilterClick = () => {
    setShowPopup(true);
  };

  const handleFilterChange = (field, filter) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: filter }));
  };

  const handleSaveFilters = async () => {
    try {
      if (Object.keys(filters).length === 0) {
        throw new Error('No filters selected');
      }
  
      console.log('Filters to be sent to the backend:', filters);
  
      const response = await axios.post('/api/upload/save-filters', filters);
  
      console.log('Response from the backend:', response.data);
      setShowPopup(false);
  
      setFilters({});
    } catch (error) {
      console.error('Error sending filters to the backend:', error.message);
      // Handle the error, e.g., show a notification to the user
    }
  };
  return (
    <div className="container">
      {/* Upload File Section */}
      <div className="card mt-5">
        <div className="card-body">
          <h2 className="card-title">Excel Upload</h2>
          <input className="form-control mb-3" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
          {showSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              File uploaded successfully!
            </div>
          )}
          {excelData && (
            <div className="mt-3" style={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
              <h3>Preview of Uploaded Excel</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {excelData[0].map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showSuccessMessage && (
            <button className="btn btn-primary mt-3" onClick={handleAddFilterClick}>Add Filter</button>
          )}
        </div>
      </div>

      {/* Add Filter Popup */}
      {showPopup && (
        <div className="card mt-3">
          <div className="card-body">
            <h2 className="card-title">Add Filters</h2>
            <form>
              <div className="row">
                {excelData && excelData[0].map((field, index) => (
                  <div key={index} className="form-group col-md-4">
                    <label>{field}</label>
                    <select className="form-control" onChange={(e) => handleFilterChange(field, e.target.value)}>
                      <option value="">Select Filter</option>
                      <option value="No Filter">No Filter</option>
                      <option value="Text">Text</option>
                      <option value="Integer">Integer</option>
                      <option value="List">List</option>
                      <option value="Date">Date</option>
                      <option value="Boolean">Boolean</option>
                    </select>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSaveFilters}>Save Filters</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcelUpload;
