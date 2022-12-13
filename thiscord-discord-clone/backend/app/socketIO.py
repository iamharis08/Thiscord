from flask_socketio import SocketIO, send, emit, join_room, leave_room
from app.models import db, Message
from flask_login import login_required, current_user
import os

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
    print('--------BACKENDDATA', data, current_user)
    message = Message(
        user_id=current_user.id,
        channel_id=int(data['room']),
        message=data['message']
    )
    db.session.add(message)
    db.session.commit()

    if data['room']:
        print('-----INROOMBACKEND', data)
        room = data['room']
        emit("chat", data, broadcast=True, to=room)



@socketio.on('join')
def on_join(data):
    print('------USERDATASOCKET', data)
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
