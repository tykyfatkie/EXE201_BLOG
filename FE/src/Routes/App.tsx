import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreateNewsPage from '../pages/CreateNewsPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import Dashboard from '../pages/Dashboard';
import BlogDetail from '../pages/BlogDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNewsPage />} />  
        <Route path="/login" element={<AdminLoginPage />} />     
        <Route path="/CaiUrlDashboardNayChacChanKhongAiBietDauHaHaHa" element={<Dashboard />} />   
        <Route path="/blog/:id" element={<BlogDetail />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;