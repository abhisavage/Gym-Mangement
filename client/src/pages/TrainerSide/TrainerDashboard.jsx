import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  position: relative;
  overflow: hidden;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 27, 58, 0.2);
  }
`;

const DayBox = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  background: ${props => props.available ? 
    'linear-gradient(135deg, #1B1B3A10, #2D2D5B10)' : 
    'linear-gradient(135deg, #ffd70010, #ffd70020)'};
  border: 2px solid ${props => props.available ? '#1B1B3A' : '#ffd700'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: ${props => props.available ? '#1B1B3A' : '#b3a200'};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
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

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Trainer User',
    email: 'trainer@example.com',
    speciality: 'Weight Training',
    experience: '5 years',
    bio: 'Certified personal trainer with expertise in strength training.'
  });

  const [availability, setAvailability] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Weight Training 101',
      time: '09:00 AM',
      duration: '1 hour',
      capacity: 5,
      enrolled: 3
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    title: '',
    time: '',
    duration: '',
    capacity: '',
    description: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('trainerData');
    toast.success('Logged out successfully');
    navigate('/role-selection');
  };

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully!');
  };

  const toggleAvailability = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
    toast.success(`Availability updated for ${day}`);
  };

  const openEditModal = (session) => {
    setEditingSession(session);
    setSessionForm({
      title: session.title,
      time: session.time,
      duration: session.duration,
      capacity: session.capacity,
      description: session.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    
    if (editingSession) {
      // Update existing session
      setSessions(sessions.map(session => 
        session.id === editingSession.id 
          ? { ...session, ...sessionForm }
          : session
      ));
      toast.success('Session updated successfully!');
    } else {
      // Add new session
      const newSession = {
        id: sessions.length + 1,
        ...sessionForm,
        enrolled: 0
      };
      setSessions([...sessions, newSession]);
      toast.success('New session added successfully!');
    }
    
    setIsModalOpen(false);
    setEditingSession(null);
  };

  const addNewSession = () => {
    setEditingSession(null);
    setSessionForm({
      title: '',
      time: '',
      duration: '',
      capacity: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <ProfileSection>
            <h2>Profile Information</h2>
            <Input 
              type="text" 
              value={profile.name} 
              onChange={e => setProfile({...profile, name: e.target.value})}
              placeholder="Name"
            />
            <Input 
              type="email" 
              value={profile.email} 
              onChange={e => setProfile({...profile, email: e.target.value})}
              placeholder="Email"
            />
            <Input 
              type="text" 
              value={profile.speciality} 
              onChange={e => setProfile({...profile, speciality: e.target.value})}
              placeholder="Speciality"
            />
            <Input 
              type="text" 
              value={profile.experience} 
              onChange={e => setProfile({...profile, experience: e.target.value})}
              placeholder="Experience"
            />
            <textarea 
              value={profile.bio} 
              onChange={e => setProfile({...profile, bio: e.target.value})}
              placeholder="Bio"
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <Button onClick={handleProfileUpdate}>Update Profile</Button>
          </ProfileSection>
        );

      case 'availability':
        return (
          <div>
            <h2>Availability</h2>
            <AvailabilityGrid>
              {Object.entries(availability).map(([day, available]) => (
                <DayBox 
                  key={day} 
                  available={available}
                  onClick={() => toggleAvailability(day)}
                >
                  {day}
                  <br />
                  {available ? 'Available' : 'Unavailable'}
                </DayBox>
              ))}
            </AvailabilityGrid>
          </div>
        );

      case 'sessions':
        return (
          <div>
            <h2>Training Sessions</h2>
            <Button onClick={addNewSession}>Add New Session</Button>
            {sessions.map(session => (
              <SessionCard key={session.id}>
                <h3>{session.title}</h3>
                <p>Time: {session.time}</p>
                <p>Duration: {session.duration}</p>
                <p>Capacity: {session.enrolled}/{session.capacity}</p>
                <Button onClick={() => openEditModal(session)}>
                  Edit Session
                </Button>
              </SessionCard>
            ))}

            {isModalOpen && (
              <Modal>
                <ModalContent>
                  <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
                  <h2>{editingSession ? 'Edit Session' : 'Add New Session'}</h2>
                  
                  <form onSubmit={handleSessionSubmit}>
                    <FormGroup>
                      <label>Session Title</label>
                      <Input
                        type="text"
                        value={sessionForm.title}
                        onChange={e => setSessionForm({...sessionForm, title: e.target.value})}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Time</label>
                      <Input
                        type="time"
                        value={sessionForm.time}
                        onChange={e => setSessionForm({...sessionForm, time: e.target.value})}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Duration (minutes)</label>
                      <Input
                        type="number"
                        min="15"
                        step="15"
                        value={sessionForm.duration}
                        onChange={e => setSessionForm({...sessionForm, duration: e.target.value})}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Capacity</label>
                      <Input
                        type="number"
                        min="1"
                        value={sessionForm.capacity}
                        onChange={e => setSessionForm({...sessionForm, capacity: e.target.value})}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Description</label>
                      <textarea
                        value={sessionForm.description}
                        onChange={e => setSessionForm({...sessionForm, description: e.target.value})}
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <h1>Trainer Dashboard</h1>
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