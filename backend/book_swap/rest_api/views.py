from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer, UserBookSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class BookList(generics.ListAPIView):
    serializer_class = BookSerializer
    def get_queryset(self):
        queryset = Book.objects.all()
        genre = self.request.query_params.get('genre', None)
        if genre:
            queryset = queryset.filter(genre=genre)
        return queryset
    
    # """ List all books in the database"""
    # def get(self, request, format=None):
    #     books = Book.objects.all()
    #     serializer = BookSerializer(books, many=True)
    #     return Response(serializer.data)
    
    # def post(self, request):
    #     """ Add a book to the database """
    #     serializer = BookSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
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
    
    # def put(self, request, pk, format=None):
    #     """ Update a particular bokk in the database """
    #     book = self.get_object(pk)
    #     serializer = BookSerializer(book, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def delete(self, request, pk, formate=None):
    #     """ Delete a particular book from the database """
    #     book = Book.objects.get(pk=pk)
    #     book.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class UserBooks(generics.ListAPIView):
    """ Get all books of User"""
    serializer_class = UserBookSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        username = self.request.query_params.get('user', None)
        user = User.objects.filter(username=username).first()
        if user:
            query_set = user.book_set.all()
            print(query_set)
            return query_set
        
class UserBooksDetail(generics.RetrieveUpdateDestroyAPIView):
    """ Get a particular book posted by the user"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserBookSerializer
    def get_queryset(self):
        username = self.request.query_params.get('user', None)
        user = User.objects.filter(username=username).first()
        if user:
            query_set = user.book_set.all()
            print(query_set)
            return query_set