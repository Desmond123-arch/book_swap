import { Link } from 'react-router-dom';
import pathConstants from "../routes/pathConstants";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
async function getBooks() {
    try {
        const accessToken = Cookies.get('access_token');

        const response = await axios.get("https://book-swap-sigma.vercel.app", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Failed to fetch books", error);
        return [];
    }
}
export default function Browse() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function loadBooks() {
            const bookData =await getBooks();
            setBooks(bookData);
        }
        loadBooks();
    }, []);
    return (
        <div className="w-full md:w-[70%] mx-auto my-7">
            <div className="text-center md:text-start">
                <h1 className="font-bold text-4xl">Books available</h1>
                <p className="font-thin text-md text-gray-600 my-2 w-[70%] mx-auto md:w-full md:mx-0">Browse through all the available books on the platform</p>
            </div>
            <div className="w-[85%] md:w-full my-4 flex items-center justify-center mx-auto md:mx-0">
                <label htmlFor="search" className="block mb-1 text-gray-600 font-bold text-lg hidden">Search</label>
                <input type="search" id="search" name="search" className="text-md rounded-lg block w-full p-2 text-gray-700 border border-gray-400" placeholder="&#x1F50E; Search book, author..." />
            </div>
            <ul className=" w-[80%] mx-auto flex gap-2 justify-around flex-wrap lg:flex-nowrap lg:mx-0">
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>Fiction</button></li>
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>NonFiction</button></li>
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>Children's</button></li>
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>Fantasy</button></li>
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>Science Fiction</button></li>
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>Romance</button></li>
                <li className="mb-1 rounded-xl py-2 px-4 bg-gray-200 hover:underline font-semibold text-gray-800 w-max"><button>Thriller</button></li>
            </ul>
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
