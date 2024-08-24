import { useState } from 'react';
import google_icon from '../images/google_icon.svg'
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
async function loginUser(username, password) {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { "email": username, "password": password }
        };
       const response = await axios.post("http://127.0.0.1:8000/auth/login", requestOptions)
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
       console.log(response);
       return true;
    }
    catch (error) {
        return error.response.data.errors;
    }
}
export default function Login() {
    const history = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [disabled, setDisabled] = useState(false);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            setDisabled(true);
            setRedirect(true);
            const result = await loginUser(formValues.email, formValues.password);
            if (result === true){
                setRedirect(false);
                history('/browse');
                sessionStorage.setItem("isLoggedIn", 'true');
            }
            else
            {
               setErrors(result);
                setRedirect(false);
                setDisabled(false);
            }
            
        }
    };

    return (
        redirect?
        (
            <div className='center'>
                <ClimbingBoxLoader/>
            </div>
        ):
        (    <div className="border rounded-xl m-10 md:w-[50%] lg:w-[35%] mx-auto shadow-sm shadow-gray-300">
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
                    <input type="password" id="password" name="password" autoComplete='current-password' className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400" value={formValues.password}
                        onChange={handleInputChange}
                        onBlur={validateInputs} />
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                    <p className="text-end mt-1"><a href="home" className=" underline text-gray-300 hover:text-gray-500">Forgot Password</a></p>
                </div>
                <button className="text-xl rounded-lg block mx-auto w-[85%] md:w-[70%] mb-4 p-2 border border-gray-400 bg-orange-500 font-bold text-white shadow-md shadow-gray-300 hover:shadow-gray-400 disabled:bg-orange-300" disabled={disabled}>
                Log in
                </button>
            </form>
        </div>)
    );
}