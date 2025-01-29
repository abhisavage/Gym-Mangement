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
import TrainerLogin from './pages/TrainerSide/TrainerLogin';
import TrainerReg from './pages/TrainerSide/TrainerReg';
import RoleSelection from './pages/RoleSelection';
import TrainerDashboard from './pages/TrainerSide/TrainerDashboard';
import MemberLogin from './pages/MemberSide/MemberLogin';
import MemberRegister from './pages/MemberSide/MemberRegister';
import MemberDashboard from './pages/MemberSide/MemberDashboard';
import MemberPlan from './pages/MemberSide/MemberPlan';
import AIAssistant from './pages/MemberSide/AIAssistant';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CSPLanding />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
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
        <Route path="/member/login" element={<MemberLogin />} />
        <Route path="/member/register" element={<MemberRegister />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/member/buyplan" element={<MemberPlan/>} />
        <Route path="/member/AI" element={<AIAssistant/>}/>

        {/* Trainer Routes */}
        <Route path="/trainer/login" element={<TrainerLogin />} />
        <Route path="/trainer/register" element={<TrainerReg/>} />
        <Route path="/trainer/dashboard" element={<TrainerDashboard />  } />   
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
