from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required
import json

from flask_sqlalchemy import SQLAlchemy

from app.models import Channel, Message
from app.forms import ServerForm

channel_routes = Blueprint("channel", __name__)

@channel_routes.route("/<int:id>")
@login_required
def channel_index(id):
    channel = Channel.query.get(id)
    one_channel = channel.to_dict()
    print(one_channel, '---- HERE IS OUR CHANNEL! ------')
    one_channel_messages = Message.query.filter()

    return {"channel": one_channel}, 200
