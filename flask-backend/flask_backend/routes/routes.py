from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from ..utils.auth import hash_password, check_password

def register_routes(app, mongo):
    api = Blueprint('api', __name__)

    @api.route('/ping', methods=['GET'])
    @jwt_required()
    def ping():
        return {"message": "pong"}, 200

    @api.route('/register', methods=['POST'])
    def register():
        # Parse request data
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        users_collection = mongo.db.users

        # Check if the user already exists
        if users_collection.find_one({"email": email}):
            return jsonify({"error": "Email already exists"}), 400

        # Hash the password
        hashed_password = hash_password(password)

        # Insert new user into MongoDB
        new_user = {
            "username": username,
            "email": email,
            "password": hashed_password
        }
        user_id = users_collection.insert_one(new_user).inserted_id

        return jsonify({"message": "User registered successfully", "user_id": str(user_id)}), 201

    @api.route('/login', methods=['POST'])
    def login():
        # Parse request data
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        users_collection = mongo.db.users

        # Find user by email
        user = users_collection.find_one({"email": email})

        if not user or not check_password(user['password'], password):
            return jsonify({"error": "Invalid credentials"}), 401

        # Create JWT token
        token = create_access_token(identity=email)

        return jsonify({"access_token": token}), 200

    @api.route('/users', methods=['GET'])
    @jwt_required()
    def get_users():
        users_collection = mongo.db.users

        # Retrieve all users, excluding their passwords
        users = list(users_collection.find({}, {"password": 0}))

        # Convert ObjectId to string for JSON serialization
        for user in users:
            user["_id"] = str(user["_id"])

        return jsonify(users), 200
    
    @api.route('/projects', methods=['POST'])
    @jwt_required()
    def create_project():
        """Create a new project."""
        user_email = get_jwt_identity()
        data = request.get_json()

        if not data.get("name"):
            return jsonify({"error": "Project name is required"}), 400
    
        project = {
            "name": data.get("name"),
            "description": data.get("description"),
            "owner": user_email,
            "created_at": datetime.now(),
            "tasks": []  # Placeholder for tasks or phases
        }
        result = mongo.db.projects.insert_one(project)
        return jsonify({"message": "Project created", "project_id": str(result.inserted_id)}), 201

    @api.route('/projects', methods=['GET'])
    @jwt_required()
    def get_projects():
        """Fetch all projects for the logged-in user."""
        user_email = get_jwt_identity()
        projects = mongo.db.projects.find({"owner": user_email})
        projects_list = [{"id": str(project["_id"]), "name": project["name"], "description": project["description"]} for project in projects]
        return jsonify(projects_list), 200

    @api.route('/projects/<string:project_id>', methods=['GET'])
    @jwt_required()
    def get_project_details(project_id):
        """Fetch details of a specific project."""
        user_email = get_jwt_identity()
        project = mongo.db.projects.find_one({"_id": ObjectId(project_id), "owner": user_email})
        if not project:
            return jsonify({"error": "Project not found or unauthorized"}), 404
        project_details = {
            "id": str(project["_id"]),
            "name": project["name"],
            "description": project["description"],
            "tasks": project.get("tasks", [])
        }
        return jsonify(project_details), 200

    app.register_blueprint(api, url_prefix='/api')
