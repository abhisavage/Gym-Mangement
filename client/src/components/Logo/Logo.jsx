import styled from 'styled-components';

const LogoWrapper = styled.div`
  img {
    width: 300px;
    height: auto;
  }
`;

const Logo = () => (
  <LogoWrapper>
    <img src="/assets/stamina-logo.png" alt="Stamina Fitness Centre Logo" />
  </LogoWrapper>
);

export default Logo;