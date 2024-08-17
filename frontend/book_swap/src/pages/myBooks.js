import { Link } from 'react-router-dom';
import pathConstants from "../routes/pathConstants";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

async function getMyBooks() {
    try{
        const accesstoken = Cookies.get('access_token');
        const response = await axios.get("https://book-swap-sigma.vercel.app/user_books", {
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                'Accept':'application/json'
            }
        });
        console.log(response);
        return response.data
    } 
    catch(error){
        console.log(error);
        throw error;
    }
}

export default function MyBooks(){
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function loadBooks(bookId){
            const fetchedBooks  = await getMyBooks();
            setBooks(fetchedBooks);
        }
        loadBooks();
    }, [])
    return (
        <div className="w-full md:w-[70%] mx-auto my-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {books.map((book) => (
                <div key={book.pk} className='flex flex-col h-full'>
                    <Link to={`${pathConstants.BOOK_DETAIL.replace(':bookId', book.pk)}`}>
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