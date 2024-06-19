import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import pathConstants from "../routes/pathConstants";
import profile from '../images/profile.jpg'
import { FaRegBell } from "react-icons/fa6";

export function Navbar({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle menu open state
  };

  useEffect(() => {
    setIsMenuOpen(false);  // Close menu on route change
  }, [location]);

  return (
    <nav className="flex flex-col items-center border-b-2 p-2 md:flex-row">
      <div className="flex w-full md:w-auto text-xl font-bold">
        <Link to={pathConstants.HOME}>Book Share</Link>
        <button className="md:hidden ml-auto" onClick={handleMenuClick}>
          <GiHamburgerMenu size={30} />
        </button>
      </div>
      <ul
        className={`flex flex-col gap-2 text-center items-center transition-all duration-300 ease-in-out transform md:medium_screen ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 hidden'
          } md:flex md:opacity-100 md:translate-y-0 md:pointer-events-auto`}
      >
        {isLoggedIn ?
          (
            <>
            <li><Link to={pathConstants.HOME} className="hover:underline">Home</Link></li>
            <li><Link to="" className="hover:underline">Browse</Link></li>
            <li><a href="home" className="hover:underline">My Books</a></li>
            <li className="rounded-xl bg-orange-500 px-4 p-2 hover:underline"><Link to={pathConstants.LOGIN} className="text-white">Add a Book</Link></li>
            <li>
              <Link to="" className="hover:underline relative">
                <FaRegBell size={25}/>
                <span class="top-0 absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </Link>
              </li>
            <li><a href="home" className="hover:underline">
              <img src={profile} alt="profile" className="w-12 h-12 rounded-full cover hidden md:block"></img>
              </a></li>
              <li><a href="home" className="hover:underline md:hidden">Profile</a></li>

            </>
          )
          : (
            <>
             <li><Link to="" className="hover:underline">Browse</Link></li>
              <li><a href="home" className="hover:underline">Post a book</a></li>
              <li><a href="home" className="hover:underline">Help</a></li>
              <li className="rounded-xl bg-orange-500 px-4 p-2 hover:underline"><Link to={pathConstants.LOGIN} className="text-white">Log In</Link></li>
              <li className="rounded-xl bg-gray-300 px-4 p-2 md:mr-5 hover:underline"><Link to={pathConstants.SIGNUP}>Sign Up</Link></li>
            </>
          )
        }
      </ul>
    </nav>
  );
}
