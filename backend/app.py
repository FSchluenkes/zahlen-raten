from flask import Flask
from routes.randomnumber import randomnumberBlueprint  
from routes.auth import authBlueprint 

app = Flask(__name__)

app.register_blueprint(randomnumberBlueprint, url_prefix='/randomnumber')
app.register_blueprint(authBlueprint, url_prefix='/auth')
if __name__ == "__main__":
    app.run(debug=True)