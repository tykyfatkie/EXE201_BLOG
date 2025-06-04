import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './src/pages/HomePage';
import CreateNewsPage from './src/pages/CreateNewsPage';
import AdminLoginPage from './src/pages/AdminLoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNewsPage />} />  
        <Route path="/login" element={<AdminLoginPage />} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;