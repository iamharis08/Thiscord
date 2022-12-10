from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, Length


class ChannelForm(FlaskForm):
    name = StringField("Channel Name", validators=[DataRequired(), Length(min=3, max=255)])
