# from app.models import db, Server, environment, SCHEMA

# def seed_servers():
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)
#     server_user1 = Server(server_id=, user_id=)

#     all_servers=[server1, server2, server3, server4, server5]
#     add_servers=[db.session.add(server) for server in all_servers]
#     db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
# def undo_servers():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM servers")

#     db.session.commit()
