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

    # print(now, 'HERE IS NOW!!!')

    print((data['timestamp']), 'DATA WITH CREATED AT', "HERE IS NOW!")
    # test_str = str(data['timestamp'])
    # print(test_str, "!!!!!! -------- HERE IS STR of TIMESTRING --------")


    message = Message(
        user_id=current_user.id,
        channel_id=int(data['room']),
        message=data['message'],
        # created_at=datetime.now()
    )
    # print('--------BACKENDDATA', message.to_dict())
    db.session.add(message)
    db.session.commit()
    # new_message_date = datetime.now()


    if data['room']:
        # print('!!!!! -----IN ROOM, DATA HERE!!!', message.to_dict(), "!!!!! ------- !!!!!")
        # test = json.dumps(datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'))
        # test = json.dumps(datetime.now().isoformat())
        # data['timestamp'] = test
        # data['message'] = message.to_dict()
        # print(data, '!!!!! JSON DUMPS!@!!!!!!!!')
        room = data['room']
        emit("chat", data, broadcast=True, to=room)



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
