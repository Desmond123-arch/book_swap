import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

async function PostBook(bookData) {
    try {
        const accessToken = Cookies.get('access_token');
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const response = await axios.post(
            "https://book-swap-sigma.vercel.app/user_books",
            {
                title: bookData.title,
                author: bookData.author,
                genre: bookData.genre,
                condition: bookData.condition,
                description: bookData.description,
                image: bookData.image
            },
            requestOptions
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default function Post() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '',
        description: '',
        image: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const validate = () => {
        const errors = {};
        if (!formData.title) errors.title = 'Title is required';
        if (!formData.author) errors.author = 'Author is required';
        if (!formData.genre || formData.genre === 'Select Genre') errors.genre = 'Genre is required';
        if (!formData.condition || formData.condition === 'Select Condition') errors.condition = 'Condition is required';
        if (!formData.description) errors.description = 'Description is required';
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Submit form data
            const response = PostBook(formData);
            if (response !== false){
                navigate("/browse");
            }
            else{
                setErrorMessage("An error occured");
            }

        }
    };

    return (
        <div className="mx-auto w-[90%] md:w-[75%]">
            <h1 className="font-bold text-2xl text-center">Post a Book</h1>
            <p className="font-thin text-md text-center text-gray-400">Share your books with the community</p>
            <form onSubmit={handleSubmit}>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <div className="mx-auto w-[85%] md:w-[40%] mb-4">
                    <label htmlFor="title" className="block mb-1 text-gray-600 font-bold text-lg self-st">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="text-md rounded-lg block w-full p-2 text-gray-800 border border-gray-400 bg-gray-300"
                        placeholder="Enter Title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div className="mx-auto w-[85%] md:w-[40%] mb-4">
                    <label htmlFor="author" className="block mb-1 text-gray-600 font-bold text-lg self-st">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="text-md rounded-lg block w-full p-2 text-gray-800 border border-gray-400 bg-gray-300"
                        placeholder="Enter Author"
                    />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
                </div>
                <div className="mx-auto w-[85%] md:w-[40%] mb-4">
                    <label htmlFor="genre" className="block mb-1 text-gray-600 font-bold text-lg self-st">Genre</label>
                    <select
                        name="genre"
                        id="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="text-md rounded-lg block w-full p-2 text-gray-800 border border-gray-400 bg-gray-300"
                    >
                        <option value="Select Genre" className="text-md text-gray-800">Select Genre</option>
                        <option value="Fiction" className="text-lg text-gray-800">Fiction</option>
                        <option value="NonFiction" className="text-lg text-gray-800">Non Fiction</option>
                        <option value="Children" className="text-lg text-gray-800">Children</option>
                        <option value="Fantasy" className="text-lg text-gray-800">Fantasy</option>
                        <option value="Romance" className="text-lg text-gray-800">Romance</option>
                        <option value="Thriller" className="text-lg text-gray-800">Thriller</option>
                    </select>
                    {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
                </div>
                <div className="mx-auto w-[85%] md:w-[40%] mb-4">
                    <label htmlFor="condition" className="block mb-1 text-gray-600 font-bold text-lg self-st">Select Condition</label>
                    <select
                        name="condition"
                        id="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="text-md rounded-lg block w-full p-2 text-gray-800 border border-gray-400 bg-gray-300"
                    >
                        <option value="Select Condition" className="text-md text-gray-800">Select Condition</option>
                        <option value="New" className="text-lg text-gray-800">Brand New</option>
                        <option value="Good" className="text-lg text-gray-800">Good</option>
                        <option value="Okay" className="text-lg text-gray-800">Okay</option>
                        <option value="Old" className="text-lg text-gray-800">Old</option>
                    </select>
                    {errors.condition && <p className="text-red-500 text-sm">{errors.condition}</p>}
                </div>
                <div className="mx-auto w-[85%] md:w-[40%] mb-4">
                    <label htmlFor="description" className="block mb-1 text-gray-600 font-bold text-lg self-start">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="text-md rounded-lg block w-full p-2 border border-gray-400 bg-gray-300"
                        rows={7}
                        placeholder="Whats the book about?"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="flex items-center justify-center mx-auto w-[85%] md:w-[40%] mb-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload book cover</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG(MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>
                <div className="flex items-center justify-center mx-auto w-[85%] md:w-[40%] mb-4">
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
            </form>
        </div>
    );
}
