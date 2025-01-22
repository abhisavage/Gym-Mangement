import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  color: #2b3035;
`;

const Header = styled.header`
  background: white url('/assets/images/header-pattern.svg') right center no-repeat;
  background-size: 300px;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    background: linear-gradient(120deg, #1B1B3A, #2D2D5B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`;

const Sidebar = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(120deg, #0052cc10, #ffd70020);
    border-radius: 16px 16px 100% 100%;
    z-index: 0;
  }
`;

const NavButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  margin: 0.8rem 0;
  background: ${props => props.active ? 
    'linear-gradient(120deg, #1B1B3A, #2D2D5B)' : 
    'white'};
  color: ${props => props.active ? 'white' : '#1B1B3A'};
  border: ${props => props.active ? 'none' : '2px solid #1B1B3A'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;

  &:hover {
    background: linear-gradient(120deg, #1B1B3A, #2D2D5B);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 27, 58, 0.2);
  }
`;

const ContentArea = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
`;

const SessionCard = styled.div`
  border-radius: 12px;
  padding: 2rem;
  margin: 1.5rem 0;
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  h3 {
    color: #1B1B3A;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    position: relative;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);

  h4 {
    color: #0052cc;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ffd700;
  }
`;

const Button = styled.button`
  background: linear-gradient(120deg, #1B1B3A, #2D2D5B);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 27, 58, 0.2);
  }
`;

const AvailabilityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  gap: 10px;
`;

const DayBox = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  background: ${({ available }) => (available ? '#e0e0e0' : '#f8f9fa')};
  border: 2px solid ${({ available }) => (available ? '#1B1B3A' : '#ffd700')};
  color: ${({ available }) => (available ? '#1B1B3A' : '#b3a200')};
  transition: background 0.3s ease;
  cursor: ${({ isEditing }) => (isEditing ? 'pointer' : 'default')};

  &:hover {
    background: ${({ available }) => (available ? '#d0d0d0' : '#f0f0f0')};
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 20px;
`;

const ProfileField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid ${props => props.isEditing ? '#1A1B4B' : '#ddd'};
    border-radius: 8px;
    font-size: 16px;
    background: ${props => props.isEditing ? 'white' : '#f8f9fa'};
    ${props => !props.isEditing && 'pointer-events: none;'}
  }

  textarea {
    height: 100px;
    resize: none;
    overflow-y: auto;
    font-family: sans-serif;
  }
`;

const AvailabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
`;

const SessionTypeIcons = {
  'Weight Training': '/assets/icons/weight-training.svg',
  'Cardio': '/assets/icons/cardio.svg',
  'Yoga': '/assets/icons/yoga.svg',
  'CrossFit': '/assets/icons/crossfit.svg'
};

const NavIcons = {
  profile: '/assets/icons/profile.svg',
  availability: '/assets/icons/calendar.svg',
  sessions: '/assets/icons/dumbbell.svg'
};

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    border-color: #1B1B3A;
    box-shadow: 0 0 0 3px rgba(27, 27, 58, 0.1);
    outline: none;
  }
`;

const SessionList = styled.div`
  margin-top: 20px;
`;


const SessionInfo = styled.div`
  flex: 1;
`;

const SessionActions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled(Button)`
  background: linear-gradient(120deg, #1B1B3A, #2D2D5B);
  padding: 8px 16px;
  
  &:hover {
    background: linear-gradient(120deg, #1B1B3A, #2D2D5B);
  }
`;

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    speciality: '',
    experience: '5 years',
    bio: 'Passionate about fitness and helping others achieve their goals.'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [availability, setAvailability] = useState("0000000");
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({
    title: '',
    date: '',
    time: '',
    capacity: '',
    description: ''
  });

  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false); // State for the members modal

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/trainers/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('trainerToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(prevProfile => ({
          ...prevProfile,
          ...data.trainer
        }));
        setAvailability(data.trainer.availability || "0000000");
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trainers/sessions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('trainerToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }

      const data = await response.json();
      setSessions(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('trainerData');
    toast.success('Logged out successfully');
    navigate('/role-selection');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAvailabilityChange = (dayIndex) => {
    const availabilityArray = availability.split('');
    availabilityArray[dayIndex] = availabilityArray[dayIndex] === '1' ? '0' : '1';
    setAvailability(availabilityArray.join(''));
  };

  const handleSaveAvailability = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trainers/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('trainerToken')}`
        },
        body: JSON.stringify({ availability })
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      toast.success('Availability updated successfully!');
      setIsEditingAvailability(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditSession = (session) => {
    const scheduleDate = new Date(session.schedule);
    const date = scheduleDate.toISOString().split('T')[0];
    const time = scheduleDate.toISOString().slice(11, 16);
    console.log(time);

    setEditingSession(session);
    setSessionDetails({
      title: session.sessionName,
      date,
      time,
      capacity: session.capacity.toString(),
      description: session.description
    });
    setIsModalOpen(true);
  };

  const handleSessionSubmit = async (e) => {
    e.preventDefault();

    if (!sessionDetails.date || !sessionDetails.time) {
      toast.error('Please select both date and time');
      return;
    }

    const sessionData = {
      sessionName: sessionDetails.title,
      schedule: `${sessionDetails.date}T${sessionDetails.time}:00.000Z`,
      capacity: parseInt(sessionDetails.capacity),
      description: sessionDetails.description
    };

    try {
      const url = editingSession 
        ? `${API_BASE_URL}/sessions/update/${editingSession.id}`
        : `${API_BASE_URL}/sessions/`;

      const method = editingSession ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('trainerToken')}`
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${editingSession ? 'update' : 'add'} session`);
      }

      toast.success(`Session ${editingSession ? 'updated' : 'added'} successfully!`);
      setIsModalOpen(false);
      setEditingSession(null);
      setSessionDetails({ 
        title: '', 
        date: '', 
        time: '', 
        capacity: '', 
        description: '' 
      });
      fetchSessions();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchRegisteredMembers = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/members`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('trainerToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch registered members');
      }

      const data = await response.json();
      setRegisteredMembers(data);
      setSelectedSessionId(sessionId);
      setIsMembersModalOpen(true); // Open the modal after fetching members
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderRegisteredMembersModal = () => {
    return (
      <Modal>
        <ModalContent>
          <CloseButton onClick={() => setIsMembersModalOpen(false)}>×</CloseButton>
          <h3>Registered Members</h3>
          {registeredMembers.length === 0 ? ( // Check if there are no registered members
            <p style={{ margin: '20px 0' }}>No members registered for this session.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
              {registeredMembers.map(member => (
                <li key={member.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #e9ecef', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                  <h3 style={{ margin: '0', fontSize: '18px' }}>{member.member.name}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>Email: {member.member.email}</p>
                  {member.feedback && (
                    <p style={{ margin: '5px 0', color: '#333' }}>Feedback: {member.feedback}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ModalContent>
      </Modal>
    );
  };

  const renderSessionList = () => {
    const now = new Date();

    return (
      <SessionList>
        {sessions.map(session => {
          const sessionDate = new Date(session.schedule);
          const isUpcoming = sessionDate > now;

          return (
            <SessionCard key={session.id}>
              <SessionInfo>
                <h3>{session.sessionName}</h3>
                <p>Date: {sessionDate.toLocaleDateString('en-GB')}</p>
                <p>Time: {sessionDate.toISOString().slice(11, 16)}</p>
                <p>Capacity: {session.capacity}</p>
                <p>Description: {session.description}</p>
              </SessionInfo>
              {isUpcoming && (
                <SessionActions>
                  <EditButton onClick={() => handleEditSession(session)}>
                    Edit
                  </EditButton>
                  <Button onClick={() => fetchRegisteredMembers(session.id)}>
                    View Members
                  </Button>
                </SessionActions>
              )}
            </SessionCard>
          );
        })}
      </SessionList>
    );
  };

  const renderSessionForm = () => {
    return (
      <div>
        <h2>Training Sessions</h2>
        <Button onClick={() => {
          setEditingSession(null);
          setSessionDetails({ title: '', date: '', time: '', capacity: '', description: '' });
          setIsModalOpen(true);
        }}>
          Add New Session
        </Button>

        {renderSessionList()}

        {isModalOpen && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={() => {
                setIsModalOpen(false);
                setEditingSession(null);
              }}>×</CloseButton>
              <h2>{editingSession ? 'Edit Session' : 'Add New Session'}</h2>
              
              <form onSubmit={handleSessionSubmit}>
                <FormGroup>
                  <label>Session Title</label>
                  <Input
                    type="text"
                    value={sessionDetails.title}
                    onChange={(e) => setSessionDetails({...sessionDetails, title: e.target.value})}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Date</label>
                  <Input
                    type="date"
                    value={sessionDetails.date}
                    onChange={(e) => setSessionDetails({...sessionDetails, date: e.target.value})}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Time</label>
                  <Input
                    type="time"
                    value={sessionDetails.time}
                    onChange={(e) => setSessionDetails({...sessionDetails, time: e.target.value})}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Capacity</label>
                  <Input
                    type="number"
                    min="1"
                    value={sessionDetails.capacity}
                    onChange={(e) => setSessionDetails({...sessionDetails, capacity: e.target.value})}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Description</label>
                  <textarea
                    value={sessionDetails.description}
                    onChange={(e) => setSessionDetails({...sessionDetails, description: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      borderRadius: '5px', 
                      border: '1px solid #ddd',
                      minHeight: '100px'
                    }}
                  />
                </FormGroup>

                <Button type="submit">
                  {editingSession ? 'Update Session' : 'Add Session'}
                </Button>
              </form>
            </ModalContent>
          </Modal>
        )}

        {isMembersModalOpen && renderRegisteredMembersModal()} {/* Render the members modal */}
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <ProfileSection>
            <h2>Profile Information</h2>
            <ProfileField isEditing={isEditing}>
              <label>Name:</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField isEditing={isEditing}>
              <label>Email:</label>
              <input 
                type="email" 
                value={profile.email} 
                onChange={e => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField isEditing={isEditing}>
              <label>Speciality:</label>
              <input 
                type="text" 
                value={profile.speciality} 
                onChange={e => setProfile({...profile, speciality: e.target.value})}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField isEditing={isEditing}>
              <label>Experience:</label>
              <input 
                type="text" 
                value={profile.experience} 
                onChange={e => setProfile({...profile, experience: e.target.value})}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField isEditing={isEditing}>
              <label>Bio:</label>
              <textarea 
                value={profile.bio} 
                onChange={e => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                rows="3"
              />
            </ProfileField>
            <Button onClick={isEditing ? handleSaveChanges : handleEditToggle}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </ProfileSection>
        );

      case 'availability':
        return (
          <ProfileSection>
            <h2>Weekly Availability</h2>
            <AvailabilityContainer>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <DayBox
                  key={day}
                  available={availability[index] === '1'}
                  isEditing={isEditingAvailability}
                  onClick={isEditingAvailability ? () => handleAvailabilityChange(index) : undefined}
                >
                  {day}  {availability[index] === '1' ? 'Available' : 'Unavailable'}
                </DayBox>
              ))}
            </AvailabilityContainer>
            <Button onClick={isEditingAvailability ? handleSaveAvailability : () => setIsEditingAvailability(true)}>
              {isEditingAvailability ? 'Save' : 'Edit'}
            </Button>
          </ProfileSection>
        );

      case 'sessions':
        return renderSessionForm();

      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <h1>Welcome, Trainer {profile.name}</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </Header>

      <MainContent>
        <Sidebar>
          <NavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </NavButton>
          <NavButton 
            active={activeTab === 'availability'} 
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </NavButton>
          <NavButton 
            active={activeTab === 'sessions'} 
            onClick={() => setActiveTab('sessions')}
          >
            Sessions
          </NavButton>
        </Sidebar>

        <ContentArea>
          {renderContent()}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default TrainerDashboard; 