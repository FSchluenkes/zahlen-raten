import sqlite3
from flask import Blueprint, request

authBlueprint = Blueprint("auth",__name__)

@authBlueprint.route("/register", methods=['POST'])
def register( ):
    connection = get_db_connection()
    cur = connection.cursor()
    cur.execute("Insert into Users (Name, Created_At) Values(? , ?)",())
    connection.commit()
    connection.close()

@authBlueprint.route("/login", methods=['POST'])
def login( ):
    connection = get_db_connection()
    cur = connection.cursor()
    username = request.args.get('User')
    cur.execute("Select ID from Users where name = ?",(username))
    row_id = cur.fetchall()
    if row_id is None:
        print('No such user')
    else:
        print()

def get_db_connection(): 
    connection = sqlite3.connect('zahlen-raten.db')
    return connection