from flask import Blueprint, session
import random

randomnumberBlueprint = Blueprint("randomnumber",__name__)

@randomnumberBlueprint.route("/start_session",  methods=['GET'])
def store_random_number( ):
    session['RANDOM_NUMBER'] = get_random_number( )
    return "Stored"

@randomnumberBlueprint.route("/get_stored_number",  methods=['GET'])
def get_stored_number( ):
    rndm_numer = session.get("RANDOM_NUMBER")  
    return str(rndm_numer) 
    
def get_random_number( ): 
    return random.randint(0, 100)

    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 