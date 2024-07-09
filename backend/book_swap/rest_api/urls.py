from django.urls import path
from . import views
from .views import Login, Register
urlpatterns = [
    path('',views.BookList.as_view() , name='books_list'),
    path('auth/login', Login.as_view(), name="login"),
    path('auth/register',Register.as_view(), name="register"),
    path('<int:pk>', views.BookDetail.as_view(), name='book_detail'),
    path('user_books', views.UserBooks.as_view(), name='user_books'),
    path('user_books/<int:pk>', views.UserBooksDetail.as_view(), name='user_books'),
]