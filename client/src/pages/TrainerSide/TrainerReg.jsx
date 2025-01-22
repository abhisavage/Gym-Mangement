import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #1A1B4B;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative; // Position relative for absolute positioning of the icon
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #1A1B4B;
  font-size: 14px;
  font-weight: 600;
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
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
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
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

const OtherSpecialityInput = styled(Input)`
  margin-top: 10px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Button = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2A2B5B;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  text-align: center;
  width: fit-content;
  
  &:hover {
    color: #2A2B5B;
  }
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  text-align: center;
  width: fit-content;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  text-align: center;
  width: fit-content;
  
  &:hover {
    text-decoration: underline;
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 10px; // Position the icon inside the input
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #1A1B4B;
  margin: 15px;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px; // Add padding to the right for the icon
`;

const TrainerRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    speciality: '',
    otherSpeciality: ''
  });

  const specialities = [
    'Weight Training',
    'Yoga',
    'CrossFit',
    'Cardio',
    'HIIT',
    'Pilates',
    'Functional Training',
    'Bodybuilding',
    'Zumba',
    'Martial Arts',
    'Others'
  ];

  const handleSpecialityChange = (e) => {
    const value = e.target.value;
    setRegisterData({
      ...registerData,
      speciality: value,
      otherSpeciality: value !== 'Others' ? '' : registerData.otherSpeciality
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword || !registerData.age || !registerData.speciality) {
      toast.error('Please fill in all fields');
      return;
    }

    // Password match validation
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Validate speciality
    if (registerData.speciality === 'Others' && !registerData.otherSpeciality) {
      toast.error('Please specify your speciality');
      return;
    }

    // Get the final speciality value
    const finalSpeciality = registerData.speciality === 'Others' 
      ? registerData.otherSpeciality 
      : registerData.speciality;

    // Create the data to send, excluding confirmPassword
    const dataToSubmit = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password, // Only send password
      age: parseInt(registerData.age),
      speciality: finalSpeciality
    };

    try {
      // Call the API to register the trainer
      const response = await fetch(`${API_BASE_URL}/trainers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      toast.success('Registration successful! Redirecting to Login...');
      navigate('/trainer/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Member Registration</Title>
        <Form onSubmit={handleRegister}>
          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Create Password</Label>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
            <IconButton onClick={() => setShowPassword(!showPassword)} type="button">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </InputGroup>

          <InputGroup>
            <Label>Confirm Password</Label>
            <PasswordInput
              type={showConfirmPassword ? "text" : "password"}
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
            />
            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </InputGroup>

          <InputGroup>
            <Label>Age</Label>
            <Input
              type="number"
              value={registerData.age}
              onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
              required
              min="18"
              max="100"
            />
          </InputGroup>

          <InputGroup>
            <Label>Speciality</Label>
            <Select
              value={registerData.speciality}
              onChange={handleSpecialityChange}
              required
            >
              <option value="">Select your speciality</option>
              {specialities.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </Select>

            <OtherSpecialityInput
              show={registerData.speciality === 'Others'}
              type="text"
              placeholder="Please specify your speciality"
              value={registerData.otherSpeciality}
              onChange={(e) => setRegisterData({
                ...registerData,
                otherSpeciality: e.target.value
              })}
              required={registerData.speciality === 'Others'}
            />
          </InputGroup>
          <Button type="submit">Register</Button>
        </Form>
        <LoginButton onClick={() => navigate('/trainer/login')}>Already have an account? Login</LoginButton>
        <BackButton onClick={() => navigate('/role-selection')}>
          ← Back to Role Selection
        </BackButton>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default TrainerRegister;