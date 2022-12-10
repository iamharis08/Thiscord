from flask_sqlalchemy import SQLAlchemy
# import Channel, Message, Server, User

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

servers_users = db.Table(
    "servers_users",
    db.Model.metadata,
    db.Column(
        "server_id", db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), primary_key=True
    ),
    db.Column(
        "user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True
    )
)

if environment == "production":
    servers_users.schema = SCHEMA
