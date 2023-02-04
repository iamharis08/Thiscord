from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.types import Integer, String, Boolean
from sqlalchemy.orm import declarative_mixin
from datetime import datetime

@declarative_mixin
class TimestampMixin:
    created_at = db.Column(db.DateTime, default=datetime.now())

class Message(db.Model, TimestampMixin):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    message = db.Column(db.String(2000), nullable=False)
    is_edited = db.Column(db.Boolean, nullable=False, default=False)
    live_id = db.Column(db.String(50), nullable=False)

    user = db.relationship("User", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'channelId': self.channel_id,
            'message':self.message,
            'isEdited':self.is_edited,
            'liveId':self.live_id,
            'createdAt': self.created_at
        }
