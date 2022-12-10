from sqlalchemy.orm import validates, relationship
from sqlalchemy.types import Integer, String, Boolean
from .db import db, environment, SCHEMA, servers_users, add_prefix_for_prod
import json



class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True, default='replace_username')
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    private = db.Column(db.Boolean, default=False)

    users = db.relationship("User", secondary=servers_users, back_populates="servers")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'private': self.private
        }
