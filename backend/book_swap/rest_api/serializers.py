from rest_framework import serializers
from .models import CustomUser
from .models import Book
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
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