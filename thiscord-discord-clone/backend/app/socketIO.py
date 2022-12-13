from flask_socketio import SocketIO, send, emit, join_room, leave_room
from app.models import db, Message
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

# @app.route("/livechat")
# def livechat():
#     return render_template("livechat.html")

# @socketio.on('message')
# def handle_message(data):
#     print('received message: ' + data)
#     send(data, broadcast=True)

# @socketio.on('message') docs send message
# def handle_message(message):
#     send(message, broadcast=True)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    message = Message(
        user_id=data.user_id,
        channel_id=data.channel_id,
        message=data
    )
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
