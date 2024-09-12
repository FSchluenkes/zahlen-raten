from flask import Blueprint, request
import random
from routes.db.connect_db import get_db_connection

randomnumberBlueprint = Blueprint("randomnumber",__name__)

def store_random_number( pd_random_number ):
    ld_connection = get_db_connection( )
    ld_cursor = ld_connection.cursor( )
    ld_cursor.execute("""INSERT INTO Statistik (tries, correct_number) VALUES (?, ?)""", (0, pd_random_number) )
    ld_session_id = ld_cursor.lastrowid 
    if ld_session_id is not None:
        ld_connection.commit()
     
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

    ld_connection = get_db_connection( )
    ld_cursor = ld_connection.cursor( )
    ld_cursor.execute("""SELECT Correct_Number FROM Statistik WHERE ID = :ld_session_id """,{ "ld_session_id":ld_session_id } )
    ld_correct_number = ld_cursor.fetchall( )

    #for zeile in ld_correct_number: 
    #    if ld_guessed_number == zeile:
    #        return "correct"
    #    elif ld_guessed_number < zeile:
    #        return "higher"
    #    elif ld_guessed_number > :
    #       return "lower"
        
    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 