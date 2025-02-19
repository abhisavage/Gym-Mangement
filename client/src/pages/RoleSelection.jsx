import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h1`
  color: #1A1B4B;
  margin-bottom: 50px;
  text-align: center;
  font-size: 32px;
`;

const RolesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
`;

const RoleCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }

  h2 {
    color: #1A1B4B;
    margin-bottom: 15px;
    font-size: 24px;
  }

  p {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: transparent;
  border: 2px solid #1A1B4B;
  color: #1A1B4B;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1A1B4B;
    color: white;
  }
`;

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    switch(role) {
      case 'member':
        navigate('/member/login');
        break;
      case 'trainer':
        navigate('/trainer/login');
        break;
      case 'admin':
        navigate('/admin/login');
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/')}>← Back to Home</BackButton>
      
      <Title>Select Your Role</Title>
      
      <RolesContainer>
        <RoleCard onClick={() => handleRoleSelect('member')}>
          <img src="/assets/user.png" alt="Member" />
          <h2>Member</h2>
          <p>Access your fitness programs, track progress, and manage your membership</p>
        </RoleCard>

        <RoleCard onClick={() => handleRoleSelect('trainer')}>
          <img src="/assets/trainer1.png" alt="Trainer" />
          <h2>Trainer</h2>
          <p>Manage your clients, schedules, and training programs</p>
        </RoleCard>

        <RoleCard onClick={() => handleRoleSelect('admin')}>
          <img src="/assets/admin.png" alt="Admin" />
          <h2>Admin</h2>
          <p>Access system settings, manage users, and oversee operations</p>
        </RoleCard>
      </RolesContainer>
    </PageContainer>
  );
};

export default RoleSelection; 