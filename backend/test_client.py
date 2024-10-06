import unittest
from flask import Flask
from flask_jwt_extended import JWTManager
from extensions import db
from main import create_app  # Adjust the import based on your project structure
from models import User, TokenBlocklist, Game

class TestAuthGameApp(unittest.TestCase):
    def setUp(self):
        # Create a new app instance for testing
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Use in-memory database
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()  # Create tables

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()  # Remove session
            db.drop_all()  # Drop all tables

    def test_register_user(self):
        response = self.client.post('/auth/register', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User created', response.data)

        # Attempt to register the same user again
        response = self.client.post('/auth/register', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 409)
        self.assertIn(b'User already exists', response.data)

    def test_login_user(self):
        # First, register the user
        self.client.post('/auth/register', data={
            'username': 'testuser',
            'password': 'testpassword'
        })

        # Now, login with the same credentials
        response = self.client.post('/auth/login', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Logged in', response.data)
        self.assertIn(b'access token', response.data)

    def test_refresh_token(self):
        # Register and login to get tokens
        self.client.post('/auth/register', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        login_response = self.client.post('/auth/login', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        tokens = login_response.get_json()['jwt']
        refresh_token = tokens['refresh token']

        # Refresh the access token
        response = self.client.post('/auth/refresh', headers={
            'Authorization': f'Bearer {refresh_token}'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Tokens refreshed', response.data)

    def test_start_game(self):
        # Register and login to get access token
        self.client.post('/auth/register', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        login_response = self.client.post('/auth/login', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        access_token = login_response.get_json()['jwt']['access token']

        # Start a new game
        response = self.client.get('/game/start', headers={
            'Authorization': f'Bearer {access_token}'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'game_id', response.data)

    def test_guess_number(self):
        # Register and login to get access token
        self.client.post('/auth/register', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        login_response = self.client.post('/auth/login', data={
            'username': 'testuser',
            'password': 'testpassword'
        })
        access_token = login_response.get_json()['jwt']['access token']

        # Start a new game
        start_response = self.client.get('/game/start', headers={
            'Authorization': f'Bearer {access_token}'
        })
        game_id = start_response.get_json()['game_id']

        with self.app.app_context():
            game: Game = Game.query.filter(Game.id == game_id).scalar()

        # Make a guess (the guess should be within the range 0-100)
        response = self.client.post('/game/guess', json={
            'game_id': game_id,
            'number': game.number - 1  
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'higher', response.data)

        response = self.client.post('/game/guess', json={
            'game_id': game_id,
            'number': game.number + 1  
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'lower', response.data)

        response = self.client.post('/game/guess', json={
            'game_id': game_id,
            'number': game.number  
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'win', response.data)

        with self.app.app_context():
          game: Game = Game.query.filter(Game.id == game_id).scalar()

        self.assertEqual(game.attempts, 3)
        self.assertEqual(game.finished, True)

if __name__ == '__main__':
    unittest.main()

