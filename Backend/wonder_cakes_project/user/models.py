from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    A custom user model extending Django's built-in AbstractUser.

    By inheriting from AbstractUser, we get all the standard user fields
    (like username, password, email, first_name, last_name) for free.
    This also allows us to easily add more fields in the future if needed,
    like a profile picture or a phone number.
    """
    pass
