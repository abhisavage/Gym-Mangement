import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../../config';

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
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

const LogoutButton = styled.button`
  background: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  color: #1A1B4B;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  margin: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
  justify-items: center;
  justify-content: center;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  /* Target the last two items (Upcoming Classes and Recent Activity) */
  & > *:nth-last-child(-n+2) {
    grid-column: span 1;
  }

  /* When screen is smaller and grid wraps, ensure proper spacing */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(350px, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(350px, 1fr);
  }
`;

const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  min-height: 200px;
  width: 100%;
  max-width: 450px;

  /* First three cards (Membership, Record Equipment, Recent Equipment) take full width */
  &:nth-child(-n+3) {
    width: 100%;
  }

  h2 {
    color: #1A1B4B;
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0f0;
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

const EquipmentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .form-row {
    display: flex;
    gap: 15px;
    align-items: flex-end;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  label {
    font-weight: 500;
    color: #1A1B4B;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #1A1B4B;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #1A1B4B;
  }
`;

const Button = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2A2B5B;
    transform: translateY(-2px);
  }
`;

const UsageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const UsageCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .usage-info {
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

const DeleteButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff6b81;
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

const JoinButton = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background: #2A2B5B;
  }
`;

const StatusTag = styled.span`
  color: #28a745;
  font-size: 14px;
  font-weight: 500;
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
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  position: relative;
  max-height: 85vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const EditButton = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2A2B5B;
    transform: translateY(-2px);
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 20px;
  
  h3 {
    color: #1A1B4B;
    margin-bottom: 10px;
    font-size: 18px;
  }
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
`;

const SaveButton = styled(EditButton)`
  background: #28a745;
  
  &:hover {
    background: #218838;
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #ff4757;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 15px;
  font-size: 24px;
  color: #1A1B4B;
`;

const ModalText = styled.p`
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
  
`;

const UpcomingClassList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between class items */
  max-height: 250px; /* Set a maximum height for the list */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const ShowMoreButton = styled.button`
  background: #1A1B4B; /* Primary button color */
  color: white;
  border: none;
  padding: 10px 20px; /* Padding for button */
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px; /* Margin above the button */

  &:hover {
    background: #2A2B5B; /* Darker shade on hover */
  }
`;

const MemberDashboard = () => {
  const navigate = useNavigate();
  const memberName = JSON.parse(localStorage.getItem('memberData')).member.name; // This retrieves the name from localStorage
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [duration, setDuration] = useState('');
  const [usageHistory, setUsageHistory] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]); // State for upcoming classes
  const [selectedSession, setSelectedSession] = useState(null); // State for selected session
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]); // State for equipment
  const [attendedSessions, setAttendedSessions] = useState([]);
  const [profileData, setProfileData] = useState(false);
  const [visibleSessions, setVisibleSessions] = useState(3); // State to control the number of visible sessions

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('memberToken'); // Get the member token from local storage
        const response = await axios.get(`${API_BASE_URL}/members/profile`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        });
        
        // Map the API response to profileData
        setProfileData({
          name: response.data.name,
          email: response.data.email,
          phone: '+1 234 567 8900', // Dummy data
          age: response.data.age,
          address: '123 Fitness Street, Gym City', // Dummy data
          emergencyContact: 'Jane Doe - +1 234 567 8901', // Dummy data
          healthConditions: 'None', // Dummy data
          fitnessGoals: 'Build muscle and improve endurance', // Dummy data
          membershipPlanName: response.data.membership.planName, // New field for membership plan
          membershipPlanStartDate: new Date(response.data.planStartDate), // New field for membership start date
          membershipPlanEndDate: new Date(response.data.planEndDate) // New field for membership end date
        });

      console.log('Profile data response:', response.data);
      const registrations = response.data.registrations;
        const sessionDetailsPromises = registrations.map(registration =>
          axios.get(`${API_BASE_URL}/sessions/${registration.sessionId}`)
        );

        const sessionDetailsResponses = await Promise.all(sessionDetailsPromises);
        const sessions = sessionDetailsResponses.map(res => res.data);
        setAttendedSessions(sessions);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Handle error (e.g., show a notification or redirect to login)
      }
    };

    const fetchUpcomingClasses = async () => {
      try {
        const token = localStorage.getItem('memberToken'); // Get the token from local storage
        const response = await axios.get(`${API_BASE_URL}/sessions/`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        });
        setUpcomingClasses(response.data); // Set the upcoming classes data
      } catch (error) {
        console.error('Error fetching upcoming classes:', error);
        // Handle error (e.g., show a notification)
      }
    };

    const fetchEquipmentData = async () => {
      try {
        const token = localStorage.getItem('memberToken');
        const response = await axios.get(`${API_BASE_URL}/equipment/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEquipmentList(response.data); // Set the fetched equipment data
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };

    fetchProfileData(); // Call the function to fetch profile data
    fetchUpcomingClasses(); // Call the function to fetch upcoming classes
    fetchEquipmentData();
  }, []);

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedSession(null);
  };
  
  const handleShowMore = () => {
    setVisibleSessions((prev) => prev + 3); // Show three more sessions
  };

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now < start) return 0; // No progress if the membership hasn't started
    if (now > end) return 100; // Full progress if the membership has ended

    const totalDuration = end - start; // Total duration in milliseconds
    const elapsedDuration = now - start; // Elapsed duration in milliseconds
    const progress = (elapsedDuration / totalDuration) * 100; // Calculate progress percentage

    return Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0 and 100
  };

  // Function to calculate remaining days
  const calculateRemainingDays = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const remainingTime = end - now; // Remaining time in milliseconds

    return Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert to days
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEquipment || !duration) {
      toast.error('Please fill in all fields');
      return;
    }
    if (duration <= 0) {
      toast.error('Duration must be greater than 0');
      return;
    }

    const newUsage = {
      id: Date.now(),
      equipment: selectedEquipment,
      duration: parseInt(duration),
      timestamp: new Date().toLocaleString()
    };

    setUsageHistory([newUsage, ...usageHistory]);
    setSelectedEquipment('');
    setDuration('');
    toast.success('Equipment usage recorded!');
  };

  const handleDelete = (id) => {
    setUsageHistory(usageHistory.filter(usage => usage.id !== id));
    toast.success('Record deleted successfully');
  };

  const handleProfileEdit = () => {
    if (isEditing) {
      // Save changes
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeSection>
          <h1>Welcome back, {memberName}!</h1>
          <p>Track your fitness journey</p>
        </WelcomeSection>
        <trailbutton>
        <LogoutButton onClick={() => navigate('/member/login')}>
          Logout
        </LogoutButton>
        <ProfileButton onClick={() => setShowProfile(true)}>
          View Profile
        </ProfileButton>
        </trailbutton>
      </Header>

      <DashboardGrid>
        <MembershipCard>
          <h2>Membership Status</h2>
          <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '25px' }}>{profileData.membershipPlanName}</p>
          <p>Valid until: {profileData.membershipPlanEndDate ? new Date(profileData.membershipPlanEndDate).toLocaleDateString() : 'Not Applicable'}</p>
          <ProgressBar progress={calculateProgress(profileData.membershipPlanStartDate, profileData.membershipPlanEndDate)}>
            <div />
          </ProgressBar>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>{calculateRemainingDays(profileData.membershipPlanEndDate)} days remaining</p>
        </MembershipCard>

        <Button onClick={() => navigate('/member/buyplan')} style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        Buy Plan
        </Button>

        <Card>
          <h2>Record Equipment Usage</h2>
          <EquipmentForm onSubmit={handleSubmit}>
            <FormGroup>
              <label>Select Equipment</label>
              <Select 
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
                required
              >
                <option value="">Choose equipment</option>
                {equipmentList.map((equipment) => (
                  <option key={equipment.id} value={equipment.name}>
                    {equipment.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div className="form-row">
              <FormGroup>
                <label>Duration (minutes)</label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  required
                />
              </FormGroup>
              <Button type="submit">Record</Button>
            </div>
          </EquipmentForm>
        </Card>

        <Card>
          <h2>Recent Equipment Usage</h2>
          <UsageList>
            {usageHistory.map((usage) => (
              <UsageCard key={usage.id}>
                <div className="usage-info">
                  <h3>{usage.equipment}</h3>
                  <p>{usage.duration} minutes • {usage.timestamp}</p>
                </div>
                <DeleteButton onClick={() => handleDelete(usage.id)}>
                  Delete
                </DeleteButton>
              </UsageCard>
            ))}
            {usageHistory.length === 0 && (
              <p>No equipment usage recorded yet.</p>
            )}
          </UsageList>
        </Card>

        {/* Upcoming Classes Section */}
        <Card>
        <h2>Upcoming Sessions</h2>
        <UpcomingClassList>
          {upcomingClasses.slice(0, visibleSessions).map((classItem) => (
            <ClassItem key={classItem.id} onClick={() => handleSessionClick(classItem)}>
              <div className="class-info">
                <h3 style={{ cursor: 'pointer' }}>{classItem.sessionName}</h3>
                <p>{new Date(classItem.schedule).toLocaleString()}</p>
              </div>
            </ClassItem>
          ))}
        </UpcomingClassList>
        {visibleSessions < upcomingClasses.length && (
          <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
        )}
      </Card>

      {showModal && selectedSession && (
        <StyledModal>
          <StyledModalContent>
            <CloseModalButton onClick={closeModal}>×</CloseModalButton>
            <ModalTitle>{selectedSession.sessionName}</ModalTitle>
            <ModalText><strong>Schedule:</strong> {new Date(selectedSession.schedule).toLocaleString()}</ModalText>
            <ModalText><strong>Trainer:</strong> {selectedSession.trainer.name}</ModalText>
            <ModalText><strong>Capacity:</strong> {selectedSession.capacity}</ModalText>
            <ModalText><strong>Description:</strong> {selectedSession.description}</ModalText>
            {/* Only show Join button for upcoming sessions */}
            { !attendedSessions.some(attended => attended.id === selectedSession.id) && (
              <JoinButton>Join</JoinButton>
            )}
          </StyledModalContent>
        </StyledModal>
      )}
        
        <Card>
        <h2>Attended Sessions</h2>
        <UpcomingClassList>
          {attendedSessions.map(session => (
            <ClassItem key={session.id} onClick={() => handleSessionClick(session)}>
              <div className="class-info">
                <h3 style={{ cursor: 'pointer' }}>{session.sessionName}</h3>
                <p>{new Date(session.schedule).toLocaleString()}</p>
              </div>
              <StatusTag>Completed</StatusTag>
            </ClassItem>
          ))}
        </UpcomingClassList>
      </Card>

      {showModal && selectedSession && (
        <StyledModal>
          <StyledModalContent>
            <CloseModalButton onClick={closeModal}>×</CloseModalButton>
            <ModalTitle>{selectedSession.sessionName}</ModalTitle>
            <ModalText><strong>Schedule:</strong> {new Date(selectedSession.schedule).toLocaleString()}</ModalText>
            <ModalText><strong>Trainer:</strong> {selectedSession.trainer.name}</ModalText>
            <ModalText><strong>Capacity:</strong> {selectedSession.capacity}</ModalText>
            <ModalText><strong>Description:</strong> {selectedSession.description}</ModalText>
            {/* Only show Join button for upcoming sessions */}
            { !attendedSessions.some(attended => attended.id === selectedSession.id) && (
              <JoinButton>Join</JoinButton>
            )}
          </StyledModalContent>
        </StyledModal>
      )}
      </DashboardGrid>

      {showProfile && (
        <Modal onClick={() => setShowProfile(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => {
              setShowProfile(false);
              setIsEditing(false);
            }}>×</CloseButton>
            
            <h2 style={{ marginBottom: '30px' }}>Member Profile</h2>
            
            <ProfileSection>
              <h3>Personal Information</h3>
              <ProfileField isEditing={isEditing}>
                <label>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </ProfileField>
              
              <ProfileField isEditing={isEditing}>
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </ProfileField>
              
              <ProfileField isEditing={isEditing}>
                <label>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </ProfileField>

              <ProfileField isEditing={isEditing}>
                <label>Age</label>
                <input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </ProfileField>
            </ProfileSection>
            
            <ProfileSection>
              <h3>Additional Information</h3>
              <ProfileField isEditing={isEditing}>
                <label>Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </ProfileField>
              
              <ProfileField isEditing={isEditing}>
                <label>Emergency Contact</label>
                <input
                  type="text"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
              </ProfileField>
            </ProfileSection>
            
            <ProfileSection>
              <h3>Health & Fitness</h3>
              <ProfileField isEditing={isEditing}>
                <label>Health Conditions</label>
                <textarea
                  value={profileData.healthConditions}
                  onChange={(e) => handleInputChange('healthConditions', e.target.value)}
                  rows="3"
                />
              </ProfileField>
              
              <ProfileField isEditing={isEditing}>
                <label>Fitness Goals</label>
                <textarea
                  value={profileData.fitnessGoals}
                  onChange={(e) => handleInputChange('fitnessGoals', e.target.value)}
                  rows="3"
                />
              </ProfileField>
            </ProfileSection>
            
            {isEditing ? (
              <SaveButton onClick={handleProfileEdit}>
                Save Changes
              </SaveButton>
            ) : (
              <EditButton onClick={handleProfileEdit}>
                Edit Profile
              </EditButton>
            )}
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default MemberDashboard; 