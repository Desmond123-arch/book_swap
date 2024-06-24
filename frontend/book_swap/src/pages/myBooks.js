import hobbit from '../images/hobbit.jpg';
import { Link } from 'react-router-dom';
import pathConstants from "../routes/pathConstants";

let books = [{
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "condition": "Good",
    "description": "A novel about the dangers of totalitarianism.",
    "image": hobbit,
    "posted_by": {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com"
    },
    "created_at": "2024-06-14T18:30:00Z"
}]

export default function myBooks(){
    return (
        <div className="w-full md:w-[70%] mx-auto my-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {books.map((book) => (
                <div key={book.id} className='flex flex-col h-full'>
                    <Link to={`${pathConstants.BOOK_DETAIL.replace(':bookId', book.id)}`}>
                        <img src={book.image} alt="book" className='h-[22rem] w-full rounded-2xl object-fill' />
                        <div className="my-4 px-4 flex-grow">
                            <p className='text-2xl font-bold'>{book.title}</p>
                            <p className='text-xl text-gray-200'>{book.author}</p>
                        </div>
                    </Link>
                </div>
            ))}
                </div>
        </div>
                )
}