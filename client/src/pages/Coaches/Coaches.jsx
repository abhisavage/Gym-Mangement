import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  PageContainer,
  MainContent,
  Header,
  Logo,
  HeaderActions,
  FeedbackButton,
  NotificationIcon,
  Card,
  Button
} from '../../styles/CommonStyles';
import API_BASE_URL from '../../config';
import axios from 'axios';
import SessionModal from '../../components/Session/SessionModal';

const Title = styled.h1`
  color: #1A1B4B;
  font-size: 48px;
  margin-bottom: 30px;
  font-weight: 600;
  animation: slideIn 0.4s ease-out;
`;

const TableCard = styled(Card)`
  background: #9195C5;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(26, 27, 75, 0.1);
`;

const SubTitle = styled.h2`
  color: #1A1B4B;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-bottom: 25px;
`;

const Th = styled.th`
  text-align: left;
  padding: 15px;
  color: #1A1B4B;
  font-weight: 600;
  border-bottom: 2px solid rgba(26, 27, 75, 0.1);
`;

const Td = styled.td`
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  color: #1A1B4B;
`;

const ActionButton = styled(Button)`
  background: rgba(26, 27, 75, 0.1);
  color: #1A1B4B;
  padding: 8px 25px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: rgba(26, 27, 75, 0.2);
    transform: translateY(-1px);
  }
`;

const Coaches = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/trainers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setTrainers(response.data); // Assuming the response data is an array of trainers
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const fetchAvailableSessions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sessions/available`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setSessions(response.data.sessions); // Assuming the response contains a "sessions" array
    } catch (err) {
      toast.error('Failed to fetch available sessions');
    }
  };

  const handleSessionsClick = (trainerId) => {
    fetchAvailableSessions();
    setSelectedTrainerId(trainerId);
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <Header>
          <Logo src="/assets/stamina-logo.png" alt="Stamina Fitness" />
          <HeaderActions>
            <FeedbackButton onClick={() => toast.info('Feedback feature coming soon!')}>
              Feedback
            </FeedbackButton>
            <NotificationIcon onClick={() => toast.info('No new notifications')}>
              🔔
            </NotificationIcon>
          </HeaderActions>
        </Header>

        <Title>Active Coaches</Title>

        <TableCard>
          <SubTitle>Manage Coaches</SubTitle>

          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Coach ID</Th>
                <Th>Email</Th>
                <Th>Sessions</Th>
                <Th>Availability</Th>
              </tr>
            </thead>
            <tbody>
              {trainers.map(trainer => (
                <tr key={trainer.id}>
                  <Td>{trainer.name}</Td>
                  <Td>{trainer.id.slice(-12)}</Td> {/* Display only the last 12 characters of trainer ID */}
                  <Td>{trainer.email}</Td>
                  <Td>
                    <ActionButton onClick={() => handleSessionsClick(trainer.id)}>
                      Sessions
                    </ActionButton>
                  </Td>
                  <Td>
                    <ActionButton onClick={() => {/* Logic to show availability */}}>
                      Availability
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>

        {showModal && (
          <SessionModal sessions={sessions} onClose={() => setShowModal(false)} />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Coaches; 