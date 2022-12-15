from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='DemoUser1', email='demo@aa.io', password='password')
    demo2 = User(
        username='DemoUser2', email='demo2@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    trevor = User(
        username='trevorwmoore', email='trevor@aa.io', password='password')
    tyler = User(
        username='cahzm', email='christian@aa.io', password='password')
    haris = User(
        username='harisahmed', email='haris@aa.io', password='password')
    jacob = User(
        username='cobe', email='jacob@aa.io', password='password')


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(trevor)
    db.session.add(tyler)
    db.session.add(haris)
    db.session.add(jacob)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
