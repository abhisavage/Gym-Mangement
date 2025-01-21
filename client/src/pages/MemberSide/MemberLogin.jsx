import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../../config';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  padding: 20px;
`;

const LoginCard = styled.div`
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

const RegButton = styled.button`
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

const Register = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  text-align: center;
  width: fit-content;
  
  &:hover {
    color: #2A2B5B;
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


const MemberLogin = () => {
  const navigate = useNavigate();
  // const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      // Make API call to the backend
      const response = await axios.post(`${API_BASE_URL}/members/login`, loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Check if member is found
      if (response.data.message === 'Member not found') {
        toast.error('Member not found. Please check your credentials.');
        return;
      }

      // Handle successful login
      toast.success('Login successful!');
      const memberData = response.data; // Assuming the response contains member data
      localStorage.setItem('memberData', JSON.stringify(memberData)); // Store member data in localStorage
      localStorage.setItem('memberToken', response.data.token);
      
      // Redirect to member dashboard
      navigate('/member/dashboard');
    } catch (error) {
      // Handle error
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   // Validation
  //   if (!registerData.name || !registerData.age || !registerData.email || !registerData.password || !registerData.confirmPassword) {
  //     toast.error('Please fill in all fields');
  //     return;
  //   }

  //   if (registerData.password !== registerData.confirmPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }

  //   if (parseInt(registerData.age) < 16) {
  //     toast.error('You must be at least 16 years old to register');
  //     return;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(registerData.email)) {
  //     toast.error('Please enter a valid email address');
  //     return;
  //   }

  //   try {
  //     // Make API call to register the member
  //     const registrationData = {
  //       ...registerData,
  //       age: parseInt(registerData.age) // Convert age to an integer
  //     };

  //     const response = await axios.post(`${API_BASE_URL}/members/register`, registrationData, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

      
      

  //     toast.success('Registration successful! Redirecting to Login...');
  //     navigate('/member/login');
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
  //   }
  // };

  return (
    <LoginContainer>
      <LoginCard>
      <Title>Member Login</Title>
        {/* <Title>{isRegistering ? 'Member Registration' : 'Member Login'}</Title>
        
        {isRegistering ? (
          <Form onSubmit={handleRegister}>
            <InputGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
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
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                required
              />
            </InputGroup>

            <Button type="submit">Register</Button>
          </Form>
        ) : ( */}
          <Form onSubmit={handleLogin}>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <IconButton onClick={() => setShowPassword(!showPassword)} type="button">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputGroup>

            <Button type="submit">Login</Button>
          </Form>
        {/* )} */}

        {/* <ToggleButton onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : 'New member? Register'}
        </ToggleButton> */}
        <Register>
          <RegButton onClick={() => navigate('/member/register')}>New member? Register</RegButton>
        </Register>
        <BackButton onClick={() => navigate('/role-selection')}>
          ← Back to Role Selection
        </BackButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default MemberLogin;