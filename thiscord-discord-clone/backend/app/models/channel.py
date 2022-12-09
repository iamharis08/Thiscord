from .db import db, environment, SCHEMA, add_prefix_for_prod
from .server import Servers


class Channels(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.String(255), nullable=False, db.ForeignKey('servers.id'))
   
