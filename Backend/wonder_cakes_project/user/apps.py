from django.apps import AppConfig

class UserConfig(AppConfig): # UserConfig for user-related settings
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user'
