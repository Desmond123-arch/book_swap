from book_swap.rest_api.models import CustomUser, Book

user = CustomUser.objects.first()
book = Book.objects.create(
    title="Test Book",
    author="Author Name",
    genre="Genre",
    condition="New",
    description="Test Description",
    posted_by=user
)
