from flask import Flask
from routes.randomnumber import randomnumberBlueprint  
#from routes.auth import authBlueprint 

app = Flask(__name__)
<<<<<<< HEAD
=======
app.config['SECRET_KEY'] = "überlegdirwas"


#eigene route für session handling?  

>>>>>>> 7c1abf83cb6040671d8b87bc088846b05ca6419d

app.register_blueprint(randomnumberBlueprint, url_prefix='/randomnumber')
#app.register_blueprint(authBlueprint, url_prefix='/auth')
if __name__ == "__main__":
    app.run(debug=True)