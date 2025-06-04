import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './src/pages/Homepage';
import CreateNewsPage from './src/pages/CreateNewsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNewsPage />} />       
      </Routes>
    </BrowserRouter>
  );
}

export default App;