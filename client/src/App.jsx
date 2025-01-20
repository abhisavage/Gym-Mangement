import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminProfile from './pages/AdminProfile/AdminProfile';
import RegisterAdmin from './pages/AdminProfile/RegisterAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;