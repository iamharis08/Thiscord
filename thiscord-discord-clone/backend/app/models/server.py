from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates, relationship
from sqlalchemy.types import Integer, String, Boolean, Float
from .db import db, environment, SCHEMA
import json

db = SQLAlchemy()

class Server(db.Model):
    __tablename__ = "pokemon"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    private = db.Column(db.Boolean, default=False)
