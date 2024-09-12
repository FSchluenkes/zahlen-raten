from flask import Blueprint, session
import random
#from routes.auth import authBlueprint 

randomnumberBlueprint = Blueprint("randomnumber",__name__)
#authBlueprint         = Blueprint("auth")

@randomnumberBlueprint.route("/start_session",  methods=['GET'])
def store_random_number( ):
    #session id erzeugen  und mit random number speichern 
    #dafür db tabelle anlegen 
    print("Stored")
    
def get_random_number( ): 
    return random.randint(0, 100)

    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 