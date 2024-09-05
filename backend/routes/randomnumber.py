from flask import Blueprint

randomnumber = Blueprint("randomnumber",__name__)

@randomnumber.route("/")
def randomnumer( ):
    print("")