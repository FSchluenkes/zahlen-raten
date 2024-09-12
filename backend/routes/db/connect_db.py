import sqlite3
import os

def get_db_connection(): 
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../db/zahlen-ratenDB.db"))
    connection = sqlite3.connect(db_path)
    return connection