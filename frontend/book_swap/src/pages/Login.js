import { useState } from 'react';
import google_icon from '../images/google_icon.svg'
import axios from 'axios'

async function loginUser(username, password){
    try {
        const response = await axios.post('http://localhost:8000/token', {
            username,
            password,
        });
        const {access, refresh} = response.data;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        return true;
    }
    catch(error){
        console.log("An error occured", error);
    }
}
export default function Login() {
    // VALIDATE EMAILS
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const validateInputs = () => {
        const newErrors = {}

        if (!emailRegex.test(formValues.email)) {
            newErrors.email = "Invalid email address";
        } else {
            newErrors.email = "";
        }

        if (formValues.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        } else {
            newErrors.password = "";
        }
        
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    }
    //Handle submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            
        }
    };

    return (
        <div className="border rounded-xl m-10 md:w-[50%] lg:w-[35%] mx-auto shadow-sm shadow-gray-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <h1 className="mt-6 text-2xl font-bold">Book share</h1>
                <h2 className="mb-5 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <label htmlFor="email" className="block mb-1 text-gray-600 font-bold text-lg">Email</label>
                    <input type="email" id="email" name="email" value={formValues.email} className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" onChange={handleInputChange} />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <label htmlFor="password" className="block mb-1 text-gray-600 font-bold text-lg self-st">Password</label>
                    <input type="password" id="password" name="password" className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" value={formValues.password}
                        onChange={handleInputChange}
                        onBlur={validateInputs}  />
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                    <p className="text-end mt-1"><a href="home" className=" underline text-gray-300 hover:text-gray-500">Forgot Password</a></p>
                </div>
                <button className="text-xl rounded-lg block mx-auto w-[85%] md:w-[70%] mb-4 p-2 border border-gray-400 bg-orange-500 font-bold text-white shadow-md shadow-gray-300 hover:shadow-gray-400">Log in</button>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <div className="flex items-center">
                        <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                        <div className="flex-grow-0 mx-5 text text-black">or continue with</div>
                        <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                    </div>
                    <a href="home" className="mt-8 mx-auto w-[80%] mb-4 flex items-center justify-center border rounded-2xl shadow-md shadow-gray-300 hover:shadow-gray-400">
                        <div href="home" className='w-[20%]'><img src={google_icon} alt="google icon" /></div>
                        <p className='text-lg'>Continue with google</p>
                    </a>
                </div>
            </form>
        </div>
    );
}