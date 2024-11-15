from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Sending message from backend to frontend"}

if __name__ == "__main__":
    app.run(debug=True)
