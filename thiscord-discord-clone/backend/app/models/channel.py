from .db import db, environment, SCHEMA, add_prefix_for_prod
from .server import Server


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship("Message", back_populates="channel", cascade="all, delete")
