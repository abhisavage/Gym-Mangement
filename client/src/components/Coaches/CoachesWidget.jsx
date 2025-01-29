import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CoachCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  margin: 0;
`;

const ViewAll = styled(Link)`
  color: #1a1b4b;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CoachList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CoachItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CoachAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
`;

const CoachName = styled.div`
  font-weight: 500;
`;

const CoachesWidget = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/trainers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use the appropriate token
          },
        });
        setTrainers(response.data); // Assuming response.data is an array of trainers
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <CoachCard>
      <Header>
        <Title>Coaches</Title>
        <ViewAll to="/coaches">View All</ViewAll>
      </Header>
      <CoachList>
        {trainers.map(trainer => (
          <CoachItem key={trainer.id}>
            <CoachAvatar />
            <CoachName>{trainer.name}</CoachName>
          </CoachItem>
        ))}
      </CoachList>
    </CoachCard>
  );
};

export default CoachesWidget;
