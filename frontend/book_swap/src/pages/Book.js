import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie'



async function  getBook(bookId) {
    try{
        const accesstoken = Cookies.get('access_token');
        const response = await axios.get("https://book-swap-sigma.vercel.app\\"+ bookId, {
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                'Accept':'application/json'
            }
        });
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export default function BookDetail() {
    const [book, setBook] = useState([]);
    const bookId = useParams().bookId;
    useEffect(() => 
    {
        async function loadBook(bookId){
            const fetchedBook = await getBook(bookId);
            setBook(fetchedBook)
        }
        loadBook(bookId)
    }, [bookId])
    return (
        <div className=" w-full md:w-[80%] mx-auto px-4 py-8 border">
            <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                <img src={book.image} alt="book" className="w-full h-auto max-h-[30rem] object-fill object-center mx-auto rounded-lg"></img>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                <h3 className="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Title</h3>
                <p className="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                    {book.title}
                </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                <h3 className="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Author</h3>
                <p className="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                    {book.author}
                </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                <h3 className="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Description</h3>
                <p className="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                    {book.description}
                </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                <h3 className="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Condition</h3>
                <p className="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                    {book.condition}
                </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                <label htmlFor="message" className="block mb-1 text-gray-600 font-bold text-lg self-start hidden">Want it</label>
                <div className="relative w-[50%]">
                    <input type="message" id="message" name="message" className="text-sm rounded-xl block w-full p-2 text-gray-700 border border-gray-400" placeholder='Want it? Send message to owner' />
                    <button className="text-sm rounded-xl block mx-auto p-2 px-5 w-max border border-gray-400 bg-orange-500 font-bold text-white absolute top-0 right-0">Send</button>
                </div>
            </div>
        </div>
    );
}
