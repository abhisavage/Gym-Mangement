from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
import google.generativeai as genai
import os
from http import HTTPStatus

# Create a blueprint
recommendation_app = Blueprint('recommendation', __name__)

# Load the model and label encoder
loaded_model = joblib.load('models/model.pkl')
loaded_le = joblib.load('models/label_encoder.pkl')

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

@recommendation_app.route('/recommend_exercise', methods=['POST'])
def recommend_exercise():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), HTTPStatus.BAD_REQUEST
        
        # Prepare the data for prediction
        new_observation = pd.DataFrame(
            [[data['Gender'], data['Age'], data['Actual Weight'], 
              data['Dream Weight'], data['BMI']]], 
            columns=['Gender', 'Age', 'Actual Weight', 'Dream Weight', 'BMI']
        )
        
        # Make prediction
        exercise_encoded, intensity, duration = loaded_model.predict(new_observation)[0]
        exercise = loaded_le.inverse_transform([int(exercise_encoded)])[0]
        
        return jsonify({
            'Predicted Exercise': exercise,
            'Intensity': intensity,
            'Duration': duration
        }), HTTPStatus.OK
        
    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@recommendation_app.route('/recommend_diet', methods=['POST'])
def recommend_diet():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), HTTPStatus.BAD_REQUEST

    
        prompt = f"""
        Based on these preferences and goals:
        Diet Preferences: {', '.join(data.get('diet_preferences', []))}
        Health Conditions: {', '.join(data.get('health_conditions', []))}
        Nutritional Goals: {', '.join(data.get('nutritional_goals', []))}
        Favorite Foods: {', '.join(data.get('favorite_foods', []))}
        
        Provide exactly:
        1. Three meal names without any special characters or formatting.
        2. Two to three supplement names without any special characters or formatting.
        
        Format as:
        meals:
        - meal1
        - meal2
        - meal3
        
        supplements:
        - supplement1
        - supplement2
        """
        # Get response from Gemini
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Parse response into sections
        sections = response_text.lower().split('supplements:')
        
        # Extract meals
        meals_section = sections[0].replace('meals:', '').strip()
        meals = [meal.strip('- ').strip() for meal in meals_section.split('\n') if meal.strip('- ').strip()]
        
        # Extract supplements
        supplements_section = sections[1].strip() if len(sections) > 1 else ''
        supplements = [supp.strip('- ').strip() for supp in supplements_section.split('\n') if supp.strip('- ').strip()]
        
        # Create final response
        structured_response = {
            'meals': meals[:3],  # Limit to 3 meals
            'supplements': supplements[:3]  # Limit to 3 supplements
        }

        return jsonify(structured_response), HTTPStatus.OK

    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@recommendation_app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Service is running'
    }), HTTPStatus.OK

# Error handlers
@recommendation_app.errorhandler(HTTPStatus.NOT_FOUND)
def not_found_error(error):
    return jsonify({
        'error': 'Resource not found'
    }), HTTPStatus.NOT_FOUND

@recommendation_app.errorhandler(HTTPStatus.INTERNAL_SERVER_ERROR)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error'
    }), HTTPStatus.INTERNAL_SERVER_ERROR
