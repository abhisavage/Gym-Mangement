import { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar/Sidebar';
import Calendar from '../../components/Calendar/Calendar';
import InventoryWidget from '../../components/Inventory/InventoryWidget';
import CoachesWidget from '../../components/Coaches/CoachesWidget';
import SalesWidget from '../../components/Sales/SalesWidget.jsx';
import ActiveMembersWidget from '../../components/Members/ActiveMembersWidget';
import {PageContainer} from '../../styles/CommonStyles';


const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F5F5F5;
`;

const MainContent = styled.div`
  margin-left: 280px;
  padding: 20px;
  flex-grow: 1;
  display: flex;
  gap: 20px;
`;

const ContentArea = styled.div`
  flex-grow: 1;
`;

const SideArea = styled.div`
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(26, 27, 75, 0.1);
`;

const Logo = styled.img`
  height: 45px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: white;
  cursor: pointer;
`;

const WelcomeBanner = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const FeedbackButton = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  cursor: pointer;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(26, 27, 75, 0.05);
  }
`;

const NotificationIcon = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  cursor: pointer;
  font-size: 20px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(26, 27, 75, 0.05);
    transform: scale(1.1);
  }
`;

const Dashboard = () => {
  const handleFeedback = () => {
    toast.info('Feedback feature coming soon!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleNotifications = () => {
    toast.info('No new notifications', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <ContentArea>
          <Header>
            <Logo src="/assets/stamina-logo.png" alt="Stamina Fitness" />
            <HeaderActions>
              <FeedbackButton onClick={handleFeedback}>
                Feedback
              </FeedbackButton>
              <NotificationIcon onClick={handleNotifications}>
                🔔
              </NotificationIcon>
            </HeaderActions>
          </Header>

          <WelcomeBanner>
            <h2>Welcome Admin</h2>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </WelcomeBanner>

          <StatsSection>
            <CoachesWidget />
            <SalesWidget />
          </StatsSection>

          <ActiveMembersWidget />
        </ContentArea>

        <SideArea>
          <Calendar />
          <InventoryWidget />
        </SideArea>
        <ToastContainer />
      </MainContent>
    </PageContainer>
  );
};

export default Dashboard;