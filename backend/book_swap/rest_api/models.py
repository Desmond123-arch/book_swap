from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Book(models.Model):
    """ Model for books"""
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=150)
    condition = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to='book_images/', null=True)
    posted_by = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

class Profile(models.Model):
    """ Profile for Users"""
    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to='profile_pictures', blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    joined_at = models.DateField(auto_now=True)

