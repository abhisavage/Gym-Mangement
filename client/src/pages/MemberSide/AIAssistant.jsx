import React, { useState } from 'react';
import styled from 'styled-components';

const AIAssistantContainer = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  padding: 30px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const RightSide = styled.div`
  flex: 1;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #1A1B4B;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #1A1B4B;
  }
`;

const Button = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2A2B5B;
  }
`;

const RecommendationText = styled.div`
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  min-height: 100px;
`;

const AIAssistant = () => {
  const [exerciseData, setExerciseData] = useState({
    age: '',
    currentWeight: '',
    dreamWeight: '',
    bmi: '',
    gender: '',
  });

  const [dietData, setDietData] = useState({
    preferences: '',
    healthConditions: '',
    nutritionalGoals: '',
    favoriteFoods: '',
  });

  const [exerciseRecommendation, setExerciseRecommendation] = useState('');
  const [dietRecommendation, setDietRecommendation] = useState('');

  const handleExerciseSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call your AI API to get recommendations
    setExerciseRecommendation(`Recommended Exercise: Jogging for 30 minutes.`);
  };

  const handleDietSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call your AI API to get recommendations
    setDietRecommendation(`Recommended Diet: High-protein meals with vegetables.`);
  };

  return (
    <AIAssistantContainer>
      <Card>
        <LeftSide>
          <h2>Exercise Recommendation</h2>
          <form onSubmit={handleExerciseSubmit}>
            <Select
              value={exerciseData.gender}
              onChange={(e) => setExerciseData({ ...exerciseData, gender: e.target.value })}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <Input
              type="number"
              placeholder="Age"
              value={exerciseData.age}
              onChange={(e) => setExerciseData({ ...exerciseData, age: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Current Weight (kg)"
              value={exerciseData.currentWeight}
              onChange={(e) => setExerciseData({ ...exerciseData, currentWeight: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Dream Weight (kg)"
              value={exerciseData.dreamWeight}
              onChange={(e) => setExerciseData({ ...exerciseData, dreamWeight: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="BMI"
              value={exerciseData.bmi}
              onChange={(e) => setExerciseData({ ...exerciseData, bmi: e.target.value })}
              required
            />
            <Button type="submit">Get Recommendation</Button>
          </form>
        </LeftSide>
        <RightSide>
          <h2>AI Recommendation</h2>
          <RecommendationText>{exerciseRecommendation}</RecommendationText>
        </RightSide>
      </Card>

      <Card>
        <LeftSide>
          <h2>Diet Recommendation</h2>
          <form onSubmit={handleDietSubmit}>
            <Input
              type="text"
              placeholder="Diet Preferences"
              value={dietData.preferences}
              onChange={(e) => setDietData({ ...dietData, preferences: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Health Conditions"
              value={dietData.healthConditions}
              onChange={(e) => setDietData({ ...dietData, healthConditions: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Nutritional Goals"
              value={dietData.nutritionalGoals}
              onChange={(e) => setDietData({ ...dietData, nutritionalGoals: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Favorite Foods"
              value={dietData.favoriteFoods}
              onChange={(e) => setDietData({ ...dietData, favoriteFoods: e.target.value })}
              required
            />
            <Button type="submit">Get Recommendation</Button>
          </form>
        </LeftSide>
        <RightSide>
          <h2>AI Recommendation</h2>
          <RecommendationText>{dietRecommendation}</RecommendationText>
        </RightSide>
      </Card>
    </AIAssistantContainer>
  );
};

export default AIAssistant; 