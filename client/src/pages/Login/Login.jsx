import styled from 'styled-components';
import Logo from '../../components/Logo/Logo';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Login = () => {
  return (
    <LoginPage>
      <LoginForm />
      <Logo />
    </LoginPage>
  );
};

export default Login;