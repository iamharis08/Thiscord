from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required, current_user
import json

from flask_sqlalchemy import SQLAlchemy

from app.models import db, Server, User, Channel
from app.forms import ServerForm
import sys

server_routes = Blueprint("server", __name__)

@server_routes.route("/<int:id>")
@login_required
def server_index(id):
    one_server = Server.query.get(id)
    one_server_users = User.query.filter(User.servers.any(id=id)).all()
    server_users = [ user.to_dict() for user in one_server_users]
    # print(one_server.to_dict(), "--- TESTING HERE IS ONE SERVER ---")
    print(server_users, "---- TESTING HERE ARE SERVER USERS ---")
    one_server_channels = Channel.query.filter(Channel.server_id == id).all()
    server_channels = [server.to_dict() for server in one_server_channels]

    return {"server": one_server.to_dict(), "users": server_users, "channels": server_channels}, 200


@server_routes.route("/")
@login_required
def users_server():
    print('---- HERE IN SERVER ROUTES ----')
    id = current_user.id
    # print("--------------",current_user.to_dict(), id)
    # servers = Server.query.join(User).filter(user_id == id ).all()
    joined_servers = Server.query.filter(Server.users.any(id=id)).all()
    print(joined_servers)
    servers = {'servers': [server.to_dict() for server in joined_servers]}
    # print('-----', servers, '--- SERVERS')
    return servers, 200
