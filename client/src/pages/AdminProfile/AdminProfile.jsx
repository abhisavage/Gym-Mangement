import { useState, useRef } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Sidebar from '../../components/Sidebar/Sidebar';
import {PageContainer} from '../../styles/CommonStyles';
import { useNavigate } from 'react-router-dom';

// const PageContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   background-color: #F5F5F5;
// `;

const MainContent = styled.div`
  margin-left: 280px;
  padding: 30px;
  flex-grow: 1;
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

const Title = styled.h1`
  color: #1A1B4B;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 600;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 30px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImage = styled.div`
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #F5F5F5;
    transition: all 0.3s;
    
    &:hover {
      border-color: #1A1B4B;
    }
  }
`;

const UpdateProfile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1.5px solid #1A1B4B;
  border-radius: 8px;
  color: #1A1B4B;
  cursor: pointer;
  margin-bottom: 25px;
  transition: all 0.2s;
  font-weight: 500;
  
  &:hover {
    background: rgba(26, 27, 75, 0.05);
    transform: translateY(-1px);
  }
`;

const ProfileInfo = styled.div`
  display: grid;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  font-size: 15px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(26, 27, 75, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  label {
    color: #666;
    font-weight: 500;
  }
  
  span {
    color: #1A1B4B;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #1A1B4B;
    font-size: 20px;
    margin-bottom: 25px;
    font-weight: 600;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #1A1B4B;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid transparent;
  border-radius: 8px;
  background: #F5F5F5;
  transition: all 0.2s;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: #1A1B4B;
    background: white;
  }
  
  &:hover {
    background: #EFEFEF;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SaveButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  border: none;
  
  &:hover {
    background: #2A2B5B;
    box-shadow: 0 4px 12px rgba(26, 27, 75, 0.2);
  }
`;

const CancelButton = styled(Button)`
  background: white;
  border: 1.5px solid #1A1B4B;
  color: #1A1B4B;
  
  &:hover {
    background: rgba(26, 27, 75, 0.05);
  }
`;

const RegisterButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  font-size: 15px;
  font-weight: 500;
  
  &:hover {
    background: #2A2B5B;
    box-shadow: 0 4px 12px rgba(26, 27, 75, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

// Validation Schemas
const profileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  contactNo: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits')
    .required('Contact number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password requires at least 1 number')
    .matches(/[A-Z]/, 'Password requires at least 1 uppercase letter')
    .required('New password is required'),
  retypePassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const initialProfileData = {
    username: 'JuanDelaCruz',
    contactNo: '09123456789',
    email: 'juan.delacruz@gmail.com'
  };

  const initialPasswordData = {
    currentPassword: '',
    newPassword: '',
    retypePassword: ''
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated:', values);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password updated:', values);
      toast.success('Password updated successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterAdmin = () => {
    navigate('/admin/register');
  };

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

        <Title>Admin Information</Title>

        <ContentGrid>
          <div>
            <ProfileCard>
              <ProfileImage>
                <img 
                  src={profileImage || "/assets/PersonCircle.png"} 
                  alt="Profile" 
                />
              </ProfileImage>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <UpdateProfile onClick={() => fileInputRef.current.click()}>
                <span>✏️</span> Update Profile Picture
              </UpdateProfile>
              {!isEditing && (
                <ProfileInfo>
                  <InfoItem>
                    <label>Username</label>
                    <span>{initialProfileData.username}</span>
                  </InfoItem>
                  <InfoItem>
                    <label>Contact no.</label>
                    <span>{initialProfileData.contactNo}</span>
                  </InfoItem>
                  <InfoItem>
                    <label>Email Address:</label>
                    <span>{initialProfileData.email}</span>
                  </InfoItem>
                </ProfileInfo>
              )}
            </ProfileCard>
            <RegisterButton onClick={handleRegisterAdmin}>
              Register New Admin Account
            </RegisterButton>
          </div>

          <FormSection>
            <Formik
              initialValues={initialProfileData}
              validationSchema={profileSchema}
              onSubmit={handleProfileSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <FormCard>
                    <InputGroup>
                      <Label>Username</Label>
                      <Input
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.username && errors.username && (
                        <ErrorMessage>{errors.username}</ErrorMessage>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <Label>Contact No.</Label>
                      <Input
                        name="contactNo"
                        value={values.contactNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.contactNo && errors.contactNo && (
                        <ErrorMessage>{errors.contactNo}</ErrorMessage>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <Label>Email Address</Label>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                      )}
                    </InputGroup>
                    <ButtonGroup>
                      <CancelButton type="button">Cancel</CancelButton>
                      <SaveButton type="submit" disabled={isSubmitting}>
                        Save
                      </SaveButton>
                    </ButtonGroup>
                  </FormCard>
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={initialPasswordData}
              validationSchema={passwordSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting, resetForm }) => (
                <Form>
                  <FormCard>
                    <Title>Password</Title>
                    <InputGroup>
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        name="currentPassword"
                        value={values.currentPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.currentPassword && errors.currentPassword && (
                        <ErrorMessage>{errors.currentPassword}</ErrorMessage>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.newPassword && errors.newPassword && (
                        <ErrorMessage>{errors.newPassword}</ErrorMessage>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <Label>Re-type Password</Label>
                      <Input
                        type="password"
                        name="retypePassword"
                        value={values.retypePassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.retypePassword && errors.retypePassword && (
                        <ErrorMessage>{errors.retypePassword}</ErrorMessage>
                      )}
                    </InputGroup>
                    <ButtonGroup>
                      <CancelButton type="button" onClick={() => resetForm()}>
                        Clear
                      </CancelButton>
                      <SaveButton type="submit" disabled={isSubmitting}>
                        Change
                      </SaveButton>
                    </ButtonGroup>
                  </FormCard>
                </Form>
              )}
            </Formik>
          </FormSection>
        </ContentGrid>
        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default AdminProfile; 