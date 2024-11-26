from flask import Blueprint

def register_routes(app):
    # Initialize Blueprint
    api = Blueprint('api', __name__)
    
    # Example route
    @api.route('/ping', methods=['GET'])
    def ping():
        return {"message": "pong"}, 200
    
    # Register Blueprint
    app.register_blueprint(api, url_prefix='/api')
