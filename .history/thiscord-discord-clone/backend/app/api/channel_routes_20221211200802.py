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
def one_channel_index(id):
    channel= Channel.query.get(id)
    one_channel = channel.to_dict()
    one_channel_messages = Message.query.filter(Message.channel_id == id).order_by(Message.created_at.asc()).all()
    # print(one_channel_messages, '---- HERE IS OUR CHANNEL mESSAGES@!!!!! ------')
    # channel_messages = [message.to_dict() for message in one_channel_messages]annel_id==id).order_by(Message.created_at).all()
    channel_messages = [message.to_dict() for message in one_channel_messages]

    return {"channel": one_channel, "messages": channel_messages}, 200


# last_students = Student.query.order_by(
#     Student.name.desc()
# ).limit(3)

# case insensitive version - include import statement at top of file
# from sqlalchemy import func
# last_students = Student.query.order_by(
#     func.lower(Student.name).desc()
# ).limit(3)
