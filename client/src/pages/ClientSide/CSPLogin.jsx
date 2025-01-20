import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #1A1B4B;
  font-weight: 500;
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

const LoginButton = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2A2B6B;
  }
`;

const BackToHome = styled.button`
  background: none;
  border: none;
  color: #1A1B4B;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    color: #2A2B6B;
  }
`;

const CSPLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to verify credentials
      // For now, we'll just simulate a successful login
      
      // Store member token/info in localStorage
      localStorage.setItem('memberToken', 'dummy-token');
      localStorage.setItem('memberInfo', JSON.stringify({
        name: 'John Doe',
        email: formData.email
      }));
      
      toast.success('Login successful!');
      navigate('/member/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Member Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </InputGroup>
          
          <LoginButton type="submit">Login</LoginButton>
        </Form>
        
        <BackToHome onClick={() => navigate('/')}>
          Back to Home
        </BackToHome>
      </LoginCard>
    </LoginContainer>
  );
};

export default CSPLogin; 