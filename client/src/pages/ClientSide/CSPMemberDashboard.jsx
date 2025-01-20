import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const WelcomeSection = styled.div`
  h1 {
    color: #1A1B4B;
    font-size: 32px;
    margin-bottom: 8px;
  }
  p {
    color: #666;
    font-size: 16px;
  }
`;

const ProfileButton = styled.button`
  background: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  color: #1A1B4B;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  h2 {
    color: #1A1B4B;
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const MembershipCard = styled(Card)`
  background: linear-gradient(135deg, #1A1B4B 0%, #4A4B8F 100%);
  color: white;

  h2 {
    color: white;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  margin-top: 15px;
  overflow: hidden;

  div {
    width: ${props => props.progress}%;
    height: 100%;
    background: white;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const ClassList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ClassItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F8F9FF;
  border-radius: 8px;

  .class-info {
    h3 {
      color: #1A1B4B;
      font-size: 16px;
      margin-bottom: 4px;
    }
    p {
      color: #666;
      font-size: 14px;
    }
  }
`;

const CSPMemberDashboard = () => {
  const navigate = useNavigate();
  const memberName = "John Doe"; // This would come from your auth context/state

  return (
    <DashboardContainer>
      <Header>
        <WelcomeSection>
          <h1>Welcome back, {memberName}!</h1>
          <p>Here's what's happening with your fitness journey</p>
        </WelcomeSection>
        <ProfileButton onClick={() => navigate('/member/profile')}>
          View Profile
        </ProfileButton>
      </Header>

      <DashboardGrid>
        <MembershipCard>
          <h2>Membership Status</h2>
          <p>Premium Plan</p>
          <p>Valid until: Dec 31, 2024</p>
          <ProgressBar progress={75}>
            <div />
          </ProgressBar>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>75 days remaining</p>
        </MembershipCard>

        <Card>
          <h2>Upcoming Classes</h2>
          <ClassList>
            <ClassItem>
              <div className="class-info">
                <h3>Yoga Basics</h3>
                <p>Today, 2:00 PM</p>
              </div>
              <button>Join</button>
            </ClassItem>
            <ClassItem>
              <div className="class-info">
                <h3>HIIT Training</h3>
                <p>Tomorrow, 10:00 AM</p>
              </div>
              <button>Join</button>
            </ClassItem>
          </ClassList>
        </Card>

        <Card>
          <h2>Recent Activity</h2>
          <ClassList>
            <ClassItem>
              <div className="class-info">
                <h3>Weight Training</h3>
                <p>Yesterday, 3:00 PM</p>
              </div>
              <span>Completed</span>
            </ClassItem>
            <ClassItem>
              <div className="class-info">
                <h3>Cardio Session</h3>
                <p>2 days ago</p>
              </div>
              <span>Completed</span>
            </ClassItem>
          </ClassList>
        </Card>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default CSPMemberDashboard; 