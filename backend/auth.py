from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from models import User, TokenBlocklist

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('register')
def register():
    user: User = User.get_user_by_name(request.form.get('username'))

    if user:
        return jsonify({"error": "User already exists"}), 409
    
    new_User: User = User(
        name = request.form.get('username')
    )
    new_User.set_hashed_password(request.form.get('password'))
    new_User.save()

    return jsonify({"message": "User created"}), 201

@auth_bp.post('login')
def login():
    user: User = User.get_user_by_name(request.form.get('username'))

    if user and (user.check_hashed_password(request.form.get('password'))):
       access_token = create_access_token(identity=user.name)
       refresh_token = create_refresh_token(identity=user.name)
       return jsonify({
           "message": "Logged in",
           "jwt": {
               "access token": access_token,
               "refresh token": refresh_token
           }
        }) , 200 
    
    else:
        return jsonify({"error": "Invalid username or password"}), 400
    
@auth_bp.post('refresh')
@jwt_required(refresh=True)
def refresh_access():
    username = get_jwt_identity()
    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    return jsonify({
        "message": "Tokens refreshed",
        "jwt": {
            "access token": access_token,
            "refresh token": refresh_token
        }
    }) , 200 

@auth_bp.post('logout')
@jwt_required(verify_type=False)
def logout():
      
    jwt = get_jwt()
    jti = jwt['jti']
    type = jwt['type']
    token: TokenBlocklist= TokenBlocklist(jti=jti)
    token.save()
    return jsonify({"message": f"{type} token revoked"}), 200