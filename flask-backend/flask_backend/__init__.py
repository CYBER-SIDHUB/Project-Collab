from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO

def create_app():
    app = Flask(__name__)
    
    # Configure app
    app.config['SECRET_KEY'] = 'your-secret-key'
    app.config['JWT_SECRET_KEY'] = 'your-jwt-secret-key'
    
    # Enable CORS
    CORS(app)
    
    # Initialize extensions
    JWTManager(app)
    socketio = SocketIO(app, cors_allowed_origins="*")
    
    # Register blueprints (routes)
    from .routes.routes import register_routes
    register_routes(app)
    
    return app, socketio
