from django.contrib.auth.models import BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None, clicks=0):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, clicks=clicks)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)

        user = self.create_user(email=email, name=name)
        user.set_password(password)

        user.is_staff = True
        user.is_superuser = True

        user.save()

        return user