from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer, UserBookSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework.authentication import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class Register(TokenObtainPairView):
    """ Register a user"""

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            return Response({
                "message": "Registration Successful",
                "access_token": str(access_token),
                "refresh_token": str(refresh),
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Invalid credentials",
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class Login(TokenObtainPairView):
    # serializer_class = TokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        print(request.data)
        email = request.data["body"]["email"]
        password = request.data["body"]["password"]
        user = authenticate(username=email, password=password)
        if user:
            serializer = UserSerializer(user)
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            return Response({
                "message": "Login Successful",
                "access_token": str(access_token),
                "refresh_token": str(refresh),
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Login failed",
                "message": "Invalid credentials"
            }, status=status.HTTP_400_BAD_REQUEST)


class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        genre = self.request.query_params.get('genre', None)
        if genre:
            queryset = queryset.filter(genre=genre)
        return queryset

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)

    # """ List all books in the database"""
    # def get(self, request, format=None):
    #     books = Book.objects.all()
    #     serializer = BookSerializer(books, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     """ Add a book to the database """
    #     serializer = BookSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(posted_by=self.request.user)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookDetail(generics.RetrieveDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    # """ Get the datails of a particular book """
    # def get_object(self, pk):
    #     try:
    #        return Book.objects.get(pk=pk)
    #     except Book.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     """ Get a particular book from the database"""
    #     book = self.get_object(pk)
    #     serializer = BookSerializer(book)
    #     return Response(serializer.data)




class UserBooks(generics.ListCreateAPIView):
    """ Get all books of User"""
    serializer_class = BookSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user:
            query_set = user.book_set.all()
            print(query_set)
            return query_set
        
    def perform_create(self, serializer):
        return serializer.save(posted_by_id=self.request.user.userId)
        
    def post(self, request, *args, **kwargs):
        """ Post a new book"""
        data = request.data
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
           self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class UserBooksDetail(generics.RetrieveUpdateDestroyAPIView):
    """ Get a particular book posted by the user"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BookSerializer

    def get_queryset(self):
        user = self.request.user
        book_id = self.kwargs.get('pk')
        if user:
            query_set = user.book_set.filter(pk=book_id)
            print(query_set)
            return query_set
        
    def put(self, request, pk, format=None):
        """ Update a particular bokk in the database """
        user = self.request.user
        book = user.book_set.get(pk=pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        """ Delete a particular book from the database """        
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)