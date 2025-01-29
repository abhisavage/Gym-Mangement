import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/CommonStyles';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  margin-top: 20px;
`;

const SessionModal = ({ sessions, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Sessions</h2>
        {sessions.length === 0 ? (
          <p>No sessions available for this trainer.</p>
        ) : (
          <ul>
            {sessions.map((session) => (
              <li key={session.id}>
                <h3>{session.title}</h3>
                <p>Date: {new Date(session.schedule).toLocaleDateString()}</p>
                <p>Time: {new Date(session.schedule).toISOString().split('T')[1].split('.')[0]}</p>
                <p>Capacity: {session.availableSpots}</p>
                <hr />
              </li>
            ))}
          </ul>
        )}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SessionModal; 