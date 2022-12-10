from flask_socketio import SocketIO, send, emit, join_room, leave_room
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# @app.route("/livechat")
# def livechat():
#     return render_template("livechat.html")

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

# @socketio.on('message') docs send message
# def handle_message(message):
#     send(message, broadcast=True)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
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
