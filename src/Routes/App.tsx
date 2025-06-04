import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreateNewsPage from '../pages/CreateNewsPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import Dashboard from '../pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNewsPage />} />  
        <Route path="/login" element={<AdminLoginPage />} />     
        <Route path="/dashboard" element={<Dashboard />} />   
      </Routes>
    </BrowserRouter>
  );
}

export default App;