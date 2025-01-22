import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import API_BASE_URL from '../../config';

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
  position: relative;
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

const LoginButton = styled.button`
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
    transform: translateY(-2px);
  }
`;

const BackToHome = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterLink = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  text-decoration: underline;
  cursor: pointer;
  margin: 20px 0;
  width: 100%;
  
  &:hover {
    color: #2A2B5B;
  }
`;

const RegisterForm = styled(Form)`
  display: ${props => props.isRegistering ? 'flex' : 'none'};
`;

const LoginForm = styled(Form)`
  display: ${props => props.isRegistering ? 'none' : 'flex'};
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

const OtherSpecialityInput = styled(Input)`
  margin-top: 10px;
  display: ${props => props.show ? 'block' : 'none'};
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


const TrainerLogin = () => {
  const navigate = useNavigate();
  // const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

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
      // Reset other speciality if not "Others"
      otherSpeciality: value !== 'Others' ? '' : registerData.otherSpeciality
    });
  };

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
      // Call the API to log in
      const response = await fetch(`${API_BASE_URL}/trainers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      // Debugging: Log the response data
      console.log('Response Data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Check if token exists in the response
      if (data.token) {
        // Store trainer data and token in localStorage
        localStorage.setItem('trainerData', JSON.stringify(data.trainer));
        localStorage.setItem('trainerToken', data.token); // Store the token as well

        toast.success('Login successful!');
        navigate('/trainer/dashboard');
        
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (registerData.password !== registerData.confirmPassword) {
  //     toast.error('Passwords do not match!');
  //     return;
  //   }

  //   // Validate speciality
  //   if (registerData.speciality === 'Others' && !registerData.otherSpeciality) {
  //     toast.error('Please specify your speciality');
  //     return;
  //   }

  //   // Get the final speciality value
  //   const finalSpeciality = registerData.speciality === 'Others' 
  //     ? registerData.otherSpeciality 
  //     : registerData.speciality;

  //   // Create the data to send
  //   const dataToSubmit = {
  //     ...registerData,
  //     speciality: finalSpeciality
  //   };
  //   delete dataToSubmit.otherSpeciality;

  //   toast.info('Trainer registration functionality will be implemented soon');
  //   console.log('Registration data:', dataToSubmit);
  // };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Trainer Login</Title>
        
        <LoginForm onSubmit={handleLogin}>
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
          
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>

        {/* <RegisterForm isRegistering={isRegistering} onSubmit={handleRegister}>
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
            <Label>Email</Label>
            <Input
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Create Password</Label>
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

          <InputGroup>
            <Label>Age</Label>
            <Input
              type="number"
              value={registerData.age}
              onChange={(e) => setRegisterData({...registerData, age: e.target.value})}
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

          <LoginButton type="submit">Register</LoginButton>
        </RegisterForm> */}

        <Register>
          <RegButton onClick={() => navigate('/trainer/register')}>New member? Register</RegButton>
        </Register>
        <BackButton onClick={() => navigate('/role-selection')}>
          ← Back to Role Selection
        </BackButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default TrainerLogin; 