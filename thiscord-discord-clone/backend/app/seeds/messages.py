from app.models import db, Message, environment, SCHEMA



# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(
      user_id=2, channel_id=1, message="Here is a message for our very first channel!")
    message2 = Message(
      user_id=4, channel_id=1, message="Wow, isn't this really awesome??")
    message3 = Message(
      user_id=5, channel_id=1, message="Nah, not really")
    message4 = Message(
      user_id=3, channel_id=2, message="Test message for this new channel here, cool")
    message5 = Message(
      user_id=2, channel_id=3, message="Here is a test message for a sweet new server's channel!")
    message6 = Message(
      user_id=7, channel_id=3, message="wÜht, really?")
    message7 = Message(
      user_id=6, channel_id=3, message="yep, really really reallyl")
    message8 = Message(
      user_id=3, channel_id=4, message="First!")
    message9 = Message(
      user_id=4, channel_id=4, message="Second! not too bad")
    message10 = Message(
      user_id=5, channel_id=5, message="do you even lift bro? cause you shouldn't")
    message11 = Message(
      user_id=7, channel_id=6, message="Test post for a test channel on a test server, wÜÜF")
    message12 = Message(
      user_id=6, channel_id=7, message="yo post your tik tok")
    message13 = Message(
      user_id=4, channel_id=7, message="No :-)")
    message14 = Message(
      user_id=6, channel_id=7, message="Fair enough")
    message15 = Message(
      user_id=7, channel_id=8, message="BOS")
    message16 = Message(
      user_id=5, channel_id=8, message="I'll make the server")
    message17 = Message(
      user_id=6, channel_id=8, message="noice")
    message18 = Message(
      user_id=4, channel_id=8, message="shweeee")
    message19 = Message(
      user_id=5, channel_id=2, message="Leavin' one more lil note here")
    message20 = Message(
      user_id=6, channel_id=4, message="Hope someone posts something else soon..")

    all_messages = [
      message1, message2,
      message3, message4,
      message5, message6,
      message7, message8,
      message9, message10,
      message11, message12,
      message13, message14,
      message15, message16,
      message17, message18,
      message19, message20
    ]
    add_messages = [db.session.add(message) for message in all_messages]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
