import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  color: #1a1b4b;
  font-size: 2rem;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #1a1b4b;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
`;

const LoginButton = styled.button`
  background-color: #1a1b4b;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2a2b6b;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ForgotPassword = styled.a`
  color: #1a1b4b;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
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

const IconButton = styled.button`
  position: absolute;
  right: 10px; // Position the icon inside the input
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #1A1B4B;
  margin-top: 17.5px;
  margin-right: 7px;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px; // Add padding to the right for the icon
  position: relative;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login validation logic here
    
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Sign-in</Title>
        
        <InputGroup>
          <Label htmlFor="email">Email*</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password*</Label>
          <PasswordInput
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <IconButton onClick={() => setShowPassword(!showPassword)} type="button">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconButton>
        </InputGroup>

        <BottomRow>
          <RememberMe>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </RememberMe>
          <ForgotPassword href="/forgot-password">Forgot Password?</ForgotPassword>
        </BottomRow>

        <LoginButton type="submit">Login</LoginButton>
        <BackButton onClick={() => navigate('/role-selection')}>
        ← Back to Role Selection
        </BackButton>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;