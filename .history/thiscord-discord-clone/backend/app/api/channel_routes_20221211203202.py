from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required
import json
from app.models import db, Server, User, Channel, Message
from app.forms import ChannelForm

# from flask_sqlalchemy import SQLAlchemy

from app.models import Channel
from app.forms import ServerForm

channel_routes = Blueprint("channel", __name__)

@channel_routes.route("/<int:id>")
@login_required
def one_channel_index(id):
    channel= Channel.query.get(id)
    one_channel = channel.to_dict()
    # one_channel_messages = Message.query.filter(Message.channel_id == id).order_by(Message.created_at.asc()).all()
    one_channel_messages = Message.query.filter(Message.channel_id == id).order_by(Message.created_at.asc()).all()

    channel_messages = [message.to_dict() for message in one_channel_messages]

    return {"channel": one_channel, "messages": channel_messages}, 200


@channel_routes.route("/<int:id>")
@login_required
def edit_channel(id):
    form = ChannelForm() #Change form as needed for edit channel form
    channel= Channel.query.get(id)
    updated_channel = Channel(
        name=
    )
