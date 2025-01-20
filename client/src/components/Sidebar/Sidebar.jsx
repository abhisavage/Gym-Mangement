import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const SidebarContainer = styled.div`
  background: #1A1B4B;
  width: 280px;
  height: 100vh;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const AdminName = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const AdminEmail = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const NavLink = styled.div`
  padding: 12px 20px;
  border-radius: 12px;
  color: ${props => props.active ? '#1A1B4B' : 'white'};
  background: ${props => props.active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateX(5px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const LogoutButton = styled.div`
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    color: #FF4757;
    transform: translateX(5px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear(); // Clear any session data if you're using it
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to login page
    navigate('/login', { replace: true }); // Using replace: true prevents going back to protected pages
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/admin-profile', name: 'Admin Profile', icon: '👤' },
    // { path: '/registration', name: 'Registration', icon: '📝' },
    { path: '/plan', name: 'Plan', icon: '📅' },
    // { path: '/payment', name: 'Payment', icon: '💰' },
    { path: '/inventory', name: 'Inventory', icon: '📦' },
    { path: '/view-members', name: 'View Members', icon: '👥' },
    { path: '/coaches', name: 'Coaches', icon: '🏋️' },
    { path: '/report', name: 'Report', icon: '📈' }
  ];

  return (
    <SidebarContainer>
      <ProfileSection>
        <ProfileImage>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
          </svg>
        </ProfileImage>
        <AdminName>Administrator Name</AdminName>
        <AdminEmail>juan.delacruz@gmail.com</AdminEmail>
      </ProfileSection>

      <NavLinks>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </NavLinks>

      <LogoutButton onClick={() => navigate('/admin/login')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
        </svg>
        Logout
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;