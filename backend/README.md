
 # Book API Documentation

## Authentication
 ### Register
    URL: /auth/register
    Method: POST
    Description: Register a new user.
    Request Body:
    {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": "string"
    }
    Response:
    201 Created: User registered successfully.
    400 Bad Request: Validation errors in the request payload.
    422 Unprocessable Entity: Missing required fields.
 ### Login
    URL: /auth/login
    Method: POST
    Description: Authenticate a user and obtain an authentication token.
    Request Body:
    {
        "email": "string",
        "password": "string"
    }
    Response:
    200 OK: Authentication successful.
    400 Bad Request: Invalid credentials.

## Book Endpoints
  ### List Books
    URL: /
    Method: GET
    Description: Retrieve a list of all books.
    Response:
    [
        {
            "pk": 1,
            "title": "string",
            "author": "string",
            "genre": "string",
            "condition": "string",
            "description": "string",
            "image": "url",
            "posted_by": {
                "userId": "string",
                "firstName": "string",
                "lastName": "string",
                "email": "string"
            },
            "created_at": "datetime"
        },
        ...
    ]
### Book Detail
    URL: /<int:pk>
    Method: GET
    Description: Retrieve details of a specific book.
    Response:

    {
        "pk": 1,
        "title": "string",
        "author": "string",
        "genre": "string",
        "condition": "string",
        "description": "string",
        "image": "url",
        "posted_by": {
            "userId": "string",
            "firstName": "string",
            "lastName": "string",
            "email": "string"
        },
        "created_at": "datetime"
    }
## User Book Endpoints
# User Books
    URL: /user_books
    Method: GET
    Description: Retrieve a list of books posted by the authenticated user.
    Response:
    json
    Copy code
    [
        {
            "pk": 1,
            "title": "string",
            "author": "string",
            "genre": "string",
            "condition": "string",
            "description": "string",
            "image": "url",
            "created_at": "datetime"
        },
        ...
    ]

### User Book Detail
    URL: /user_books/<int:pk>
    Method: GET
    Description: Retrieve details of a specific book posted by the authenticated user.
    Response:
    json
    Copy code
    {
        "pk": 1,
        "title": "string",
        "author": "string",
        "genre": "string",
        "condition": "string",
        "description": "string",
        "image": "url",
        "created_at": "datetime"
    }

## Models
### User
    Fields:
    userId: Unique identifier for the user.
    firstName: First name of the user.
    lastName: Last name of the user.
    email: Email address of the user.
    password: Password for the user account (write-only).
### Book
    Fields:
    pk: Primary key of the book.
    title: Title of the book.
    author: Author of the book.
    genre: Genre of the book.
    condition: Condition of the book.
    description: Description of the book.
    image: Image URL of the book.
    posted_by: User who posted the book.
    created_at: Timestamp when the book was created.
    
### Error Codes
    400 Bad Request: Invalid request parameters or payload.
    401 Unauthorized: Authentication credentials are missing or invalid.
    403 Forbidden: Access to the resource is forbidden.
    404 Not Found: Resource not found.
    422 Unprocessable Entity: Validation errors in the request payload.