// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProductManager from './pages/ProductManager';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/employee-login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
