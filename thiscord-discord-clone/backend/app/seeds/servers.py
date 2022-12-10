from app.models import db, Server, environment, SCHEMA

def seed_servers():
    server1 = Server(
        name='Home Gardening', owner_id=1)
    server2 = Server(
        name='App Academy August Cohort', owner_id=2)
    server3 = Server(
        name='Boys of the Summer', owner_id=3)
    server4 = Server(
        owner_id=4, private=True)
    server5 = Server(
        owner_id=5, private=True)

    all_servers=[server1, server2, server3, server4, server5]
    add_servers=[db.session.add(server) for server in all_servers]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
