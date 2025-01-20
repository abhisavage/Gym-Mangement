import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../../config';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

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

const MemberRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const handleRegister = async (e) => {
    
      e.preventDefault();
  
      // Validation
      if (!registerData.name || !registerData.age || !registerData.email || !registerData.password || !registerData.confirmPassword) {
        toast.error('Please fill in all fields');
        return;
      }
  
      if (registerData.password !== registerData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
  
      if (parseInt(registerData.age) < 16) {
        toast.error('You must be at least 16 years old to register');
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
  
      try {
        // Make API call to register the member
        const registrationData = {
          ...registerData,
          age: parseInt(registerData.age) // Convert age to an integer
        };
  
        const response = await axios.post(`${API_BASE_URL}/members/register`, registrationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        await 
        
  
        toast.success('Registration successful! Redirecting to Login...');
        navigate('/member/login');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
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
              <Label>Age</Label>
              <Input
                type="number"
                value={registerData.age}
                onChange={(e) => setRegisterData({...registerData, age: e.target.value})}
                min="16"
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
            <Label>Password</Label>
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
              type={showPassword ? "text" : "password"}
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
            />
            <IconButton onClick={() => setShowPassword(!showPassword)} type="button">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </InputGroup>
          <Button type="submit">Register</Button>
        </Form>
        
        <LoginButton onClick={() => navigate('/member/login')}>Already have an account? Login</LoginButton>
        <BackButton onClick={() => navigate('/role-selection')}>
          ← Back to Role Selection
        </BackButton>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default MemberRegister;