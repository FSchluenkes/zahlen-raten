from flask import Blueprint, request, jsonify
import random
from routes.db.connect_db import get_db_connection

randomnumberBlueprint = Blueprint("randomnumber",__name__)

# Speichern der Random-Nummer, sowie Rückgabe der SessionID 
def store_random_number( pd_random_number ):
    ld_connection = get_db_connection( )
    ld_cursor = ld_connection.cursor( )
    ld_cursor.execute("""INSERT INTO Statistik (tries, correct_number) VALUES (?, ?)""", (0, pd_random_number) )
    ld_session_id = ld_cursor.lastrowid 
    if ld_session_id is not None:
        ld_connection.commit()
     
    return ld_session_id
    
# Erzeugen der Random-Nummer 
def get_random_number( ): 
    return random.randint(0, 100)

# Lesen der Random-Nummer & Tries aus der DB, zur enstprechenden SessionID 
def get_dataset(pd_session_id): 
    ld_connection = get_db_connection( )
    ld_cursor = ld_connection.cursor( )
    ld_cursor.execute("""SELECT Correct_Number, Tries FROM Statistik WHERE ID = :pd_session_id """,{ "pd_session_id":pd_session_id } )
    ld_dataset = ld_cursor.fetchone( )
    
    return ld_dataset

#Ändern der Statistik, damit wir wissen wie oft geraden wurde und ggf. ein "Win" eingetragen werden kann 
def save_statistic(pf_correct_guess,
                   pd_guesses, 
                   pd_session_id ):
     
    ld_connection = get_db_connection( )
    ld_cursor = ld_connection.cursor( )
    pd_guesses = int(pd_guesses) + 1 
    
    if pf_correct_guess == 1: #Wenn korrekt geraten
        ld_cursor.execute("""UPDATE Statistik 
                          SET tries = ?, succes = ?  
                          WHERE id = ?""", (pd_guesses, pf_correct_guess, pd_session_id ) )
    else: 
        ld_cursor.execute("""UPDATE Statistik 
                          SET tries = ?
                          WHERE id = ?""", (pd_guesses, pd_session_id ) )
        
    ld_connection.commit()
        
# -------------------------------------------------------------------------------------------------------------------------------------
# Start des Spiels, Erzeugung des Session-Datensatz
@randomnumberBlueprint.route("/start_session",  methods=['GET'])
def start_session( ): 
    ld_rndm_nmbr = get_random_number( )
    ld_session_id = store_random_number(ld_rndm_nmbr)
    
    return jsonify({ "message": "Session erzeugt",
                     "session_id": ld_session_id })
    
#"Session erzeugt" + " " + str(ld_rndm_nmbr) + " " + str(ld_session_id)
    
# Auswertung des Rateversuchs     
@randomnumberBlueprint.route("/guess", methods=['GET'] )
def new_guess( ):
    ld_guessed_number = request.args.get('guess') 
    ld_session_id = request.args.get('session_id')
    ld_dataset = get_dataset(ld_session_id) 
    ld_correct_number = ld_dataset[0]
    ld_tries = ld_dataset[1]
    ld_tries = int(ld_tries) + 1 
  
    if  int(ld_guessed_number) == int(ld_correct_number):
        save_statistic(1, ld_dataset[1], ld_session_id)
        return jsonify({"message":"correct", "session_id":ld_session_id, "tries":ld_tries}) 
    elif int(ld_guessed_number) < int(ld_correct_number):
        save_statistic(0, ld_dataset[1], ld_session_id)
        return jsonify({"message":"higher", "session_id":ld_session_id, "tries":ld_tries}) 
    elif int(ld_guessed_number) > int(ld_correct_number):
        save_statistic(0, ld_dataset[1], ld_session_id)
        return jsonify({"message":"lower", "session_id":ld_session_id, "tries":ld_tries}) 
        
    
# Methode zum erzeugen der Random-Nummer 
# -> Start des Prozesses, merken der zugehörigen Sessions 
# session objekt der flask anwendung baut einen zufälligen key, mit diesem kann das frontend sich dann die Daten wiederholen 



# Methode zum Prüfen der neu eingegebenen Nummer
# -> Korrekt, zu groß, zu klein 