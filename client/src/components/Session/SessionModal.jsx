import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/CommonStyles';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config';

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

const SessionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SessionItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SessionName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const SessionDetails = styled.p`
  margin: 5px 0;
`;

const DeleteButton = styled(Button)`
  background: red;
  color: white;
  margin-top: 10px;
`;

const SessionModal = ({ sessions, onClose, updateSessions }) => {
  const handleDeleteSession = async (sessionId) => {
    try {
      await axios.delete(`${API_BASE_URL}/sessions/delete/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      toast.success('Session deleted successfully');
      updateSessions(sessionId);
    } catch (error) {
      toast.error('Failed to delete session');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Sessions</h2>
        {sessions.length === 0 ? (
          <p>No sessions available for this trainer.</p>
        ) : (
          <SessionList>
            {sessions.map((session) => (
              <SessionItem key={session.id}>
                <SessionName>{session.sessionName}</SessionName>
                <SessionDetails>Date: {new Date(session.schedule).toLocaleDateString()}</SessionDetails>
                <SessionDetails>Time: {new Date(session.schedule).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</SessionDetails>
                <SessionDetails>Capacity: {session.capacity}</SessionDetails>
                <SessionDetails>Description: {session.description}</SessionDetails>
                <DeleteButton onClick={() => handleDeleteSession(session.id)}>Delete</DeleteButton>
              </SessionItem>
            ))}
          </SessionList>
        )}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SessionModal; 