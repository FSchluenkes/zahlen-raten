from flask import Flask
from routes.randomnumber import randomnumber  

app = Flask(__name__)

app.register_blueprint(randomnumber)

@app.route("/")
def greet():
    return "Hello, World!"