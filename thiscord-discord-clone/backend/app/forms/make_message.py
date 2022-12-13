from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, Length


class MessageForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired(), Length(min=0, max=2000)])
