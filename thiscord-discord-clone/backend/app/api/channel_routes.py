from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required, current_user
import json
from app.models import db, Server, User, Channel, Message
from app.forms import ChannelForm
from sqlalchemy.orm import joinedload

from app.models import Channel
from app.forms import ServerForm

channel_routes = Blueprint("channel", __name__)

@channel_routes.route("/<int:id>")
@login_required
def one_channel_index(id):
    channel= Channel.query.get(id)
    one_channel = channel.to_dict()
    one_channel_messages = Message.query.filter(Message.channel_id == id).order_by(Message.created_at.asc()).all()

    channel_messages = [message.to_dict() for message in one_channel_messages]
    message_with_user = []
    for m in channel_messages:
        user = User.query.get(m['userId']).to_dict()
        m['user'] = user
        message_with_user.append(m)

    return {"channel": one_channel, "messages": message_with_user}, 200

@channel_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    channel = Channel.query.get(id)
    channel.name = form.name.data

    db.session.add(channel)
    db.session.commit()

    return {'channel': channel.to_dict()}, 201

@channel_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    channel_dict = channel.to_dict()
    user = current_user.to_dict()
    server = Server.query.get(channel_dict['serverId'])
    if server.owner_id == user['id']:
        db.session.delete(channel)
        db.session.commit()
        return {"message": "Channel successfully deleted!"}, 200
    return "Bad Data!"


@channel_routes.route("/<int:id>/messages", methods=["PUT"])
@login_required
def edit_channel_message(id):
    pass


@channel_routes.route("/<int:id>/messages", methods=["DELETE"])
@login_required
def edit_channel_message(id):
    pass
