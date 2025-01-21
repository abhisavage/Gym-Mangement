import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin imports
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminProfile from './pages/AdminProfile/AdminProfile';
import Registration from './pages/Registration/Registration';
import Plan from './pages/Plan/Plan';
import Payment from './pages/Payment/Payment';
import Inventory from './pages/Inventory/Inventory';
import ViewMembers from './pages/ViewMembers/ViewMembers';
import Coaches from './pages/Coaches/Coaches';
import Report from './pages/Report/Report';
import RegisterAdmin from './pages/AdminProfile/RegisterAdmin';

// Client-side imports
import CSPLanding from './pages/ClientSide/CSPLanding';
import CSPMemberDashboard from './pages/ClientSide/CSPMemberDashboard';
import CSPLogin from './pages/ClientSide/CSPLogin';
import TrainerLogin from './pages/TrainerSide/TrainerLogin';
import RoleSelection from './pages/RoleSelection';
import TrainerDashboard from './pages/TrainerSide/TrainerDashboard';
import MemberLogin from './pages/MemberSide/MemberLogin';
import MemberRegister from './pages/MemberSide/MemberRegister';
import MemberDashboard from './pages/MemberSide/MemberDashboard';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CSPLanding />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        {/* <Route path="/member/login" element={<CSPLogin />} /> */}
        <Route path="/trainer/login" element={<TrainerLogin />} />
        <Route path="/admin/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/view-members" element={<ViewMembers />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/report" element={<Report />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />

        {/* Client Routes */}
        <Route path="/member/dashboard" element={<MemberDashboard />} />

        {/* Trainer Routes */}
        <Route 
          path="/trainer/dashboard" 
          element={
            // Basic route protection
            // localStorage.getItem('trainerData') ? 
            <TrainerDashboard />  
            // <Navigate to="/trainer/login" replace />
          } 
        />

        <Route path="/member/login" element={<MemberLogin />} />
        <Route path="/member/register" element={<MemberRegister />} />
      
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
