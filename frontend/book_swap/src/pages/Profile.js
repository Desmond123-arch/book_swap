import profile from '../images/profile.jpg';
import { useState } from 'react';

export default function Profile() {
    const [avatar, setAvatar] = useState(profile);
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="w-full md:w-[50%] border border-gray-400 mx-auto p-4 m-2 rounded-lg">
            <form>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <div className="flex flex-col items-center">
                        <div
                            className="w-[20rem] h-[20rem] rounded-full overflow-hidden"
                            style={{ backgroundImage: `url(${avatar})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        ></div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <label htmlFor="first_name" className="block mb-1 text-gray-600 font-bold text-lg">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <label htmlFor="last_name" className="block mb-1 text-gray-600 font-bold text-lg">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
                <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                    <label htmlFor="email" className="block mb-1 text-gray-600 font-bold text-lg">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="text-sm rounded-lg block w-full p-2 text-gray-700 border border-gray-400"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button
                    type="submit"
                    className="text-xl rounded-lg block mx-auto w-[85%] md:w-[70%] mb-4 p-2 border border-gray-400 bg-orange-500 font-bold text-white shadow-md shadow-gray-300 hover:shadow-gray-400"
                >
                    Update
                </button>
            </form>
            <section className="flex flex-col md:flex-row mx-auto w-[85%] md:w-[70%] mb-4 border-t-2 border-b-2 border-gray-400 p-2 ">
                <div className="w-full md:text-start text-center md:w-[70%]  mx-auto">
                    <h1 className="text-md font-bold">Delete your account</h1>
                    <p className="text-sm">Delete your account and all data, this account is irreversible</p>
                </div>
                <button className="mx-auto self-end justify-self-end text-sm p-2  rounded-md border border-gray-400 bg-red-500 font-bold text-white shadow-md shadow-gray-300 hover:shadow-gray-400">
                    Delete Account
                </button>
            </section>
        </div>
    );
}
