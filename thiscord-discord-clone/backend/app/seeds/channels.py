from app.models import db, Channel, environment, SCHEMA

def seed_channels():
    channel1 = Channel(name='general', server_id = 1)
    channel2 = Channel(name='show_off_your_lawn', server_id = 1)
    channel3 = Channel(name='general', server_id = 2)
    channel4 = Channel(name='assessment', server_id = 2)
    channel5 = Channel(name='general', server_id = 3)
    channel6 = Channel(name='cars', server_id = 3)
    channel7 = Channel(name='general', server_id = 4)
    channel8 = Channel(name='general', server_id = 5)

    all_channels=[channel1, channel2, channel3, channel4, channel5, channel6, channel7, channel8]
    add_channels=[db.session.add(channel) for channel in all_channels]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
