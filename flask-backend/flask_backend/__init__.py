from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from .utils.auth import bcrypt
from dotenv import load_dotenv
import os

def create_app():
    app = Flask(__name__)
    
    load_dotenv()

    # Configure Flask app
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    # Configure MongoDB
    app.config['MONGO_URI'] = os.getenv('MONGO_URI')  # Example: "mongodb://localhost:27017/mydatabase"
    mongo = PyMongo(app)  # Initialize PyMongo (creates the connection)

    # Enable CORS
    CORS(app)
    
    # Initialize Flask extensions
    JWTManager(app)
    socketio = SocketIO(app, cors_allowed_origins="*")
    bcrypt.init_app(app)
    
    # Log database connection (optional, for debugging)
    with app.app_context():
        print(f"Connected to MongoDB at {app.config['MONGO_URI']}")

    # Register blueprints (routes)
    from .routes.routes import register_routes
    register_routes(app, mongo)  # Pass the `mongo` instance here
    
    return app, socketio
