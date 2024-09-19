from extensions import db
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
import random
from datetime import datetime

class User(db.Model):
    __tablename__   = 'users'
    __table_args__  = {'extend_existing': True}
    id:         Mapped[str] = mapped_column(primary_key=True, default=str(uuid4()))
    name:       Mapped[str] = mapped_column(nullable=False, unique=True) 
    password:   Mapped[str] = mapped_column(nullable=False)   

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r})"
    
    def set_hashed_password(self, password:str):
        self.password = generate_password_hash(password)

    def check_hashed_password(self, password:str):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_name(cls, name:str):
        return cls.query.filter(cls.name==name).scalar()
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class TokenBlocklist(db.Model):
    __tablename__   = 'token_blocklist'
    __table_args__  = {'extend_existing': True}
    id:     Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    jti:    Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now)

    def __repr__(self) -> str:
        return f"Token(jti=f{TokenBlocklist.jti!r}, created_at={TokenBlocklist.created_at!r})"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

class Game(db.Model):
    __tablename__   = 'game'
    __table_args__  = {'extend_existing': True}
    id:         Mapped[str] = mapped_column(primary_key=True, default=str(uuid4()))
    number:     Mapped[int] = mapped_column(default=int(random.randint(0, 100)))
    attempts:   Mapped[int] = mapped_column(default=int(0))
    finished:   Mapped[bool] = mapped_column(default=False)
    user_id:    Mapped[Optional[str]]

    def __repr__(self) -> str:
        return f"game(id={self.id!r}, number={self.number!r}, attempts={self.attempts!r}, finished={self.finished!r}, user_id={self.user_id!r})"

    @classmethod
    def guess(cls, game_id: str, number: int):
        game: Game = cls.query.filter(cls.id==game_id).scalar()
        if game.finished:
            raise ValueError(f"Game with ID {game_id} is already finished")
        if game:
            game.attempts = game.attempts + 1
        else:
            raise ValueError(f"Game with ID {game_id} not found")
        
        if number > game.number:
            msg = 'lower'
        elif number < game.number:
            msg = 'higher'
        else:
            game.finished = True
            msg = 'win'

        game.save()
        return msg
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

