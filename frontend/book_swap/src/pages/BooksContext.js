import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const accessToken = Cookies.get('access_token');
                const response = await axios.get("https://book-swap-sigma.vercel.app", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                });
                setBooks(response.data);
            } catch (error) {
                console.log("Failed to fetch books", error);
                setBooks([]);
            }
        }
        fetchBooks();
    }, []);

    return (
        <BooksContext.Provider value={books}>
            {children}
        </BooksContext.Provider>
    );
}
