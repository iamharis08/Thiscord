from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required, current_user
import json

from flask_sqlalchemy import SQLAlchemy

from ..models import Server
from ..forms import ServerForm

sv = Blueprint("server", __name__, url_prefix="/servers")

@sv.route("/<int:id>")
@login_required
def server_index():
    id = request.args.get('id')
    one_server = Server.query.get(id)


@sv.route("/")
def users_server():
    id = current_user.id
    servers = Server.query.join(User).filter(user_id == id ).all()

    servers = {'servers': [server.to_dict() for server in servers]}
    return servers, 200
