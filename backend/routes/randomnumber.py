from flask import Blueprint, session
import random

randomnumberBlueprint = Blueprint("randomnumber",__name__)

@randomnumberBlueprint.route("/",  methods=['GET'])
#def rmnum():
#    return "Nichts"


def store_random_number( ):
    session['RANDOM_NUMBER'] = get_random_number( )
    return "Stored"

def get_random_number( ): 
    return random.randint(0, 100)

    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 