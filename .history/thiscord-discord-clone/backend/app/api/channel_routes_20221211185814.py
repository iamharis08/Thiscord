from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required
import json

from flask_sqlalchemy import SQLAlchemy

from app.models import Channel
from app.forms import ServerForm

channel_routes = Blueprint("channel", __name__)

@channel_routes.route("/<int:id>")
@login_required
def channel_index(id):
    id = request.args.get('id')
    channel = Channel.query.get(id)
    one_channel = channel.to_dict()

    return one_channel, 200
