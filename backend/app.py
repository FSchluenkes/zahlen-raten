from flask import Flask
from routes.randomnumber import randomnumberBlueprint  

app = Flask(__name__)

app.register_blueprint(randomnumberBlueprint, url_prefix='/randomnumber')
if __name__ == "__main__":
    app.run(debug=True)