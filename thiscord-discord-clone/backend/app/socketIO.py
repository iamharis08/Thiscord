from flask_socketio import SocketIO, send, emit, join_room, leave_room
from app.models import db, Message
from flask_login import login_required, current_user
import os
from datetime import datetime
import json

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://this-cord.onrender.com",
        "https://this-cord.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    # now = datetime.now()

    print((data['timestamp']), 'DATA WITH CREATED AT', "HERE IS NOW!")
    # test_str = str(data['timestamp'])
    # print(test_str, "!!!!!! -------- HERE IS STR of TIMESTRING --------")

    if len(data['message']) > 0 and len(data['message']) <= 2000:
        message = Message(
        user_id=current_user.id,
        channel_id=int(data['room']),
        message=data['message'],
        live_id = data['live_id'],
        created_at=datetime.now()
    )
        # print('--------BACKENDDATA', message.to_dict())
        db.session.add(message)
        db.session.commit()
        # new_message_date = datetime.now()
        if data['room']:
            room = data['room']
            emit("chat", data, broadcast=True, to=room)


@socketio.on("update")
def update_chat(data):
    print("\n", data, "UPDATE DATAAAAAAAAAAAAAAAAAAAAAAA","\n")
    live_id = data["live_id"]
    message = data["message"]
    is_edited = data["is_edited"]
    user = data["user"]
    update_chat = Message.query.filter(Message.live_id == live_id).first()
    print("\n", update_chat.to_dict(), "UPDATE DATAAAAAAAAAAAAAAAAAAAAAAA","\n")
    if user["id"] == current_user.id:
        if len(data['message']) > 0 and len(data['message']) <= 2000:
            update_chat.message = message
            update_chat.is_edited = is_edited


            db.session.commit()
            if data['room']:
                room = data['room']
                emit("update", data, broadcast=True, to=room)



@socketio.on('delete')
def on_delete(data):
    live_id = data["live_id"]
    delete_chat = Message.query.filter(Message.live_id == live_id).first()
    db.session.delete(delete_chat)
    db.session.commit()
    if data['room']:
        room = data['room']
        emit("delete", data, broadcast=True, to=room)


@socketio.on('join')
def on_join(data):
    # print('------USERDATASOCKET', data)
    username = data['user']['username']
    room = data['room']
    join_room(room)
    emit(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


#

#you need which message in the array the user wants to delete
#first get the array of messages send it backend
#iterate to find the message that you need to delete and delte it in the backend
#query the message
#destroy the message
#then take the array and remove the message from it and emit it back to the users
