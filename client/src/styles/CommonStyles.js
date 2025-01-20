import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Common Styled Components
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F5F5F5;
  animation: ${fadeIn} 0.3s ease-in;
`;

export const MainContent = styled.div`
  margin-left: 280px;
  padding: 30px;
  flex-grow: 1;
  animation: ${slideIn} 0.4s ease-out;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  animation: ${slideIn} 0.4s ease-out;
`;

export const Logo = styled.img`
  height: 45px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const FeedbackButton = styled.button`
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
    transform: translateY(-1px);
  }
`;

export const NotificationIcon = styled.button`
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

export const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  animation: ${slideIn} 0.4s ease-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled.button`
  padding: 10px 25px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

export const LoadingSpinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingButton = styled(Button)`
  position: relative;
  
  &:before {
    content: '';
    display: ${props => props.loading ? 'block' : 'none'};
    width: 16px;
    height: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid #ffffff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${LoadingSpinner} 0.6s linear infinite;
  }
`; 