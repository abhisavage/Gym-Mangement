import React, { useState } from 'react';
import styled from 'styled-components';
import { AI_RECOMMENDER_URL } from '../../config';

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
    Gender: '',
    Age: '',
    ActualWeight: '',
    DreamWeight: '',
    BMI: ''
  });

  const [dietData, setDietData] = useState({
    preferences: [],
    healthConditions: [],
    nutritionalGoals: [],
    favoriteFoods: [],
  });

  const [exerciseRecommendation, setExerciseRecommendation] = useState({
    exercise: '',
    duration: ''
  });

  const [dietRecommendation, setDietRecommendation] = useState({
    meals: [],
    supplements: []
  });

  const handleExerciseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/recommend_exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Gender: exerciseData.Gender,
          Age: exerciseData.Age,
          'Actual Weight': exerciseData.ActualWeight,
          'Dream Weight': exerciseData.DreamWeight,
          BMI: exerciseData.BMI,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setExerciseRecommendation({
        exercise: `${data['Predicted Exercise']}`,
        duration: `${Math.round(data['Duration'])} min`
      });
    } catch (error) {
      console.error('Error fetching exercise recommendation:', error);
      setExerciseRecommendation({
        exercise: 'Error fetching recommendation. Please try again later.',
        duration: ''
      });
    }
  };

  const handleDietSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/recommend_diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diet_preferences: dietData.preferences,
          health_conditions: dietData.healthConditions,
          nutritional_goals: dietData.nutritionalGoals,
          favorite_foods: dietData.favoriteFoods,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDietRecommendation({
        meals: data.meals,
        supplements: data.supplements
      });
    } catch (error) {
      console.error('Error fetching diet recommendation:', error);
      setDietRecommendation({
        meals: [],
        supplements: []
      });
    }
  };

  return (
    <AIAssistantContainer>
      <Card>
        <LeftSide>
          <h2>Exercise Recommendation</h2>
          <form onSubmit={handleExerciseSubmit}>
            <Select
              value={exerciseData.Gender}
              onChange={(e) => setExerciseData({ ...exerciseData, Gender: e.target.value })}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <Input
              type="number"
              placeholder="Age"
              value={exerciseData.Age}
              onChange={(e) => setExerciseData({ ...exerciseData, Age: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Actual Weight (kg)"
              value={exerciseData.ActualWeight}
              onChange={(e) => setExerciseData({ ...exerciseData, ActualWeight: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Dream Weight (kg)"
              value={exerciseData.DreamWeight}
              onChange={(e) => setExerciseData({ ...exerciseData, DreamWeight: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="BMI"
              value={exerciseData.BMI}
              onChange={(e) => setExerciseData({ ...exerciseData, BMI: e.target.value })}
              required
            />
            <Button type="submit">Get Recommendation</Button>
          </form>
        </LeftSide>
        <RightSide>
          <h2>AI Recommendation</h2>
          <div style={{margin: '10px' }}>
            <h3>Exercise</h3>
            <div>{exerciseRecommendation.exercise}</div>
            {/* Display message if no exercise is recommended */}
            {exerciseRecommendation.exercise === '' && (
              <div style={{ color: 'black', margin: '10px' }}>No exercise recommended.</div>
            )}
          </div>
          <div style={{margin: '10px' }}>
            <h3>Average Duration</h3>
            <div>{exerciseRecommendation.duration}</div>
          </div>
        </RightSide>
      </Card>

      <Card>
        <LeftSide>
          <h2>Diet Recommendation</h2>
          <form onSubmit={handleDietSubmit}>
            <Input
              type="text"
              placeholder="Diet Preferences (comma separated)"
              value={dietData.preferences.join(', ')}
              onChange={(e) => setDietData({ ...dietData, preferences: e.target.value.split(',').map(item => item.trim()) })}
              required
            />
            <Input
              type="text"
              placeholder="Health Conditions (comma separated)"
              value={dietData.healthConditions.join(', ')}
              onChange={(e) => setDietData({ ...dietData, healthConditions: e.target.value.split(',').map(item => item.trim()) })}
              required
            />
            <Input
              type="text"
              placeholder="Nutritional Goals (comma separated)"
              value={dietData.nutritionalGoals.join(', ')}
              onChange={(e) => setDietData({ ...dietData, nutritionalGoals: e.target.value.split(',').map(item => item.trim()) })}
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
                    <div>
                        <h3>Meals</h3>
                        <ul style={{ padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                            {dietRecommendation.meals.length > 0 ? (
                                dietRecommendation.meals.map((meal, index) => (
                                    <li key={index} style={{ marginBottom: '5px' }}>{meal}</li>
                                ))
                            ) : (
                                <li>No meals recommended.</li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3>Supplements</h3>
                        <ul style={{ padding: '10px', borderRadius: '5px' }}>
                            {dietRecommendation.supplements.length > 0 ? (
                                dietRecommendation.supplements.map((supplement, index) => (
                                    <li key={index} style={{ marginBottom: '5px' }}>{supplement}</li>
                                ))
                            ) : (
                                <li>No supplements recommended.</li>
                            )}
                        </ul>
                    </div>
        </RightSide>
      </Card>
    </AIAssistantContainer>
  );
};

export default AIAssistant; 