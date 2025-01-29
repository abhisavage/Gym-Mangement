from flask import Flask
from flask_cors import CORS
from routes.recommendation_routes import recommendation_app  # Import the blueprint

app = Flask(__name__)
CORS(app)
# Register the recommendation routes
app.register_blueprint(recommendation_app)

# Other route registrations and configurations...

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
