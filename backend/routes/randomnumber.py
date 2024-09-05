from flask import Blueprint

randomnumberBlueprint = Blueprint("randomnumber",__name__)

@randomnumberBlueprint.route("/",  methods=['GET'])
def rmnum():
    return "Nichts"