from flask import Blueprint, request
from routes.db.connect_db import get_db_connection

authBlueprint = Blueprint("auth",__name__)

@authBlueprint.route("/register", methods=['GET'])
def register( ):
    connection = get_db_connection()
    cur = connection.cursor()
    username = request.args.get('user')
    passwort = request.args.get('passwort')
    cur.execute("Select ID from Users where name = :username",{"username":username} )
    row_id = cur.fetchall()
    if row_id:
        return 'Name ist bereits vergegeben'
    else:
        cur.execute("Insert into Users (Name, Passwort) Values(? , ?)",(username, passwort))
        connection.commit()
        connection.close()
        return 'Erfolgreich'

@authBlueprint.route("/login", methods=['GET'])
def login( ):
    connection = get_db_connection()
    cur = connection.cursor()
    username = request.args.get('user')
    passwort = request.args.get('passwort')
    cur.execute("Select ID from Users where name = ? and passwort = ?",(username, passwort))
    row_id = cur.fetchall()
    if not row_id:
        return 'No such user'
    else:
        return 'Nice'
