from rest_framework import serializers
from .models import CustomUser
from .models import Book
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['userId', 'firstName', 'lastName', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def validate(self, data):
        errors = {}
        if not data.get('firstName'):
            errors['firstName'] = 'First name is required'
        if not data.get('lastName'):
            errors['lastName'] = 'Last name is required'
        if not data.get('email'):
            errors['email'] = 'Email is required'
        if not data.get('password'):
            errors['password'] = 'Password is required'

        if errors:
            raise serializers.ValidationError(errors)
        return data
    def create(self, validated_data):
        User = get_user_model()
        return User.objects.create_user(**validated_data)
class BookSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)

    class Meta:
        model = Book
        fields = ['pk', 'title', 'author', 'genre', 'condition', 'description', 'image', 'posted_by', 'created_at']
    
    def save(self, **kwargs):
        instance = super().save(**kwargs)
        return instance
class UserBookSerializer(serializers.ModelSerializer):
        class Meta:
             model = Book
             fields = ['pk' ,'title', 'author', 'genre', 'condition', 'description', 'image', 'created_at']
