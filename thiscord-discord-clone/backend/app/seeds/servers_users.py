from app.models import db, environment, SCHEMA, User, Server

def seed_servers_users():
    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)
    trevor = User.query.get(4)
    tyler = User.query.get(5)
    haris = User.query.get(6)
    jacob = User.query.get(7)

    server1 = Server.query.get(1)
    server2 = Server.query.get(2)
    server3 = Server.query.get(3)
    server4 = Server.query.get(4)
    server5 = Server.query.get(5)

    demo.servers.append(server1)
    marnie.servers.append(server1)
    bobbie.servers.append(server1)
    trevor.servers.append(server1)
    tyler.servers.append(server1)
    haris.servers.append(server1)
    jacob.servers.append(server1)

    demo.servers.append(server2)
    marnie.servers.append(server2)
    bobbie.servers.append(server2)

    marnie.servers.append(server3)
    bobbie.servers.append(server3)
    trevor.servers.append(server3)
    haris.servers.append(server3)
    jacob.servers.append(server3)

    trevor.servers.append(server4)
    haris.servers.append(server4)

    trevor.servers.append(server5)
    tyler.servers.append(server5)
    haris.servers.append(server5)
    jacob.servers.append(server5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers_users")

    db.session.commit()
