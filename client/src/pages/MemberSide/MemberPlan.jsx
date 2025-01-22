import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config';

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
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
`;

const PlanCard = styled.div`
  background: #e0f7fa; /* Light blue background */
  width: 300px;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  const [membershipPlans, setMembershipPlans] = useState([]); // State for membership plans

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/memberships/plans`);
        setMembershipPlans(response.data.plans); // Set the fetched membership plans
      } catch (error) {
        console.error('Error fetching membership plans:', error);
      }
    };

    fetchMembershipPlans(); // Call the function to fetch membership plans
  }, []);

  const handleBuyPlan = async (planId) => {
    try {
      const token = localStorage.getItem('memberToken'); // Get the member token from local storage
      const response = await axios.post(`${API_BASE_URL}/memberships/purchase/${planId}`, {
        paymentMode: 'Credit Card' // Example payment mode; adjust as needed
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      // Handle successful response
      console.log('Plan purchased successfully:', response.data);
      // Optionally redirect or show a success message
      navigate('/member/dashboard'); // Redirect to the dashboard after purchase
    } catch (error) {
      console.error('Error purchasing membership plan:', error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <Container>
      <Title>Choose Your Plan</Title>
      <Subtitle>Select the plan that works for you</Subtitle>
      <PlanGrid>
        {membershipPlans.map((plan) => (
          <PlanCard key={plan.id}>
            <div>
            <PlanTitle>{plan.planName}</PlanTitle>
            <PlanPrice>₹{plan.cost}</PlanPrice> 
            </div>
            <PlanFeatures>
              {plan.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </PlanFeatures>
            
              <BuyButton onClick={() => handleBuyPlan(plan.id)}>Get Started</BuyButton>
            
          </PlanCard>
        ))}
      </PlanGrid>
      <BackButton onClick={() => navigate('/member/dashboard')}>Back to Dashboard</BackButton>
    </Container>
  );
};

export default BuyPlan;