import {useState } from 'react';
import google_icon from '../images/google_icon.svg';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

async function CreateAccount(first_name, last_name, userEmail, password) {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
                "firstName": first_name,
                "lastName": last_name,
                "password": password,
                "email": userEmail
            }
        }
        const response = await axios.post("http://127.0.0.1:8000/auth/register", requestOptions)
        const access = response.data["access_token"]
        const refresh = response.data["refresh_token"]
        const firstName = response.data['data']['firstName']
        const lastName = response.data['data']['lastName']
        const email = response.data['data']['email']
        Cookies.set('access_token', access, { secure: "true" });
        Cookies.set('refresh_token', refresh, { secure: 'true' });
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        return true;
    }
    catch (error) {
        return error.response.data.errors;
    }
}
export default function Signup() {
    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });


    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const textRegex = /[a-zA-Z]+/;
    const history = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormValues({
            ...formValues,
            [name]: inputValue
        });
    };

    const validateInputs = () => {
        const newErrors = {};

        if (formValues.first_name.length === 0 || !textRegex.test(formValues.first_name)) {
            newErrors.first_name = "Invalid input";
        } else {
            newErrors.first_name = "";
        }

        if (formValues.last_name.length === 0 || !textRegex.test(formValues.last_name)) {
            newErrors.last_name = "Invalid input";
        } else {
            newErrors.last_name = "";
        }

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

        if (formValues.confirm_password !== formValues.password) {
            newErrors.confirm_password = "Passwords must match";
        } else {
            newErrors.confirm_password = "";
        }

        if (!formValues.agreement) {
            newErrors.agreement = "Please confirm";
        } else {
            newErrors.agreement = "";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            setDisabled(true);
            setRedirect(true);
            const response = await CreateAccount(formValues.first_name, formValues.last_name,formValues.email, formValues.password)
            if (response === true){
                setRedirect(false);
                history('/browse')
                sessionStorage.setItem('isLoggedIn', 'true');
            }
            else{
                setErrors(response)
                setRedirect(false);
                setDisabled(false);
            }
        }
    };

    return (
        redirect ?
            (
                <div className='center'>
                    <ClimbingBoxLoader />
                </div>
            ) :
            (
                <div className="border border-t-0 md:border-t-2 rounded-xl w-full m-4 md:w-[50%] lg:w-[35%] mx-auto shadow-sm shadow-gray-300">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                        <h1 className="mt-4 text-2xl font-bold">Book share</h1>
                        <h2 className="mb-5 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 md:flex-row mx-auto w-[85%] md:w-[70%] mb-2 ">
                            <div>
                                <label htmlFor="first_name" className="block mb-1 text-gray-600 font-bold text-lg">First Name</label>
                                <input type="text" id="first_name" name="first_name" className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" onChange={handleInputChange} value={formValues.first_name} />
                                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-1 text-gray-600 font-bold text-lg">Last Name</label>
                                <input type="text" id="last_name" name="last_name" className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" onChange={handleInputChange} value={formValues.last_name} />
                                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                            </div>
                        </div>
                        <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-bold text-lg">Email</label>
                            <input type="email" id="email" name="email" className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" onChange={handleInputChange} value={formValues.email} />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>
                        <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                            <label htmlFor="password" className="block mb-1 text-gray-600 font-bold text-lg self-st">Password</label>
                            <input type="password" id="password" name="password" className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" onChange={handleInputChange} value={formValues.password} />
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                        </div>

                        <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                            <label htmlFor="confirm_password" className="block mb-1 text-gray-600 font-bold text-lg self-st">Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password" className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" onChange={handleInputChange} value={formValues.confirm_password} />
                            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password}</p>}
                        </div>
                        <div className="mx-auto w-[85%] md:w-[70%] mb-2">
                            <div className='flex items-center'>
                                <input type="checkbox" id="agreement" name="agreement" className="h-4 w-4 rounded-lg mr-4 checked:accent-orange-500" onChange={handleInputChange} checked={formValues.agreement} />
                                <label htmlFor="agreement" className="mb-1 text-gray-600 font-medium text-md self-st">I agree to the terms and conditions</label>
                            </div>
                            {errors.agreement && <p className="text-red-500">{errors.agreement}</p>}
                        </div>

                        <button type="submit" className="text-xl rounded-lg block mx-auto w-[85%] md:w-[70%] mb-4 p-2 border border-gray-400 bg-orange-500 font-bold text-white shadow-md shadow-gray-300 hover:shadow-gray-400" disabled={disabled} >Sign Up</button>
                        <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                            <div className="flex items-center">
                                <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                                <div className="flex-grow-0 mx-5 text text-black">or continue with</div>
                                <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                            </div>
                            <a href="home" className="mt-4 mx-auto w-[90%] md:w-[80%] mb-4 flex items-center justify-center border rounded-2xl shadow-md shadow-gray-300 hover:shadow-gray-400">
                                <div className='w-[20%]'><img src={google_icon} alt="google icon" /></div>
                                <p className='text-lg'>Continue with google</p>
                            </a>
                        </div>
                    </form>
                </div>
            )
    );
}
