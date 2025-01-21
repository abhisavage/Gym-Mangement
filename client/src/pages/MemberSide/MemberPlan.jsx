import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #1A1B4B;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 40px;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  width: 100%;
`;

const PlanCard = styled.div`
  background: #e0f7fa; /* Light blue background */
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanTitle = styled.h2`
  color: #1A1B4B;
  margin-bottom: 15px;
`;

const PlanPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  color: #666;
`;

const FeatureItem = styled.li`
  margin: 10px 0;
`;

const BuyButton = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2A2B5B;
  }
`;

const BackButton = styled(BuyButton)`
  background: #ff4757; /* Red background for back button */
  margin-top: 20px;

  &:hover {
    background: #ff6b81; /* Lighter red on hover */
  }
`;

const BuyPlan = () => {
  const navigate = useNavigate();

  const handleBuyPlan = (plan) => {
    // Handle the logic for buying the selected plan
    console.log(`Buying ${plan}`);
    // Redirect or show confirmation
  };

  return (
    <Container>
      <Title>Choose Your Plan</Title>
      <Subtitle>Select the plan that works for you</Subtitle>
      <PlanGrid>
        <PlanCard>
          <PlanTitle>1 Month Plan</PlanTitle>
          <PlanPrice>$20</PlanPrice>
          <PlanFeatures>
            <FeatureItem>✓ Unlimited access</FeatureItem>
            <FeatureItem>✓ 24/7 Support</FeatureItem>
            <FeatureItem>✓ Cancel anytime</FeatureItem>
          </PlanFeatures>
          <BuyButton onClick={() => handleBuyPlan('1 Month Plan')}>Get Started</BuyButton>
        </PlanCard>
        <PlanCard>
          <PlanTitle>3 Month Plan</PlanTitle>
          <PlanPrice>$50</PlanPrice>
          <PlanFeatures>
            <FeatureItem>✓ Unlimited access</FeatureItem>
            <FeatureItem>✓ 24/7 Support</FeatureItem>
            <FeatureItem>✓ Cancel anytime</FeatureItem>
          </PlanFeatures>
          <BuyButton onClick={() => handleBuyPlan('3 Month Plan')}>Get Started</BuyButton>
        </PlanCard>
        <PlanCard>
          <PlanTitle>Yearly Plan</PlanTitle>
          <PlanPrice>$180</PlanPrice>
          <PlanFeatures>
            <FeatureItem>✓ Unlimited access</FeatureItem>
            <FeatureItem>✓ 24/7 Support</FeatureItem>
            <FeatureItem>✓ Cancel anytime</FeatureItem>
          </PlanFeatures>
          <BuyButton onClick={() => handleBuyPlan('Yearly Plan')}>Get Started</BuyButton>
        </PlanCard>
      </PlanGrid>
      <BackButton onClick={() => navigate('/member/dashboard')}>Back to Dashboard</BackButton>
    </Container>
  );
};

export default BuyPlan;