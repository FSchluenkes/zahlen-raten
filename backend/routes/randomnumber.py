from flask import Blueprint, request
import random
import uuid
#from routes.auth import authBlueprint 

randomnumberBlueprint = Blueprint("randomnumber",__name__)
#authBlueprint         = Blueprint("auth")

def store_random_number( pd_random_number ):
    #session id erzeugen  und mit random number speichern 
    ld_session_id = uuid.uuid4()
    return ld_session_id
    
    
def get_random_number( ): 
    return random.randint(0, 100)

@randomnumberBlueprint.route("/start_session",  methods=['GET'])
def start_session( ): 
    ld_rndm_nmbr = get_random_number( )
    ld_session_id = store_random_number(ld_rndm_nmbr)
    return "Session erzeugt" + " " + str(ld_rndm_nmbr) + " " + str(ld_session_id)
    
@randomnumberBlueprint.route("/guess", methods=['GET'] )
def new_guess( ):
    ld_guessed_number = request.args.get('guess') 
    ld_session_id     = request.args.get('session_id')
    
    #aus der db holen und vergleichen 
    
    return "ok"
    
    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 