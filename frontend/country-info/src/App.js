// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountriesList from './components/CountriesList.js';
import CountryDetail from './components/CountryDetail.js';


function App() {
  return (
      <Router>
    <Routes>
      <Route path="/" element={<CountriesList />} />
      <Route path="/country/:code" element={<CountryDetail />} />
    </Routes>
  </Router>
    
  );
}

export default App;
