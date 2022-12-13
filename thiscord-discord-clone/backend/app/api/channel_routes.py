from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required, current_user
import json
from app.models import db, Server, User, Channel, Message
from app.forms import ChannelForm
from sqlalchemy.orm import joinedload
# from flask_sqlalchemy import SQLAlchemy

from app.models import Channel
from app.forms import ServerForm

channel_routes = Blueprint("channel", __name__)

@channel_routes.route("/<int:id>")
@login_required
def one_channel_index(id):
    channel= Channel.query.get(id)
    one_channel = channel.to_dict()
    one_channel_messages = Message.query.filter(Message.channel_id == id).order_by(Message.created_at.asc()).all()


    # query(User).options(joinedload(User.username))

    # one_channel_messages = Message.query.join(User).options(joinedload(User.username)).filter(Message.channel_id==id).order_by(Message.created_at.asc()).all()
    channel_messages = [message.to_dict() for message in one_channel_messages]
    message_with_user = []
    for m in channel_messages:
        user = User.query.get(m['userId']).to_dict()
        print(user, '!!! -- USER!!!!')
        # print(c['userId'], 'TRYING TO JOIN USER TO MESSAGES !!!!!!!!!!')
        m['user'] = user
        # print(m)
        message_with_user.append(m)

    print("! RESPONSE OBJ ! ------", {"channel": one_channel, "messages": message_with_user}, " ----- ! RESPONSE OBJ !")
    return {"channel": one_channel, "messages": message_with_user}, 200

@channel_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_channel(id):
    # pass
    form = ChannelForm() #Change form as needed for edit channel form
    form['csrf_token'].data = request.cookies['csrf_token']
    channel = Channel.query.get(id)
    channel.name = form.name.data
    print(form.name.data, "HERE IS FORM NAME DATA!!!!!")

    db.session.add(channel)
    db.session.commit()

    print({'channel': channel.to_dict()})
    return {'channel': channel.to_dict()}, 201

@channel_routes.route("/<int:id>")
@login_required
def delete_channel(id, methods=['DELETE']):
    # pass
    # user = current_user.to_dict()
    # server = Sever.query.get
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()

    return channel, 200
