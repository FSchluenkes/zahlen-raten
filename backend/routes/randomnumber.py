from flask import Blueprint
import random

randomnumberBlueprint = Blueprint("randomnumber",__name__)

def store_random_number( ):
    #session id erzeugen  und mit random number speichern 
    #dafür db tabelle anlegen 
    print("Stored")
    
def get_random_number( ): 
    return random.randint(0, 100)

@randomnumberBlueprint.route("/start_session",  methods=['GET'])
def start_session(): 
    ld_random_number = get_random_number( )
    store_random_number() 
    return str(ld_random_number)



    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 