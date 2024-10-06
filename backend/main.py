from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt
from auth import auth_bp
from game import game_bp
from models import TokenBlocklist

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])
    app.config.from_prefixed_env()
    
    db.init_app(app)
    jwt.init_app(app)
    
    with app.app_context():
        #db.drop_all()
        db.create_all()

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(game_bp, url_prefix='/game')

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        return jsonify({"message": "Token has expired", "error": "token_expired"}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"message": "Sigature verification failed", "error": "token_invalid"}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"message": "Request does not contain a valid token", "error": "token_missing"})
    
    @jwt.token_in_blocklist_loader
    def token_is_revoked_callback(jwt_header, jwt_data):
        jti = jwt_data['jti']

        token: TokenBlocklist = db.session.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).scalar()

        return token is not None
    return app