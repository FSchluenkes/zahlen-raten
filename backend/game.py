from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request, jwt_required
from models import Game, User

game_bp = Blueprint('game', __name__)

@game_bp.get('start')
@jwt_required(optional=True)
def start_game():
    game: Game = Game()
    
    username = get_jwt_identity()
    if username:
        user: User = User.get_user_by_name(username)
        if user.id:
            game.user_id = user.id
    
    game.save()
    return jsonify({"game_id": game.id}), 200

@game_bp.post('guess')
# @jwt_required(optional=True)
def guess():
    game_id:str = request.get_json().get('game_id')
    number:int = int(request.get_json().get('number'))

    if game_id:
        try:
            msg = Game.guess(game_id, number)
            game: Game = Game.query.filter(Game.id==game_id).scalar()
            return jsonify({"result": msg, "message": "Game guessed successfully", "guess": number, "attempts": game.attempts}), 200 
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "No game_id provided"}), 400 

@game_bp.post('leaderboard')
# @jwt_required(optional=True)
def leaderboard():
  games = Game.leaderboard()
  if games:
    return games 
  else: 
    return jsonify({"error": "No Games found"}), 400 