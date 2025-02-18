import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../../styles/CommonStyles';
import API_BASE_URL from '../../config';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(26, 27, 75, 0.1);
`;

const Title = styled.h2`
  color: #1A1B4B;
  font-size: 24px;
  margin-bottom: 20px;
`;

const AvailabilityList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayLabel = styled.span`
  font-size: 14px;
  color: #1A1B4B;
`;

const AvailabilityStatus = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => (props.isAvailable ? 'green' : 'red')};
  border-radius: 50%;
`;

const CloseButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  padding: 10px 20px;
  border-radius: 15px;
  font-weight: 500;
  margin-top: 20px;
`;

const AvailabilityModal = ({ trainerId, onClose }) => {
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/trainers/profile/${trainerId}`);
        setAvailability(response.data.trainer.availability);
      } catch (err) {
        console.error('Error fetching availability:', err);
      }
    };

    fetchAvailability();
  }, [trainerId]);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Coach Availability</Title>
        <AvailabilityList>
          {daysOfWeek.map((day, index) => (
            <Day key={index}>
              <DayLabel>{day}</DayLabel>
              <AvailabilityStatus isAvailable={availability[index] === '1'} />
            </Day>
          ))}
        </AvailabilityList>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default AvailabilityModal;
