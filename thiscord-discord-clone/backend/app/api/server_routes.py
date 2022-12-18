from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required, current_user
import json

from flask_sqlalchemy import SQLAlchemy

from app.models import db, Server, User, Channel
from app.forms import ServerForm, ChannelForm
import sys

server_routes = Blueprint("server", __name__)


# Add Channel to Server
@server_routes.route("/<int:id>/channels", methods=["POST"])
@login_required
def create_channel(id):

  form=ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  new_channel = Channel(
    name=form.data["name"],
    server_id = id
  )

  db.session.add(new_channel)
  db.session.commit()

  return new_channel.to_dict(), 302

# Get Server
@server_routes.route("/<int:id>")
@login_required
def server_index(id):
    one_server = Server.query.get(id)
    one_server_users = User.query.filter(User.servers.any(id=id)).all()
    server_users = [ user.to_dict() for user in one_server_users]
    one_server_channels = Channel.query.filter(Channel.server_id == id).all()
    server_channels = [server.to_dict() for server in one_server_channels]
    print("BEFOREEEE SERVERRR OBJECTTTTTTTTTTTTTTTTTTT________-------------!!!@@@@@@@@@@@")
    print({"server": one_server.to_dict(), "users": server_users, "channels": server_channels}, "SERVER-----------------------")
    return {"server": one_server.to_dict(), "users": server_users, "channels": server_channels}, 200


# Update Server
@server_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_server(id):
    # pass
    form = ServerForm() #Change form as needed for edit channel form
    form['csrf_token'].data = request.cookies['csrf_token']
    server = Server.query.get(id)
    server.name = form.name.data

    db.session.add(server)
    db.session.commit()

    return {'server': server.to_dict()}, 201


# Delete Server
@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):
    user = current_user.to_dict()

    server = Server.query.get(id)
    if user['id'] == server.owner_id:
        db.session.delete(server)
        db.session.commit()
        return {"message": "Successfully Deleted"}, 200
    return 'BAD REQUEST', 404


# Create Server
@server_routes.route("/", methods=["POST"])
@login_required
def create_server():
    form = ServerForm()
    owner = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    new_server = Server(name=form.name.data,
    owner_id=owner['id'],
     private=False
    )
    current_user.servers.append(new_server)
    db.session.add(new_server)
    db.session.commit()

    return {"server": new_server.to_dict()}, 201

# Get Current User Servers
# @server_routes.route("/")
# @login_required
# def users_server():
#     id = current_user.id
#     joined_servers = Server.query.filter(Server.users.any(id=id)).all()
#     servers = {'servers': [server.to_dict() for server in joined_servers]}
#     return servers, 200

@server_routes.route("/")
@login_required
def users_server():
    # id = current_user.id
    # joined_servers = Server.query.filter(Server.users.any(id=id)).all()
    # servers = {'servers': [server.to_dict() for server in joined_servers]}
    # return servers, 200

    id = current_user.id
    joined_servers = Server.query.filter(Server.users.any(id=id)).all()
    res = []
    for s in joined_servers:
        print(s.to_dict(), 'BEFORE JOIN??')
        channels = Channel.query.filter(Channel.server_id==id).all()
        print([c.to_dict() for c in channels], 'CHANNELS!')
        server_channels = [c.to_dict() for c in channels]
        server = s.to_dict()
        server.update(channels=server_channels)
        print(server, 'TRYING TO JOIN!!')
        # print({})
        res.append(server)
        servers = {'servers': [server.to_dict() for server in joined_servers]}
        print(res, 'HERE IS JOINED SERVERS!!')
    return {'servers': res}, 200
