from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', ]
    
class BookSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)
    class Meta:
        model = Book
        fields = ['pk' ,'title', 'author', 'genre', 'condition', 'description', 'image', 'posted_by', 'created_at']
class UserBookSerializer(serializers.ModelSerializer):
        class Meta:
             model = Book
             fields = ['pk' ,'title', 'author', 'genre', 'condition', 'description', 'image', 'created_at']