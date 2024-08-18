from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
import uuid
from django.utils import timezone

class CustomUser(AbstractUser):
    username = None
    userId = models.CharField(max_length=50, default=uuid.uuid4, primary_key=True)
    email = models.EmailField(_("email address"), unique=True)
    firstName = models.CharField(max_length=50, null=False)
    lastName = models.CharField(max_length=50, null=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstName", "lastName"]

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email
    
class Book(models.Model):
    """ Model for books"""
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=150)
    condition = models.CharField(max_length=50)
    description = models.TextField()
    image = models.URLField(null=True)
    posted_by = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
