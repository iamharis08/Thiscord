from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, Length


class ServerForm(FlaskForm):
    name = StringField("Server Name", validators=[DataRequired(), Length(min=3, max=255)])
