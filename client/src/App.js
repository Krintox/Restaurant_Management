import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReservationForm from './components/ReservationForm';
import OrderManagement from './components/OrderManagement';
import InventoryManagement from './components/InventoryManagement';
import StaffManagement from './components/StaffManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MenuItemsPage from './components/MenuItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReservationForm />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/menuitem" element={<MenuItemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
