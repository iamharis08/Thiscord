from flask import Blueprint, redirect, render_template, url_for, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Message
from app.forms import MessageForm


message_routes = Blueprint("message", __name__)

# Edit Message
@message_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_message(id):

  message = Message.query.get(id)
  user = current_user.to_dict()
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if user['id'] == message.user_id:

    message.message = form.message.data
    db.session.add(message)
    db.session.commit()
    return {'message': message.to_dict()}, 200

  return "YOU CAN'T EDIT THIS MESSAGE", 401


# Delete Message
@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_message(id):
  message = Message.query.get(id)
  user = current_user.to_dict()
  if user['id'] == message.user_id:

    db.session.delete(message)
    db.session.commit()
    return {'message': "Successfully Deleted"}, 200

  return "YOU CAN'T DELETE THIS MESSAGE", 401


