// App.js
import React from 'react';
import LoginPage from './components/LoginPage';
import ExcelUpload from './components/ExcelUpload';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/upload" element={<ExcelUpload />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
