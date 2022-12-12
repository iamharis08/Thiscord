from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required
import json
from app.models import db, Server, User, Channel, Message

# from flask_sqlalchemy import SQLAlchemy

from app.models import Channel
from app.forms import ServerForm

channel_routes = Blueprint("channel", __name__)

@channel_routes.route("/<int:id>")
@login_required
def channel_index(id):
    channel = Channel.query.get(id)
    one_channel = channel.to_dict()
    _channel_messages = Message.query.filter(Message.channel_id=id).all()


    return one_channel, 200
